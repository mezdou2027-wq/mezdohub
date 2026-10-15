-- ==============================================================================
-- MEZDOHUB MIGRATION 004: AUDIT LOGGING & CDC TRIGGERS
-- Destination: SQL_MIGRATIONS/004_audit_logs.sql
-- Dependencies: 001_initial_schema.sql, 002_indexes.sql, 003_rls.sql
-- ==============================================================================

BEGIN;

-- 1. Create Audit Trail Entity in audit Schema
CREATE TABLE IF NOT EXISTS audit.logs (
    id BIGSERIAL PRIMARY KEY,
    occurred_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_role user_role,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(50) NOT NULL,
    record_id UUID NOT NULL,
    ip_address_hash VARCHAR(64) NOT NULL,
    user_agent TEXT,
    old_values JSONB,
    new_values JSONB,
    metadata JSONB DEFAULT '{}'::JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_occurred_at ON audit.logs(occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit.logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity_record ON audit.logs(entity_name, record_id);

-- 2. Generic Change Data Capture (CDC) Trigger Function
CREATE OR REPLACE FUNCTION audit.record_table_change()
RETURNS TRIGGER AS $$
DECLARE
    client_ip_hash VARCHAR(64);
    client_ua TEXT;
BEGIN
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

-- 3. Attach CDC Triggers
DROP TRIGGER IF EXISTS audit_applications_changes ON public.applications;
CREATE TRIGGER audit_applications_changes
    AFTER UPDATE OR DELETE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION audit.record_table_change();

DROP TRIGGER IF EXISTS audit_companies_verification ON public.companies;
CREATE TRIGGER audit_companies_verification
    AFTER UPDATE OR DELETE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION audit.record_table_change();

DROP TRIGGER IF EXISTS audit_profiles_changes ON public.profiles;
CREATE TRIGGER audit_profiles_changes
    AFTER UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION audit.record_table_change();

-- 4. Lockdown: Prevent Tampering with Audit Trail
REVOKE UPDATE, DELETE ON audit.logs FROM authenticated, anon;
GRANT SELECT ON audit.logs TO authenticated;

COMMIT;
