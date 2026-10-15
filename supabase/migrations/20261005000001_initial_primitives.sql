-- ==============================================================================
-- MEZDOHUB MIGRATION 001: INITIAL PRIMITIVES & ENUMS
-- Version: 1.0.0
-- Execution: Forward-only transactional block
-- ==============================================================================

BEGIN;

-- 1. Essential PostgreSQL Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- Universal Unique Identifiers
CREATE EXTENSION IF NOT EXISTS "citext";          -- Case-insensitive emails & text
CREATE EXTENSION IF NOT EXISTS "pgcrypto";        -- Cryptographic hashing utilities

-- 2. Audit Trail Segregated Schema
CREATE SCHEMA IF NOT EXISTS audit;

-- 3. Custom Enumerated Types (Domain-specific for Morocco & MENA)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'candidate', 
        'employer', 
        'admin', 
        'superadmin'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE education_level AS ENUM (
        'sans_diplome',
        'qualification',
        'bac',
        'technicien_ita',
        'technicien_specialise_ista',
        'deug_deup_bts',
        'licence_fondamentale',
        'licence_professionnelle',
        'master_specialise',
        'ingenieur_etat',
        'doctorat'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contract_type AS ENUM (
        'cdi',
        'cdd',
        'anapec',
        'stage_preembauche',
        'stage_pfe',
        'freelance_mission'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_status AS ENUM (
        'draft',
        'pending_review',
        'published',
        'paused',
        'closed',
        'archived'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM (
        'submitted',
        'dossier_in_review',
        'forwarded_to_hr',
        'interview_requested',
        'accepted_offer',
        'rejected',
        'withdrawn'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE dossier_package AS ENUM (
        'standard_free',
        'direct_hr_routing',
        'full_dossier_service',
        'dv_lottery_vip'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM (
        'application_status_changed',
        'interview_invite',
        'dossier_ready',
        'job_alert_match',
        'company_verification_approved',
        'system_announcement'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 4. Automatic Timestamp Update Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMIT;
