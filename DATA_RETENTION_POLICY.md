# MezdoHub — Data Retention, Ownership & Destruction Policy
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Auditor:** Chief Technology Officer & Data Protection Officer (DPO)  
**Legal Framework:** Moroccan Law 09-08 (CNDP) & GDPR Compliant Standards  

---

## 1. Principles of Data Ownership

1. **Candidate Profile Ownership:** Candidates own 100% of their personal, academic, and professional data. MezdoHub acts strictly as a data processor (*sous-traitant*) under Law 09-08.
2. **Document Ownership:** Resumes, portfolios, and diplomas uploaded by candidates remain their intellectual and legal property. Candidates may revoke access or delete their documents at any time.
3. **Employer Sourcing Ownership:** Employers own the job listings they author and acquire a limited license to evaluate candidate dossiers solely for active recruitment processes. Employers are forbidden from exporting or re-selling candidate contact details.
4. **Platform Analytics & Aggregates:** MezdoHub retains ownership of anonymized, aggregated market telemetry (e.g., average technician salaries in Tangier, application velocity, drop-off rates).

---

## 2. Definitive Retention Schedule

```
+-----------------------------------------------------------------------------------------------+
|                                    RETENTION LIFECYCLE MATRIX                                 |
+------------------------------+---------------------------+------------------------------------+
| Data Classification          | Active Retention Window   | Expiration Action                  |
+------------------------------+---------------------------+------------------------------------+
| Active Candidate Accounts    | Duration of active usage  | Automated dormancy reminder at     |
|                              | + 24 months inactivity    | 24 months; hard purge at 36 mos.   |
+------------------------------+---------------------------+------------------------------------+
| Candidate Resumes & PDFs     | Synced with user account  | Purged synchronously upon user     |
|                              | (or manual replacement)   | deletion or account closure.       |
+------------------------------+---------------------------+------------------------------------+
| VIP DV Lottery Photos (600x) | 60 days maximum post-     | HARD PURGED AUTOMATICALLY          |
|                              | official submission date  | from S3/R2 storage via cron.       |
+------------------------------+---------------------------+------------------------------------+
| Closed Job Postings          | 180 days post expiration  | Archived & anonymized; applicant   |
|                              |                           | foreign keys dissociated.          |
+------------------------------+---------------------------+------------------------------------+
| In-App Notifications         | 90 days from dispatch     | Automated FIFO purge from table.   |
+------------------------------+---------------------------+------------------------------------+
| Audit Trail Logs (`audit.*`) | 24 months immutable       | Archived to encrypted cold storage |
|                              |                           | (AWS S3 Glacier / Cloud Archive).  |
+------------------------------+---------------------------+------------------------------------+
```

---

## 3. Automated Purge Automation (SQL Worker Tasks)

To prevent data liability buildup, the following database functions run on a scheduled cron runner (`pg_cron` or Supabase Edge Scheduled Functions):

```sql
-- 1. Automated Purge for Stale In-App Notifications (> 90 days old)
CREATE OR REPLACE FUNCTION public.purge_expired_notifications()
RETURNS INT AS $$
DECLARE
    deleted_count INT;
BEGIN
    DELETE FROM public.notifications
    WHERE created_at < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- 2. Automated Archival of Expired Job Postings (> 180 days past expiry)
CREATE OR REPLACE FUNCTION public.archive_stale_jobs()
RETURNS INT AS $$
DECLARE
    updated_count INT;
BEGIN
    UPDATE public.jobs
    SET status = 'archived'
    WHERE status = 'closed'
    AND expires_at < NOW() - INTERVAL '180 days';
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- 3. Automated Ephemeral DV-2027 Asset Destruction Flagging
CREATE OR REPLACE FUNCTION public.flag_expired_dv_assets()
RETURNS TABLE (storage_path TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT file_storage_path FROM public.resumes
    WHERE title ILIKE '%dv_lottery_temp%'
    AND created_at < NOW() - INTERVAL '60 days';
END;
$$ LANGUAGE plpgsql;
```

---

## 4. The Right to Erasure ("Right to be Forgotten")

Under Article 8 of Moroccan Law 09-08 and GDPR Article 17, candidates possess an absolute right to permanent data destruction.

### Cascading Hard Delete Procedure
When a candidate triggers account deletion via self-service:
```sql
CREATE OR REPLACE FUNCTION public.execute_candidate_erasure(target_profile_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Verify executing user is either the profile owner or superadmin
    IF auth.uid() != target_profile_id AND NOT auth.is_admin() THEN
        RAISE EXCEPTION 'Unauthorized erasure execution';
    END IF;

    -- 1. Applications table cascades automatically via FK (ON DELETE CASCADE)
    -- 2. Resumes table cascades automatically via FK (ON DELETE CASCADE)
    -- 3. Candidates table cascades automatically via FK (ON DELETE CASCADE)
    -- 4. Delete profile root in auth schema (triggers complete CASCADE)
    DELETE FROM auth.users WHERE id = target_profile_id;
    
    -- 5. Record irreversible deletion in audit trail (with anonymized actor)
    INSERT INTO audit.logs (actor_id, action, entity_name, record_id, old_values)
    VALUES (NULL, 'CANDIDATE_ERASURE_COMPLETED', 'profiles', target_profile_id, '{"erasure": true}'::JSONB);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---
*Data Retention and Destruction Policy certified for Phase 2 compliance.*
