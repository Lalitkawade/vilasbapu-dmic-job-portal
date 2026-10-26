-- DMIC Bidkin Employment Registration Portal
-- Migration: 000001_initial_schema.sql
-- Description: Core tables, reference catalogs, many-to-many relationship tables, follow-up, and audit log.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- REFERENCE CATALOG TABLES
-- ============================================================================

-- 1. Qualifications
CREATE TABLE IF NOT EXISTS public.qualifications (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    category VARCHAR(64) DEFAULT 'general',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Employment Levels (from Casual Labour to Senior Management)
CREATE TABLE IF NOT EXISTS public.employment_levels (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL, -- casual, skilled, supervisory, engineering, executive, management, other
    category_mr VARCHAR(255) NOT NULL,
    category_en VARCHAR(255) NOT NULL,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Job Departments
CREATE TABLE IF NOT EXISTS public.job_departments (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Specific Job Roles
CREATE TABLE IF NOT EXISTS public.job_roles (
    id VARCHAR(64) PRIMARY KEY,
    department_id VARCHAR(64) REFERENCES public.job_departments(id) ON DELETE CASCADE,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Technical Skills Catalog
CREATE TABLE IF NOT EXISTS public.skills (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL, -- mechanical, electrical, quality, logistics, computer, management, other
    category_mr VARCHAR(255) NOT NULL,
    category_en VARCHAR(255) NOT NULL,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Industry Preferences
CREATE TABLE IF NOT EXISTS public.industries (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Salary Bands
CREATE TABLE IF NOT EXISTS public.salary_bands (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    min_amount NUMERIC(10,2),
    max_amount NUMERIC(10,2),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Shift Preferences
CREATE TABLE IF NOT EXISTS public.shift_preferences (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Employment Types
CREATE TABLE IF NOT EXISTS public.employment_types (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Joining Availability
CREATE TABLE IF NOT EXISTS public.joining_availability_options (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Notice Period Options
CREATE TABLE IF NOT EXISTS public.notice_period_options (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Computer Proficiency Options
CREATE TABLE IF NOT EXISTS public.computer_proficiency_options (
    id VARCHAR(64) PRIMARY KEY,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- CANDIDATE PROFILES MASTER TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.candidate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number VARCHAR(32) NOT NULL UNIQUE,
    
    -- Section A: Personal Information
    full_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    normalized_mobile_number VARCHAR(10) NOT NULL,
    alternate_mobile_number VARCHAR(20),
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 80),
    village VARCHAR(100) NOT NULL,
    taluka VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL DEFAULT 'Chhatrapati Sambhajinagar',
    pin_code VARCHAR(10),
    current_location VARCHAR(255),
    willing_to_commute BOOLEAN NOT NULL DEFAULT true,
    willing_to_relocate BOOLEAN DEFAULT false,
    
    -- Section B: Education & Qualifications
    highest_qualification_id VARCHAR(64) REFERENCES public.qualifications(id),
    qualification_specialization VARCHAR(255),
    passing_year INTEGER,
    additional_qualifications TEXT,
    certifications_text TEXT,
    professional_licenses TEXT,
    computer_proficiency_id VARCHAR(64) REFERENCES public.computer_proficiency_options(id),
    
    -- Section F: Experience
    experience_category VARCHAR(32) NOT NULL DEFAULT 'fresher', -- fresher, experienced, apprentice
    total_experience_band VARCHAR(64) NOT NULL DEFAULT 'no_experience',
    total_experience_months INTEGER DEFAULT 0,
    previous_designation VARCHAR(255),
    previous_industry_id VARCHAR(64) REFERENCES public.industries(id),
    previous_employer VARCHAR(255),
    relevant_skills_gained TEXT,
    previous_responsibilities TEXT,
    notice_period_id VARCHAR(64) REFERENCES public.notice_period_options(id),
    earliest_joining_date DATE,
    
    -- Section H: Preferences
    expected_salary_band_id VARCHAR(64) REFERENCES public.salary_bands(id),
    employment_type_id VARCHAR(64) REFERENCES public.employment_types(id),
    shift_preference_id VARCHAR(64) REFERENCES public.shift_preferences(id),
    joining_availability_id VARCHAR(64) REFERENCES public.joining_availability_options(id),
    preferred_work_location VARCHAR(255),
    willing_overtime BOOLEAN DEFAULT false,
    languages TEXT[] DEFAULT ARRAY['Marathi']::TEXT[],
    
    -- Section I: Resume Upload (Private Storage Path)
    resume_storage_path TEXT,
    resume_original_name VARCHAR(255),
    resume_size_bytes BIGINT,
    resume_mime_type VARCHAR(100),
    
    -- Section J: Consent & Privacy
    consent_given BOOLEAN NOT NULL DEFAULT true,
    consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    privacy_notice_version VARCHAR(32) NOT NULL DEFAULT 'v1.0',
    
    -- Internal Administration & Tracking
    registration_source VARCHAR(64) DEFAULT 'public_web',
    follow_up_status VARCHAR(64) NOT NULL DEFAULT 'new', -- new, contacted, referred, interview, selected, placed, not_proceeding
    is_duplicate_flag BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- MANY-TO-MANY RELATIONSHIP TABLES
-- ============================================================================

-- Candidate Preferred Employment Levels (e.g., Casual Labour, Operator, Supervisor, Engineer)
CREATE TABLE IF NOT EXISTS public.candidate_employment_levels (
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    employment_level_id VARCHAR(64) NOT NULL REFERENCES public.employment_levels(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (candidate_id, employment_level_id)
);

-- Candidate Preferred Specific Job Roles
CREATE TABLE IF NOT EXISTS public.candidate_job_roles (
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    job_role_id VARCHAR(64) NOT NULL REFERENCES public.job_roles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (candidate_id, job_role_id)
);

-- Candidate Technical & Professional Skills
CREATE TABLE IF NOT EXISTS public.candidate_skills (
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    skill_id VARCHAR(64) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    is_other BOOLEAN DEFAULT false,
    other_skill_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (candidate_id, skill_id)
);

-- Candidate Industry Preferences
CREATE TABLE IF NOT EXISTS public.candidate_industries (
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    industry_id VARCHAR(64) NOT NULL REFERENCES public.industries(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (candidate_id, industry_id)
);

-- ============================================================================
-- CANDIDATE FOLLOW-UP AND INTERNAL NOTES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.candidate_followups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    status VARCHAR(64) NOT NULL,
    internal_note TEXT NOT NULL,
    created_by VARCHAR(255) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- ADMINISTRATIVE AUDIT LOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.administrative_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    administrator_id VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL, -- status_update, note_add, candidate_export, candidate_view, resume_download
    candidate_id UUID REFERENCES public.candidate_profiles(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_candidate_profiles_reg_num ON public.candidate_profiles (registration_number);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_mobile ON public.candidate_profiles (normalized_mobile_number);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_full_name ON public.candidate_profiles (full_name);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_village ON public.candidate_profiles (village);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_taluka ON public.candidate_profiles (taluka);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_qual ON public.candidate_profiles (highest_qualification_id);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_exp_cat ON public.candidate_profiles (experience_category);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_exp_band ON public.candidate_profiles (total_experience_band);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_status ON public.candidate_profiles (follow_up_status);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_created ON public.candidate_profiles (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_commute ON public.candidate_profiles (willing_to_commute);

CREATE INDEX IF NOT EXISTS idx_cand_skills_skill ON public.candidate_skills (skill_id);
CREATE INDEX IF NOT EXISTS idx_cand_roles_role ON public.candidate_job_roles (job_role_id);
CREATE INDEX IF NOT EXISTS idx_cand_levels_level ON public.candidate_employment_levels (employment_level_id);
CREATE INDEX IF NOT EXISTS idx_cand_ind_ind ON public.candidate_industries (industry_id);
CREATE INDEX IF NOT EXISTS idx_cand_followup_cand ON public.candidate_followups (candidate_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_cand ON public.administrative_audit_log (candidate_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_time ON public.administrative_audit_log (timestamp DESC);

-- Trigger for auto-updating updated_at on candidate_profiles
CREATE OR REPLACE FUNCTION public.handle_candidate_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_candidate_updated_at ON public.candidate_profiles;
CREATE TRIGGER set_candidate_updated_at
BEFORE UPDATE ON public.candidate_profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_candidate_updated_at();
