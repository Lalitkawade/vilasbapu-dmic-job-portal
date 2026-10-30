-- DMIC Bidkin Employment Registration Portal
-- Migration: 000003_rls_and_security.sql
-- Description: Strict Row Level Security (RLS) policies and authorized administrator access.

-- Enable RLS on all tables
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_employment_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_job_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.administrative_audit_log ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_bands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.joining_availability_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notice_period_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.computer_proficiency_options ENABLE ROW LEVEL SECURITY;

-- 1. REFERENCE CATALOGS: Public Read Access for Active Records
DROP POLICY IF EXISTS "Public can view active qualifications" ON public.qualifications;
CREATE POLICY "Public can view active qualifications" ON public.qualifications
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active employment levels" ON public.employment_levels;
CREATE POLICY "Public can view active employment levels" ON public.employment_levels
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active job departments" ON public.job_departments;
CREATE POLICY "Public can view active job departments" ON public.job_departments
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active job roles" ON public.job_roles;
CREATE POLICY "Public can view active job roles" ON public.job_roles
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active skills" ON public.skills;
CREATE POLICY "Public can view active skills" ON public.skills
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active industries" ON public.industries;
CREATE POLICY "Public can view active industries" ON public.industries
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active salary bands" ON public.salary_bands;
CREATE POLICY "Public can view active salary bands" ON public.salary_bands
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active shift preferences" ON public.shift_preferences;
CREATE POLICY "Public can view active shift preferences" ON public.shift_preferences
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active employment types" ON public.employment_types;
CREATE POLICY "Public can view active employment types" ON public.employment_types
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active joining availability" ON public.joining_availability_options;
CREATE POLICY "Public can view active joining availability" ON public.joining_availability_options
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active notice periods" ON public.notice_period_options;
CREATE POLICY "Public can view active notice periods" ON public.notice_period_options
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active computer proficiency" ON public.computer_proficiency_options;
CREATE POLICY "Public can view active computer proficiency" ON public.computer_proficiency_options
    FOR SELECT TO anon, authenticated USING (is_active = true);

-- 2. CANDIDATE PROFILES & RELATIONSHIPS:
-- STRICTLY DENIED TO ANONYMOUS USERS (NO PUBLIC SELECT, UPDATE, DELETE).
-- Accessible ONLY to Authenticated Office Administrators (auth.role() = 'authenticated').
DROP POLICY IF EXISTS "Admins can view all candidate profiles" ON public.candidate_profiles;
CREATE POLICY "Admins can view all candidate profiles" ON public.candidate_profiles
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can update candidate profiles" ON public.candidate_profiles;
CREATE POLICY "Admins can update candidate profiles" ON public.candidate_profiles
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view candidate employment levels" ON public.candidate_employment_levels;
CREATE POLICY "Admins can view candidate employment levels" ON public.candidate_employment_levels
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can view candidate job roles" ON public.candidate_job_roles;
CREATE POLICY "Admins can view candidate job roles" ON public.candidate_job_roles
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can view candidate skills" ON public.candidate_skills;
CREATE POLICY "Admins can view candidate skills" ON public.candidate_skills
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can view candidate industries" ON public.candidate_industries;
CREATE POLICY "Admins can view candidate industries" ON public.candidate_industries
    FOR SELECT TO authenticated USING (true);

-- 3. FOLLOW-UPS & AUDIT LOGS:
DROP POLICY IF EXISTS "Admins can view followups" ON public.candidate_followups;
CREATE POLICY "Admins can view followups" ON public.candidate_followups
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can insert followups" ON public.candidate_followups;
CREATE POLICY "Admins can insert followups" ON public.candidate_followups
    FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.administrative_audit_log;
CREATE POLICY "Admins can view audit logs" ON public.administrative_audit_log
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.administrative_audit_log;
CREATE POLICY "Admins can insert audit logs" ON public.administrative_audit_log
    FOR INSERT TO authenticated WITH CHECK (true);
