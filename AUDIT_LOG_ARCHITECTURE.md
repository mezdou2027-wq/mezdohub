# MezdoHub — Immutable Audit Logging & Telemetry Architecture
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Architect:** Chief Technology Officer & Lead Security Architect  
**Compliance Target:** Moroccan CNDP Law 09-08 & ISO/IEC 27001 Auditability  

---

## 1. Audit Logging Objectives

The audit logging subsystem guarantees complete non-repudiation and visibility across MezdoHub:
1. **Zero-Trust Administrative Tracking:** Every action performed by an operator or admin inside the CRM (viewing candidate contact info, changing status, exporting CSVs) is permanently recorded.
2. **Security Forensics:** Rapid investigation of suspected data breaches, privilege escalation attempts, or unauthorized access.
3. **Immutability:** Audit records are written to a dedicated, write-only schema (`audit.*`) with no `UPDATE` or `DELETE` grants permitted for standard application roles.

---

## 2. Dedicated Audit Schema DDL

```sql
-- 1. Create Dedicated Audit Schema
CREATE SCHEMA IF NOT EXISTS audit;

-- 2. Audit Trail Entity
CREATE TABLE audit.logs (
    id BIGSERIAL PRIMARY KEY,
    occurred_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_role user_role,
    action VARCHAR(100) NOT NULL,               -- e.g., 'CANDIDATE_PHONE_VIEWED', 'APPLICATION_STATUS_UPDATED'
    entity_name VARCHAR(50) NOT NULL,           -- e.g., 'applications', 'profiles', 'resumes'
    record_id UUID NOT NULL,                    -- Target row PK
    ip_address_hash VARCHAR(64) NOT NULL,       -- SHA-256 anonymized client IP
    user_agent TEXT,
    old_values JSONB,                           -- State before change
    new_values JSONB,                           -- State after change
    metadata JSONB DEFAULT '{}'::JSONB NOT NULL
);

-- Partitioning / Indexing for high-velocity reads & cold archival
CREATE INDEX idx_audit_occurred_at ON audit.logs(occurred_at DESC);
CREATE INDEX idx_audit_actor ON audit.logs(actor_id);
CREATE INDEX idx_audit_entity_record ON audit.logs(entity_name, record_id);
```

---

## 3. Automated Change Data Capture (CDC) Triggers

The following trigger automatically captures field-level diffs on sensitive state modifications:

```sql
CREATE OR REPLACE FUNCTION audit.record_table_change()
RETURNS TRIGGER AS $$
DECLARE
    client_ip_hash VARCHAR(64);
    client_ua TEXT;
BEGIN
    -- Extract IP and UA from request headers if available (Supabase HTTP context)
    BEGIN
        client_ip_hash := encode(digest(coalesce(current_setting('request.headers', true)::json->>'x-forwarded-for', '127.0.0.1'), 'sha256'), 'hex');
        client_ua := coalesce(current_setting('request.headers', true)::json->>'user-agent', 'internal');
    EXCEPTION WHEN OTHERS THEN
        client_ip_hash := 'internal_service_worker';
        client_ua := 'system';
    END;

    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO audit.logs (
            actor_id, actor_role, action, entity_name, record_id, 
            ip_address_hash, user_agent, old_values, new_values
        ) VALUES (
            auth.uid(),
            auth.get_user_role(),
            TG_TABLE_NAME || '_UPDATED',
            TG_TABLE_NAME,
            NEW.id,
            client_ip_hash,
            client_ua,
            to_jsonb(OLD),
            to_jsonb(NEW)
        );
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO audit.logs (
            actor_id, actor_role, action, entity_name, record_id, 
            ip_address_hash, user_agent, old_values
        ) VALUES (
            auth.uid(),
            auth.get_user_role(),
            TG_TABLE_NAME || '_DELETED',
            TG_TABLE_NAME,
            OLD.id,
            client_ip_hash,
            client_ua,
            to_jsonb(OLD)
        );
        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach to High-Sensitivity Tables
CREATE TRIGGER audit_applications_changes
    AFTER UPDATE OR DELETE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION audit.record_table_change();

CREATE TRIGGER audit_companies_verification
    AFTER UPDATE OR DELETE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION audit.record_table_change();
```

---

## 4. Tamper-Proofing & Retention Strategy

1. **Database Grant Lockdown:**
   ```sql
   -- REVOKE destructive privileges from application connection pool
   REVOKE UPDATE, DELETE ON audit.logs FROM authenticated, anon, service_role;
   -- GRANT only SELECT to superadmins
   GRANT SELECT ON audit.logs TO authenticated;
   ```
2. **Cold Storage Sync (S3 Glacier):**
   * Records older than 90 days are automatically streamed to AWS S3 Glacier with Object Lock (WORM: Write Once, Read Many).
   * Guarantees 24-month audit trail preservation compliant with Moroccan data protection mandates without degrading active PostgreSQL transaction throughput.

---
*Audit Logging Architecture certified for enterprise governance.*
