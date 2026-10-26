-- ====================================================================
-- DMIC BIDKIN EMPLOYMENT REGISTRATION PORTAL
-- MASTER ALL-IN-ONE DATABASE SETUP SCRIPT
-- ====================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Go to 'SQL Editor' in the left sidebar
-- 3. Click 'New query', paste this entire file, and click 'RUN' (or press Ctrl+Enter)
-- ====================================================================


-- >>> START OF 20260301000001_initial_schema.sql <<<

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


-- >>> END OF 20260301000001_initial_schema.sql <<<


-- >>> START OF 20260301000002_reference_catalog_seed.sql <<<

-- DMIC Bidkin Employment Registration Portal
-- Migration: 000002_reference_catalog_seed.sql
-- Description: Comprehensive reference data catalogues with English and Marathi translations.

-- ============================================================================
-- 1. QUALIFICATIONS
-- ============================================================================
INSERT INTO public.qualifications (id, name_en, name_mr, category, display_order) VALUES
('below_10th', 'Below 10th', '१०वी पेक्षा कमी', 'school', 10),
('10th_pass', '10th Pass (SSC)', '१०वी उत्तीर्ण (एसएससी)', 'school', 20),
('12th_pass', '12th Pass (HSC)', '१२वी उत्तीर्ण (एचएससी)', 'junior_college', 30),
('iti', 'ITI (Industrial Training)', 'आयटीआय (ITI)', 'vocational', 40),
('diploma_polytechnic', 'Diploma / Polytechnic', 'डिप्लोमा / पॉलिटेक्निक', 'technical', 50),
('bachelors_degree', 'Bachelor''s Degree (General)', 'पदवीधर (सामान्य)', 'graduation', 60),
('be_btech', 'BE / BTech (Engineering)', 'बी.ई. / बी.टेक (अभियांत्रिकी)', 'engineering', 70),
('bsc_msc', 'BSc / MSc (Science)', 'बी.एस्सी / एम.एस्सी (विज्ञान)', 'graduation', 80),
('ba_ma', 'BA / MA (Arts)', 'बी.ए. / एम.ए. (कला)', 'graduation', 90),
('bcom_mcom', 'BCom / MCom (Commerce)', 'बी.कॉम / एम.कॉम (वाणिज्य)', 'graduation', 100),
('bba_mba', 'BBA / MBA (Management)', 'बीबीए / एमबीए (व्यवस्थापन)', 'management', 110),
('bca_mca', 'BCA / MCA (Computer Applications)', 'बीसीए / एमसीए (संगणक)', 'it', 120),
('bpharm_mpharm', 'BPharm / MPharm (Pharmacy)', 'बी.फार्म / एम.फार्म (औषधनिर्माण)', 'pharma', 130),
('vocational_training', 'Vocational Training', 'व्यावसायिक प्रशिक्षण', 'vocational', 140),
('apprenticeship', 'Apprenticeship Completed', 'शिकाऊ उमेदवारी पूर्ण (Apprentice)', 'vocational', 150),
('other_qual', 'Other Qualification', 'इतर शिक्षण', 'other', 160)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 2. EMPLOYMENT LEVELS
-- ============================================================================
INSERT INTO public.employment_levels (id, category, category_en, category_mr, name_en, name_mr, display_order) VALUES
-- Casual and Entry-Level
('casual_labour', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Casual Labour', 'रोजंदारी कामगार', 10),
('helper', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Helper', 'मदतनीस', 20),
('unskilled_worker', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Unskilled Worker', 'अकुशल कामगार', 30),
('semi_skilled_worker', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Semi-Skilled Worker', 'अर्धकुशल कामगार', 40),
('general_worker', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'General Worker', 'सामान्य कामगार', 50),
('apprentice', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Apprentice', 'शिकाऊ उमेदवार', 60),
('trainee', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Trainee', 'प्रशिक्षणार्थी', 70),
('fresher', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Fresher', 'नवोदित उमेदवार', 80),
('production_worker', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Production Worker', 'उत्पादन कामगार', 90),
('assembly_worker', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Assembly Line Worker', 'असेंब्ली कामगार', 100),
('packer', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Packer', 'पॅकर', 110),
('loader_unloader', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Loader / Unloader', 'माल चढवणे-उतरवणे कामगार', 120),
('housekeeping_staff', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Housekeeping Staff', 'स्वच्छता कर्मचारी', 130),
('security_guard', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Security Guard', 'सुरक्षा रक्षक', 140),
('warehouse_worker', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Warehouse Worker', 'गोदाम कामगार', 150),
('driver', 'casual', 'Casual and Entry-Level', 'रोजंदारी आणि प्राथमिक पातळी', 'Driver', 'वाहनचालक', 160),

-- Skilled and Technical
('operator', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Operator', 'ऑपरेटर', 200),
('machine_operator', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Machine Operator', 'मशीन ऑपरेटर', 210),
('cnc_operator', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'CNC Operator', 'CNC ऑपरेटर', 220),
('technician', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Technician', 'तंत्रज्ञ', 230),
('iti_technician', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'ITI Technician', 'आयटीआय तंत्रज्ञ', 240),
('electrician', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Electrician', 'इलेक्ट्रिशियन', 250),
('fitter', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Fitter', 'फिटर', 260),
('welder', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Welder', 'वेल्डर', 270),
('fabricator', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Fabricator', 'फॅब्रिकेटर', 280),
('quality_inspector', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Quality Inspector', 'गुणवत्ता निरीक्षक', 290),
('maintenance_technician', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Maintenance Technician', 'देखभाल तंत्रज्ञ', 300),
('senior_technician', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Senior Technician', 'वरिष्ठ तंत्रज्ञ', 310),
('skilled_tradesperson', 'skilled', 'Skilled and Technical', 'कुशल आणि तांत्रिक', 'Skilled Tradesperson', 'कुशल कारागीर', 320),

-- Supervisory
('team_leader', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Team Leader', 'टीम लीडर', 400),
('shift_incharge', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Shift In-charge', 'शिफ्ट इन्चार्ज', 410),
('supervisor', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Supervisor', 'पर्यवेक्षक', 420),
('senior_supervisor', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Senior Supervisor', 'वरिष्ठ पर्यवेक्षक', 430),
('production_supervisor', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Production Supervisor', 'उत्पादन पर्यवेक्षक', 440),
('quality_supervisor', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Quality Supervisor', 'गुणवत्ता पर्यवेक्षक', 450),
('maintenance_supervisor', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Maintenance Supervisor', 'देखभाल पर्यवेक्षक', 460),
('stores_supervisor', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Stores Supervisor', 'स्टोअर्स पर्यवेक्षक', 470),
('safety_supervisor', 'supervisory', 'Supervisory', 'पर्यवेक्षी (सुपरवायझरी)', 'Safety Supervisor', 'सुरक्षा पर्यवेक्षक', 480),

-- Engineering and Specialist
('junior_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Junior Engineer', 'कनिष्ठ अभियंता', 500),
('engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Engineer', 'अभियंता', 510),
('senior_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Senior Engineer', 'वरिष्ठ अभियंता', 520),
('mechanical_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Mechanical Engineer', 'मेकॅनिकल अभियंता', 530),
('electrical_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Electrical Engineer', 'इलेक्ट्रिकल अभियंता', 540),
('production_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Production Engineer', 'उत्पादन अभियंता', 550),
('quality_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Quality Engineer', 'गुणवत्ता अभियंता', 560),
('maintenance_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Maintenance Engineer', 'देखभाल अभियंता', 570),
('design_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Design Engineer', 'डिझाइन अभियंता', 580),
('industrial_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Industrial Engineer', 'औद्योगिक अभियंता', 590),
('automation_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Automation Engineer', 'ऑटोमेशन अभियंता', 600),
('robotics_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Robotics Engineer', 'रोबोटिक्स अभियंता', 610),
('software_engineer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Software Engineer', 'सॉफ्टवेअर अभियंता', 620),
('safety_officer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Safety Officer', 'सुरक्षा अधिकारी', 630),
('environmental_officer', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Environmental Officer', 'पर्यावरण अधिकारी', 640),
('specialist', 'engineering', 'Engineering and Specialist', 'अभियांत्रिकी आणि तज्ज्ञ', 'Specialist', 'तांत्रिक तज्ज्ञ', 650),

-- Executive and Office
('office_assistant', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Office Assistant', 'कार्यालयीन सहाय्यक', 700),
('data_entry_operator', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Data Entry Operator', 'डेटा एंट्री ऑपरेटर', 710),
('computer_operator', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Computer Operator', 'संगणक ऑपरेटर', 720),
('hr_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'HR Executive', 'एचआर एक्झिक्युटिव्ह', 730),
('accounts_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Accounts Executive', 'लेखा कार्यकारी', 740),
('admin_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Administrative Executive', 'प्रशासकीय कार्यकारी', 750),
('purchase_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Purchase Executive', 'खरेदी कार्यकारी', 760),
('procurement_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Procurement Executive', 'प्रोक्योरमेंट कार्यकारी', 770),
('logistics_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Logistics Executive', 'लॉजिस्टिक्स कार्यकारी', 780),
('sales_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Sales Executive', 'विक्री कार्यकारी', 790),
('support_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Customer Support Executive', 'ग्राहक सेवा कार्यकारी', 800),
('senior_executive', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Senior Executive', 'वरिष्ठ कार्यकारी', 810),
('analyst', 'executive', 'Executive and Office', 'कार्यालयीन आणि कार्यकारी', 'Analyst', 'विश्लेषक', 820),

-- Management
('asst_manager', 'management', 'Management', 'व्यवस्थापन पातळी', 'Assistant Manager', 'सहाय्यक व्यवस्थापक', 900),
('deputy_manager', 'management', 'Management', 'व्यवस्थापन पातळी', 'Deputy Manager', 'उपव्यवस्थापक', 910),
('manager', 'management', 'Management', 'व्यवस्थापन पातळी', 'Manager', 'व्यवस्थापक', 920),
('senior_manager', 'management', 'Management', 'व्यवस्थापन पातळी', 'Senior Manager', 'वरिष्ठ व्यवस्थापक', 930),
('dept_head', 'management', 'Management', 'व्यवस्थापन पातळी', 'Department Head', 'विभागप्रमुख', 940),
('plant_manager', 'management', 'Management', 'व्यवस्थापन पातळी', 'Plant Manager', 'प्लांट व्यवस्थापक', 950),
('ops_manager', 'management', 'Management', 'व्यवस्थापन पातळी', 'Operations Manager', 'ऑपरेशन्स व्यवस्थापक', 960),
('general_manager', 'management', 'Management', 'व्यवस्थापन पातळी', 'General Manager', 'जनरल मॅनेजर', 970),
('other_level', 'other', 'Other', 'इतर', 'Other Level', 'इतर पातळी', 999)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 3. JOB DEPARTMENTS (22 Departments)
-- ============================================================================
INSERT INTO public.job_departments (id, name_en, name_mr, display_order) VALUES
('dept_production', 'Production and Manufacturing', 'उत्पादन आणि निर्मिती', 1),
('dept_machine_ops', 'Machine Operations', 'मशीन ऑपरेशन्स', 2),
('dept_cnc_fab_weld', 'CNC, Fabrication and Welding', 'CNC, फॅब्रिकेशन आणि वेल्डिंग', 3),
('dept_mech_eng', 'Mechanical Engineering', 'मेकॅनिकल अभियांत्रिकी', 4),
('dept_elec_eng', 'Electrical Engineering', 'इलेक्ट्रिकल अभियांत्रिकी', 5),
('dept_electronics_inst', 'Electronics and Instrumentation', 'इलेक्ट्रॉनिक्स आणि इन्स्ट्रुमेंटेशन', 6),
('dept_qa_qc', 'Quality Control and Quality Assurance', 'गुणवत्ता नियंत्रण (QA/QC)', 7),
('dept_maint_util', 'Maintenance and Utilities', 'देखभाल आणि युटिलिटीज्', 8),
('dept_automation_robotics', 'Industrial Automation and Robotics', 'इंडस्ट्रियल ऑटोमेशन आणि रोबोटिक्स', 9),
('dept_she', 'Safety, Health and Environment (EHS)', 'सुरक्षा, आरोग्य आणि पर्यावरण', 10),
('dept_warehouse_stores', 'Warehouse, Stores and Inventory', 'गोदाम, स्टोअर्स आणि इन्व्हेंटरी', 11),
('dept_logistics_dispatch', 'Logistics, Transport and Dispatch', 'लॉजिस्टिक्स, वाहतूक आणि डिस्पॅच', 12),
('dept_procurement_scm', 'Procurement and Supply Chain', 'खरेदी आणि सप्लाय चेन', 13),
('dept_hr_admin', 'HR and Administration', 'मानव संसाधन (HR) आणि प्रशासन', 14),
('dept_finance_accounts', 'Accounts, Finance and Audit', 'लेखा, वित्त आणि ऑडिट', 15),
('dept_it_computer', 'IT, Software and Computer Operations', 'आयटी, सॉफ्टवेअर आणि संगणक कार्य', 16),
('dept_sales_marketing', 'Sales, Marketing and Customer Support', 'विक्री, विपणन आणि ग्राहक सेवा', 17),
('dept_civil_construction', 'Construction and Civil Engineering', 'बांधकाम आणि सिव्हिल अभियांत्रिकी', 18),
('dept_packaging_assembly', 'Packaging and Assembly', 'पॅकेजिंग आणि असेंब्ली', 19),
('dept_supervisory_mgmt', 'Supervisory and Management', 'पर्यवेक्षण आणि व्यवस्थापन', 20),
('dept_facility_security', 'Housekeeping, Security and Facility Management', 'हाउसकीपिंग, सुरक्षा आणि सुविधा व्यवस्थापन', 21),
('dept_other', 'Other Roles', 'इतर पदे', 22)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 4. SPECIFIC JOB ROLES
-- ============================================================================
INSERT INTO public.job_roles (id, department_id, name_en, name_mr, display_order) VALUES
-- Production and Manufacturing
('role_prod_worker', 'dept_production', 'Production Worker / Helper', 'उत्पादन कामगार / मदतनीस', 10),
('role_assembly_op', 'dept_production', 'Assembly Line Operator', 'असेंब्ली लाईन ऑपरेटर', 20),
('role_prod_supervisor', 'dept_production', 'Production Supervisor', 'उत्पादन पर्यवेक्षक', 30),
('role_prod_engineer', 'dept_production', 'Production Engineer', 'उत्पादन अभियंता', 40),

-- Machine Operations
('role_lathe_operator', 'dept_machine_ops', 'Lathe Machine Operator', 'लेथ मशीन ऑपरेटर', 50),
('role_milling_operator', 'dept_machine_ops', 'Milling Machine Operator', 'मिलिंग मशीन ऑपरेटर', 60),
('role_press_operator', 'dept_machine_ops', 'Power Press Operator', 'प्रेस ऑपरेटर', 70),
('role_grinding_operator', 'dept_machine_ops', 'Grinding Machine Operator', 'ग्राइंडिंग ऑपरेटर', 80),

-- CNC, Fabrication and Welding
('role_cnc_operator', 'dept_cnc_fab_weld', 'CNC Machine Operator', 'CNC ऑपरेटर', 90),
('role_vmc_operator', 'dept_cnc_fab_weld', 'VMC Machine Operator / Setter', 'VMC ऑपरेटर / सेटर', 100),
('role_cnc_programmer', 'dept_cnc_fab_weld', 'CNC Programmer', 'CNC प्रोग्रॅमर', 110),
('role_welder_mig_tig', 'dept_cnc_fab_weld', 'Welder (ARC / MIG / TIG)', 'वेल्डर (MIG/TIG/ARC)', 120),
('role_fitter_fabricator', 'dept_cnc_fab_weld', 'Fabricator & Structural Fitter', 'फॅब्रिकेटर आणि फिटर', 130),

-- Mechanical Engineering
('role_mech_technician', 'dept_mech_eng', 'Mechanical Maintenance Technician', 'मेकॅनिकल देखभाल तंत्रज्ञ', 140),
('role_mech_engineer', 'dept_mech_eng', 'Mechanical Engineer', 'मेकॅनिकल अभियंता', 150),
('role_tool_die_maker', 'dept_mech_eng', 'Tool & Die Maker', 'टूल आणि डाय मेकर', 160),

-- Electrical Engineering
('role_industrial_electrician', 'dept_elec_eng', 'Industrial Electrician', 'औद्योगिक इलेक्ट्रिशियन', 170),
('role_panel_wireman', 'dept_elec_eng', 'Control Panel Wireman', 'कंट्रोल पॅनेल वायरमन', 180),
('role_electrical_engineer', 'dept_elec_eng', 'Electrical Engineer', 'इलेक्ट्रिकल अभियंता', 190),

-- Electronics and Instrumentation
('role_instrument_technician', 'dept_electronics_inst', 'Instrumentation Technician', 'इन्स्ट्रुमेंटेशन तंत्रज्ञ', 200),
('role_plc_programmer', 'dept_automation_robotics', 'PLC & SCADA Programmer', 'PLC आणि SCADA प्रोग्रॅमर', 210),
('role_robotics_technician', 'dept_automation_robotics', 'Robotics Technician / Engineer', 'रोबोटिक्स तंत्रज्ञ', 220),

-- Quality Control
('role_qc_inspector', 'dept_qa_qc', 'Quality Inspector (CMM / Vernier)', 'गुणवत्ता निरीक्षक (QC)', 230),
('role_qa_engineer', 'dept_qa_qc', 'QA / QC Engineer', 'QA/QC अभियंता', 240),

-- Maintenance & Utilities
('role_maintenance_fitter', 'dept_maint_util', 'Maintenance Fitter', 'मेंटेनन्स फिटर', 250),
('role_boiler_attendant', 'dept_maint_util', 'Boiler Attendant / Operator', 'बॉइलर ऑपरेटर', 260),
('role_compressor_operator', 'dept_maint_util', 'Compressor / Utility Operator', 'युटिलिटी ऑपरेटर', 270),

-- Safety & EHS
('role_safety_supervisor', 'dept_she', 'Safety Supervisor / Officer', 'सुरक्षा अधिकारी (Safety Officer)', 280),
('role_fire_officer', 'dept_she', 'Fire & Safety Marshal', 'अग्निशमन व सुरक्षा रक्षक', 290),

-- Warehouse & Logistics
('role_storekeeper', 'dept_warehouse_stores', 'Storekeeper / Inventory Assistant', 'स्टोअरकीपर / इन्व्हेंटरी सहाय्यक', 300),
('role_forklift_operator', 'dept_warehouse_stores', 'Forklift Operator', 'फोर्कलिफ्ट चालक', 310),
('role_dispatch_executive', 'dept_logistics_dispatch', 'Dispatch & Logistics Executive', 'डिस्पॅच आणि लॉजिस्टिक्स कार्यकारी', 320),
('role_commercial_driver', 'dept_logistics_dispatch', 'Heavy Commercial Driver', 'हेवी कमर्शियल ड्रायव्हर', 330),

-- Office, Accounts & IT
('role_data_entry', 'dept_it_computer', 'Data Entry & Office Assistant', 'डेटा एंट्री व कार्यालयीन सहाय्यक', 340),
('role_tally_accountant', 'dept_finance_accounts', 'Accounts Assistant / Tally Operator', 'अकाउंटंट (Tally)', 350),
('role_it_support', 'dept_it_computer', 'IT Hardware & Network Support', 'आयटी हार्डवेअर व नेटवर्किंग', 360),
('role_hr_executive', 'dept_hr_admin', 'HR & Time Office Executive', 'एचआर व टाईम ऑफिस कार्यकारी', 370),

-- Housekeeping & Security
('role_security_guard', 'dept_facility_security', 'Security Guard / Supervisor', 'सुरक्षा रक्षक / पर्यवेक्षक', 380),
('role_housekeeping_cleaner', 'dept_facility_security', 'Housekeeping Cleaner / Boy', 'स्वच्छता कर्मचारी', 390),
('role_general_other', 'dept_other', 'Other Specific Role', 'इतर विशिष्ट काम', 400)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 5. TECHNICAL SKILLS CATALOG (6 Categories)
-- ============================================================================
INSERT INTO public.skills (id, category, category_en, category_mr, name_en, name_mr, display_order) VALUES
-- Mechanical and Manufacturing
('skill_fitting', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Fitting', 'फिटींग (Fitting)', 10),
('skill_cnc', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'CNC Operating & Programming', 'CNC ऑपरेटिंग व प्रोग्रॅमिंग', 20),
('skill_vmc', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'VMC Operating', 'VMC ऑपरेटिंग', 30),
('skill_lathe', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Lathe Machine', 'लेथ मशीन', 40),
('skill_milling', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Milling', 'मिलिंग', 50),
('skill_welding', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Welding (ARC / MIG / TIG)', 'वेल्डिंग (ARC/MIG/TIG)', 60),
('skill_fabrication', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Fabrication', 'फॅब्रिकेशन', 70),
('skill_assembly', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Assembly', 'असेंब्ली', 80),
('skill_machine_op', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Machine Operation', 'मशीन ऑपरेशन', 90),
('skill_mech_maint', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Mechanical Maintenance', 'मेकॅनिकल मेंटेनन्स', 100),
('skill_hydraulics', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Hydraulics', 'हायड्रॉलिक्स', 110),
('skill_pneumatics', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Pneumatics', 'न्यूमॅटिक्स', 120),
('skill_prod_planning', 'mechanical', 'Mechanical and Manufacturing', 'मेकॅनिकल आणि उत्पादन कौशल्ये', 'Production Planning', 'उत्पादन नियोजन (PPC)', 130),

-- Electrical and Electronics
('skill_ind_wiring', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'Industrial Wiring', 'इंडस्ट्रियल वायरिंग', 200),
('skill_elec_maint', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'Electrical Maintenance', 'इलेक्ट्रिकल मेंटेनन्स', 210),
('skill_plc', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'PLC Programming', 'PLC प्रोग्रॅमिंग', 220),
('skill_scada', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'SCADA Systems', 'SCADA सिस्टीम', 230),
('skill_instrumentation', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'Instrumentation', 'इन्स्ट्रुमेंटेशन', 240),
('skill_electronics_repair', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'Electronics Repair', 'इलेक्ट्रॉनिक्स दुरुस्ती', 250),
('skill_panel_wiring', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'Control Panel Wiring', 'कंट्रोल पॅनेल वायरिंग', 260),
('skill_motor_control', 'electrical', 'Electrical and Electronics', 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', 'Motor Control & Drives', 'मोटर कंट्रोल आणि ड्राइव्ह्ज', 270),

-- Quality and Safety
('skill_quality_insp', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'Quality Inspection', 'गुणवत्ता तपासणी', 300),
('skill_quality_assurance', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'Quality Assurance (QA)', 'गुणवत्ता हमी (QA)', 310),
('skill_testing', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'Product Testing', 'उत्पादन चाचणी', 320),
('skill_measure_inst', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'Measurement Instruments (Vernier/Micrometer)', 'मापन साधने (व्हर्नियर/मायक्रोमीटर)', 330),
('skill_iso_doc', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'ISO Documentation', 'आयएसओ (ISO) दस्तऐवजीकरण', 340),
('skill_safety_procedures', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'Industrial Safety Procedures', 'सुरक्षा पद्धती व नियम', 350),
('skill_ehs', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'EHS Management', 'EHS पर्यावरण व सुरक्षा', 360),
('skill_rca', 'quality', 'Quality and Safety', 'गुणवत्ता आणि सुरक्षा', 'Root Cause Analysis', 'रूट कॉज ॲनालिसीस (RCA)', 370),

-- Logistics and Operations
('skill_inventory_mgmt', 'logistics', 'Logistics and Operations', 'लॉजिस्टिक्स आणि कार्यप्रणाली', 'Inventory Management', 'इन्व्हेंटरी व्यवस्थापन', 400),
('skill_warehouse_ops', 'logistics', 'Logistics and Operations', 'लॉजिस्टिक्स आणि कार्यप्रणाली', 'Warehouse Operations', 'गोदाम कामकाज', 410),
('skill_dispatch', 'logistics', 'Logistics and Operations', 'लॉजिस्टिक्स आणि कार्यप्रणाली', 'Dispatch & Material Handling', 'डिस्पॅच आणि माल हाताळणी', 420),
('skill_forklift', 'logistics', 'Logistics and Operations', 'लॉजिस्टिक्स आणि कार्यप्रणाली', 'Forklift Operation', 'फोर्कलिफ्ट चालवणे', 430),
('skill_transport_coord', 'logistics', 'Logistics and Operations', 'लॉजिस्टिक्स आणि कार्यप्रणाली', 'Transport Coordination', 'वाहतूक समन्वय', 440),
('skill_supply_chain', 'logistics', 'Logistics and Operations', 'लॉजिस्टिक्स आणि कार्यप्रणाली', 'Supply Chain Management', 'सप्लाय चेन व्यवस्थापन', 450),
('skill_procurement', 'logistics', 'Logistics and Operations', 'लॉजिस्टिक्स आणि कार्यप्रणाली', 'Procurement & Purchasing', 'खरेदी आणि संपादन', 460),

-- Computer and Office
('skill_basic_comp', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Basic Computer', 'मूलभूत संगणक ज्ञान (MS-CIT)', 500),
('skill_ms_word', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'MS Word', 'एमएस वर्ड (MS Word)', 510),
('skill_excel', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Excel (Spreadsheet)', 'एक्सेल (Excel)', 520),
('skill_adv_excel', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Advanced Excel (VLOOKUP, Pivot)', 'ॲडव्हान्स एक्सेल', 530),
('skill_data_entry', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Data Entry & Typing', 'डेटा एंट्री आणि टायपिंग', 540),
('skill_email_internet', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Email and Internet', 'ईमेल आणि इंटरनेट वापर', 550),
('skill_tally', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Tally Prime / ERP 9', 'टॅली (Tally)', 560),
('skill_accounting_sw', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Accounting Software', 'लेखा सॉफ्टवेअर', 570),
('skill_erp_sap', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'ERP / SAP', 'ईआरपी / सॅप (SAP)', 580),
('skill_autocad', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'AutoCAD (2D/3D)', 'ऑटोकॅड (AutoCAD)', 590),
('skill_solidworks', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'SolidWorks / CAD CAM', 'सॉलिडवर्क्स / कॅड कॅम', 600),
('skill_programming', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Computer Programming', 'संगणक प्रोग्रॅमिंग', 610),
('skill_it_support', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'IT Hardware & Support', 'आयटी हार्डवेअर व सपोर्ट', 620),
('skill_networking', 'computer', 'Computer and Office', 'संगणक आणि कार्यालयीन कौशल्ये', 'Computer Networking', 'नेटवर्किंग', 630),

-- Management and Business
('skill_team_mgmt', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Team Management', 'टीम व्यवस्थापन', 700),
('skill_communication', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Communication Skills', 'संभाषण कौशल्य', 710),
('skill_documentation', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Documentation & Filing', 'दस्तऐवजीकरण व फाईलिंग', 720),
('skill_project_mgmt', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Project Management', 'प्रकल्प व्यवस्थापन', 730),
('skill_quality_mgmt', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Quality Management Systems', 'गुणवत्ता व्यवस्थापन प्रणाली', 740),
('skill_vendor_mgmt', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Vendor Management', 'व्हेंडर व्यवस्थापन', 750),
('skill_customer_service', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Customer Service', 'ग्राहक सेवा', 760),
('skill_sales', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Sales & Marketing', 'विक्री आणि विपणन', 770),
('skill_administration', 'management', 'Management and Business', 'व्यवस्थापन आणि व्यवसाय कौशल्ये', 'Office Administration', 'कार्यालय प्रशासन', 780),
('skill_other', 'other', 'Other Skills', 'इतर कौशल्ये', 'Other Technical Skill', 'इतर तांत्रिक कौशल्य', 999)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 6. INDUSTRY PREFERENCES (21 Categories)
-- ============================================================================
INSERT INTO public.industries (id, name_en, name_mr, display_order) VALUES
('ind_auto', 'Automobile and Auto Components', 'ऑटोमोबाईल आणि वाहन सुटे भाग उद्योग', 10),
('ind_general_mfg', 'General Manufacturing', 'सर्वसाधारण उत्पादन व कारखानदारी', 20),
('ind_heavy_eng', 'Engineering and Heavy Machinery', 'अभियांत्रिकी व अवजड यंत्रसामग्री', 30),
('ind_electronics', 'Electronics and Electrical Equipment', 'इलेक्ट्रॉनिक्स व विद्युत उपकरणे', 40),
('ind_pharma', 'Pharmaceuticals', 'औषध निर्माण उद्योग (फार्मास्युटिकल्स)', 50),
('ind_chemicals', 'Chemicals and Petrochemicals', 'रसायन उद्योग (केमिकल्स)', 60),
('ind_food_proc', 'Food Processing', 'अन्न प्रक्रिया उद्योग (फूड प्रोसेसिंग)', 70),
('ind_fmcg', 'FMCG (Fast Moving Consumer Goods)', 'एफएमसीजी (ग्राहकोपयोगी वस्तू)', 80),
('ind_textiles', 'Textiles and Garments', 'कापड उद्योग आणि गारमेंट्स', 90),
('ind_plastics', 'Plastics and Packaging', 'प्लॅस्टिक्स आणि पॅकेजिंग', 100),
('ind_steel_metal', 'Steel and Metal Processing', 'पोलाद आणि धातू प्रक्रिया उद्योग', 110),
('ind_renew_energy', 'Renewable Energy (Solar / Wind)', 'अपारंपरिक ऊर्जा (सौर/पवन ऊर्जा)', 120),
('ind_logistics', 'Logistics and Warehousing', 'लॉजिस्टिक्स आणि वेअरहाऊसिंग (गोदामे)', 130),
('ind_construction', 'Construction and Infrastructure', 'बांधकाम आणि पायाभूत सुविधा', 140),
('ind_automation', 'Industrial Automation and Robotics', 'इंडस्ट्रियल ऑटोमेशन आणि रोबोटिक्स', 150),
('ind_it_software', 'IT and Software Services', 'माहिती तंत्रज्ञान (IT) आणि सॉफ्टवेअर', 160),
('ind_banking_fin', 'Banking and Finance', 'बँकिंग आणि वित्तीय सेवा', 170),
('ind_retail_sales', 'Retail and Sales', 'किरकोळ विक्री (रिटेल) व सेल्स', 180),
('ind_facility_mgmt', 'Facility Management & Services', 'सुविधा व्यवस्थापन व सेवा', 190),
('ind_any_suitable', 'Any Suitable Industry', 'कोणताही योग्य उद्योग', 200),
('ind_other', 'Other Industry', 'इतर उद्योग', 210)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 7. SALARY BANDS
-- ============================================================================
INSERT INTO public.salary_bands (id, name_en, name_mr, min_amount, max_amount, display_order) VALUES
('below_10k', 'Below ₹10,000', '₹१०,००० पेक्षा कमी', 0, 10000, 10),
('10k_15k', '₹10,000 – ₹15,000', '₹१०,००० ते ₹१५,०००', 10000, 15000, 20),
('15k_20k', '₹15,000 – ₹20,000', '₹१५,००० ते ₹२०,०००', 15000, 20000, 30),
('20k_30k', '₹20,000 – ₹30,000', '₹२०,००० ते ₹३०,०००', 20000, 30000, 40),
('30k_50k', '₹30,000 – ₹50,000', '₹३०,००० ते ₹५०,०००', 30000, 50000, 50),
('50k_75k', '₹50,000 – ₹75,000', '₹५०,००० ते ₹७५,०००', 50000, 75000, 60),
('75k_100k', '₹75,000 – ₹1,00,000', '₹७५,००० ते ₹१,००,०००', 75000, 100000, 70),
('above_100k', 'Above ₹1,00,000', '₹१,००,००० पेक्षा जास्त', 100000, NULL, 80),
('negotiable', 'Negotiable / Market Standards', 'चर्चेनुसार / नियमानुसार', NULL, NULL, 90)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 8. SHIFT PREFERENCES
-- ============================================================================
INSERT INTO public.shift_preferences (id, name_en, name_mr, display_order) VALUES
('general_shift', 'General Shift', 'जनरल शिफ्ट (दिवस)', 10),
('day_shift', 'Day Shift Only', 'फक्त दिवसाची शिफ्ट', 20),
('night_shift', 'Night Shift', 'रात्रीची शिफ्ट', 30),
('rotational_shift', 'Rotational Shift', 'बदलती शिफ्ट (रोटेशनल)', 40),
('any_shift', 'Any Shift', 'कोणतीही शिफ्ट चालेल', 50)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 9. EMPLOYMENT TYPES
-- ============================================================================
INSERT INTO public.employment_types (id, name_en, name_mr, display_order) VALUES
('permanent', 'Permanent', 'कायमस्वरूपी (Permanent)', 10),
('contract', 'Contractual', 'कंत्राटी (Contract)', 20),
('temporary', 'Temporary', 'तात्पुरती (Temporary)', 30),
('casual', 'Casual / Daily Wage', 'रोजंदारी (Casual)', 40),
('apprenticeship', 'Apprenticeship', 'शिकाऊ उमेदवारी (Apprenticeship)', 50),
('internship', 'Internship', 'इंटर्नशिप (Internship)', 60),
('full_time', 'Full-Time', 'पूर्ण वेळ (Full-Time)', 70),
('part_time', 'Part-Time', 'अर्धा वेळ (Part-Time)', 80)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 10. JOINING AVAILABILITY
-- ============================================================================
INSERT INTO public.joining_availability_options (id, name_en, name_mr, display_order) VALUES
('immediately', 'Immediately', 'त्वरित (आजच/उद्या)', 10),
('within_7_days', 'Within 7 Days', '७ दिवसांच्या आत', 20),
('within_15_days', 'Within 15 Days', '१५ दिवसांच्या आत', 30),
('within_30_days', 'Within 30 Days', '३० दिवसांच्या आत (१ महिना)', 40),
('within_60_days', 'Within 60 Days', '६० दिवसांच्या आत (२ महिने)', 50),
('more_than_60_days', 'More Than 60 Days', '६० दिवसांपेक्षा जास्त', 60)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 11. NOTICE PERIOD OPTIONS
-- ============================================================================
INSERT INTO public.notice_period_options (id, name_en, name_mr, display_order) VALUES
('notice_immediate', 'Immediate / No Notice', 'त्वरित / नोटीस नाही', 10),
('notice_15_days', '15 Days', '१५ दिवस', 20),
('notice_30_days', '30 Days', '३० दिवस', 30),
('notice_60_days', '60 Days', '६० दिवस', 40),
('notice_90_days', '90 Days', '९० दिवस', 50)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;

-- ============================================================================
-- 12. COMPUTER PROFICIENCY
-- ============================================================================
INSERT INTO public.computer_proficiency_options (id, name_en, name_mr, display_order) VALUES
('none', 'No Computer Knowledge', 'संगणक माहिती नाही', 10),
('basic', 'Basic (MS-CIT / Typing / Internet)', 'मूलभूत (MS-CIT / टायपिंग / इंटरनेट)', 20),
('intermediate', 'Intermediate (MS Office / Tally / Email)', 'मध्यम (MS Office / टॅली / व्यावसायिक कामे)', 30),
('advanced', 'Advanced (Software / Coding / ERP / CAD)', 'प्रगत (सॉफ्टवेअर / कोडिंग / ERP / CAD)', 40)
ON CONFLICT (id) DO UPDATE SET name_en = EXCLUDED.name_en, name_mr = EXCLUDED.name_mr;


-- >>> END OF 20260301000002_reference_catalog_seed.sql <<<


-- >>> START OF 20260301000003_rls_and_security.sql <<<

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
CREATE POLICY "Public can view active qualifications" ON public.qualifications
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active employment levels" ON public.employment_levels
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active job departments" ON public.job_departments
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active job roles" ON public.job_roles
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active skills" ON public.skills
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active industries" ON public.industries
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active salary bands" ON public.salary_bands
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active shift preferences" ON public.shift_preferences
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active employment types" ON public.employment_types
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active joining availability" ON public.joining_availability_options
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active notice periods" ON public.notice_period_options
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view active computer proficiency" ON public.computer_proficiency_options
    FOR SELECT TO anon, authenticated USING (is_active = true);

-- 2. CANDIDATE PROFILES & RELATIONSHIPS:
-- STRICTLY DENIED TO ANONYMOUS USERS (NO PUBLIC SELECT, UPDATE, DELETE).
-- Accessible ONLY to Authenticated Office Administrators (auth.role() = 'authenticated').
CREATE POLICY "Admins can view all candidate profiles" ON public.candidate_profiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can update candidate profiles" ON public.candidate_profiles
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can view candidate employment levels" ON public.candidate_employment_levels
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can view candidate job roles" ON public.candidate_job_roles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can view candidate skills" ON public.candidate_skills
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can view candidate industries" ON public.candidate_industries
    FOR SELECT TO authenticated USING (true);

-- 3. FOLLOW-UPS & AUDIT LOGS:
CREATE POLICY "Admins can view followups" ON public.candidate_followups
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert followups" ON public.candidate_followups
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can view audit logs" ON public.administrative_audit_log
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert audit logs" ON public.administrative_audit_log
    FOR INSERT TO authenticated WITH CHECK (true);


-- >>> END OF 20260301000003_rls_and_security.sql <<<


-- >>> START OF 20260301000004_registration_rpc.sql <<<

-- DMIC Bidkin Employment Registration Portal
-- Migration: 000004_registration_rpc.sql
-- Description: Hardened SECURITY DEFINER RPC function for public registration.
-- This function allows anonymous users to register without granting public INSERT/SELECT on tables.

CREATE OR REPLACE FUNCTION public.submit_candidate_registration(
    p_full_name TEXT,
    p_mobile_number TEXT,
    p_alternate_mobile_number TEXT DEFAULT NULL,
    p_age INTEGER DEFAULT 18,
    p_village TEXT DEFAULT '',
    p_taluka TEXT DEFAULT '',
    p_district TEXT DEFAULT 'Chhatrapati Sambhajinagar',
    p_pin_code TEXT DEFAULT NULL,
    p_current_location TEXT DEFAULT NULL,
    p_willing_to_commute BOOLEAN DEFAULT true,
    p_willing_to_relocate BOOLEAN DEFAULT false,
    p_highest_qualification_id TEXT DEFAULT NULL,
    p_qualification_specialization TEXT DEFAULT NULL,
    p_passing_year INTEGER DEFAULT NULL,
    p_additional_qualifications TEXT DEFAULT NULL,
    p_certifications_text TEXT DEFAULT NULL,
    p_professional_licenses TEXT DEFAULT NULL,
    p_computer_proficiency_id TEXT DEFAULT NULL,
    p_experience_category TEXT DEFAULT 'fresher',
    p_total_experience_band TEXT DEFAULT 'no_experience',
    p_total_experience_months INTEGER DEFAULT 0,
    p_previous_designation TEXT DEFAULT NULL,
    p_previous_industry_id TEXT DEFAULT NULL,
    p_previous_employer TEXT DEFAULT NULL,
    p_relevant_skills_gained TEXT DEFAULT NULL,
    p_previous_responsibilities TEXT DEFAULT NULL,
    p_notice_period_id TEXT DEFAULT NULL,
    p_earliest_joining_date DATE DEFAULT NULL,
    p_expected_salary_band_id TEXT DEFAULT NULL,
    p_employment_type_id TEXT DEFAULT NULL,
    p_shift_preference_id TEXT DEFAULT NULL,
    p_joining_availability_id TEXT DEFAULT NULL,
    p_preferred_work_location TEXT DEFAULT NULL,
    p_willing_overtime BOOLEAN DEFAULT false,
    p_languages TEXT[] DEFAULT ARRAY['Marathi']::TEXT[],
    p_resume_storage_path TEXT DEFAULT NULL,
    p_resume_original_name TEXT DEFAULT NULL,
    p_resume_size_bytes BIGINT DEFAULT NULL,
    p_resume_mime_type TEXT DEFAULT NULL,
    p_consent_given BOOLEAN DEFAULT true,
    p_privacy_notice_version TEXT DEFAULT 'v1.0',
    -- Many-to-Many Array IDs
    p_employment_level_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    p_job_role_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    p_skill_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    p_other_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    p_industry_ids TEXT[] DEFAULT ARRAY[]::TEXT[]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_clean_mobile VARCHAR(10);
    v_candidate_id UUID;
    v_reg_number VARCHAR(32);
    v_year VARCHAR(4);
    v_random_seq VARCHAR(6);
    v_is_duplicate BOOLEAN := false;
    v_level_id TEXT;
    v_role_id TEXT;
    v_skill_id TEXT;
    v_other_skill TEXT;
    v_ind_id TEXT;
BEGIN
    -- 1. Validate mandatory fields
    IF trim(COALESCE(p_full_name, '')) = '' THEN
        RAISE EXCEPTION 'Full name is required';
    END IF;

    IF trim(COALESCE(p_mobile_number, '')) = '' THEN
        RAISE EXCEPTION 'Mobile number is required';
    END IF;

    IF p_age < 18 THEN
        RAISE EXCEPTION 'Candidate must be at least 18 years of age';
    END IF;

    IF trim(COALESCE(p_village, '')) = '' THEN
        RAISE EXCEPTION 'Village is required';
    END IF;

    IF trim(COALESCE(p_taluka, '')) = '' THEN
        RAISE EXCEPTION 'Taluka is required';
    END IF;

    IF p_consent_given IS NOT TRUE THEN
        RAISE EXCEPTION 'Consent to privacy terms is mandatory';
    END IF;

    -- 2. Normalize 10-digit mobile number
    v_clean_mobile := regexp_replace(p_mobile_number, '[^0-9]', '', 'g');
    IF length(v_clean_mobile) > 10 AND v_clean_mobile LIKE '91%' THEN
        v_clean_mobile := substr(v_clean_mobile, length(v_clean_mobile) - 9);
    ELSIF length(v_clean_mobile) > 10 AND v_clean_mobile LIKE '0%' THEN
        v_clean_mobile := substr(v_clean_mobile, 2);
    END IF;

    IF length(v_clean_mobile) != 10 THEN
        RAISE EXCEPTION 'Invalid mobile number. Please enter a valid 10-digit mobile number';
    END IF;

    -- 3. Check for existing registration with same normalized mobile (duplicate detection)
    IF EXISTS (
        SELECT 1 FROM public.candidate_profiles
        WHERE normalized_mobile_number = v_clean_mobile
    ) THEN
        v_is_duplicate := true;
    END IF;

    -- 4. Generate unique registration reference (e.g. DMIC-2026-XXXXXX)
    v_year := to_char(now(), 'YYYY');
    v_random_seq := lpad((floor(random() * 900000) + 100000)::text, 6, '0');
    v_reg_number := 'DMIC-' || v_year || '-' || v_random_seq;

    -- Ensure uniqueness of reg_number
    WHILE EXISTS (SELECT 1 FROM public.candidate_profiles WHERE registration_number = v_reg_number) LOOP
        v_random_seq := lpad((floor(random() * 900000) + 100000)::text, 6, '0');
        v_reg_number := 'DMIC-' || v_year || '-' || v_random_seq;
    END LOOP;

    -- 5. Insert candidate profile
    INSERT INTO public.candidate_profiles (
        registration_number,
        full_name,
        mobile_number,
        normalized_mobile_number,
        alternate_mobile_number,
        age,
        village,
        taluka,
        district,
        pin_code,
        current_location,
        willing_to_commute,
        willing_to_relocate,
        highest_qualification_id,
        qualification_specialization,
        passing_year,
        additional_qualifications,
        certifications_text,
        professional_licenses,
        computer_proficiency_id,
        experience_category,
        total_experience_band,
        total_experience_months,
        previous_designation,
        previous_industry_id,
        previous_employer,
        relevant_skills_gained,
        previous_responsibilities,
        notice_period_id,
        earliest_joining_date,
        expected_salary_band_id,
        employment_type_id,
        shift_preference_id,
        joining_availability_id,
        preferred_work_location,
        willing_overtime,
        languages,
        resume_storage_path,
        resume_original_name,
        resume_size_bytes,
        resume_mime_type,
        consent_given,
        consent_timestamp,
        privacy_notice_version,
        is_duplicate_flag,
        follow_up_status
    ) VALUES (
        v_reg_number,
        trim(p_full_name),
        trim(p_mobile_number),
        v_clean_mobile,
        nullif(trim(COALESCE(p_alternate_mobile_number, '')), ''),
        p_age,
        trim(p_village),
        trim(p_taluka),
        COALESCE(nullif(trim(p_district), ''), 'Chhatrapati Sambhajinagar'),
        nullif(trim(COALESCE(p_pin_code, '')), ''),
        nullif(trim(COALESCE(p_current_location, '')), ''),
        COALESCE(p_willing_to_commute, true),
        COALESCE(p_willing_to_relocate, false),
        nullif(p_highest_qualification_id, ''),
        nullif(trim(COALESCE(p_qualification_specialization, '')), ''),
        p_passing_year,
        nullif(trim(COALESCE(p_additional_qualifications, '')), ''),
        nullif(trim(COALESCE(p_certifications_text, '')), ''),
        nullif(trim(COALESCE(p_professional_licenses, '')), ''),
        nullif(p_computer_proficiency_id, ''),
        COALESCE(p_experience_category, 'fresher'),
        COALESCE(p_total_experience_band, 'no_experience'),
        COALESCE(p_total_experience_months, 0),
        nullif(trim(COALESCE(p_previous_designation, '')), ''),
        nullif(p_previous_industry_id, ''),
        nullif(trim(COALESCE(p_previous_employer, '')), ''),
        nullif(trim(COALESCE(p_relevant_skills_gained, '')), ''),
        nullif(trim(COALESCE(p_previous_responsibilities, '')), ''),
        nullif(p_notice_period_id, ''),
        p_earliest_joining_date,
        nullif(p_expected_salary_band_id, ''),
        nullif(p_employment_type_id, ''),
        nullif(p_shift_preference_id, ''),
        nullif(p_joining_availability_id, ''),
        nullif(trim(COALESCE(p_preferred_work_location, '')), ''),
        COALESCE(p_willing_overtime, false),
        COALESCE(p_languages, ARRAY['Marathi']::TEXT[]),
        nullif(trim(COALESCE(p_resume_storage_path, '')), ''),
        nullif(trim(COALESCE(p_resume_original_name, '')), ''),
        p_resume_size_bytes,
        nullif(trim(COALESCE(p_resume_mime_type, '')), ''),
        p_consent_given,
        now(),
        p_privacy_notice_version,
        v_is_duplicate,
        'new'
    )
    RETURNING id INTO v_candidate_id;

    -- 6. Insert Candidate Employment Levels
    IF p_employment_level_ids IS NOT NULL AND array_length(p_employment_level_ids, 1) > 0 THEN
        FOREACH v_level_id IN ARRAY p_employment_level_ids LOOP
            IF v_level_id IS NOT NULL AND v_level_id != '' THEN
                INSERT INTO public.candidate_employment_levels (candidate_id, employment_level_id)
                VALUES (v_candidate_id, v_level_id)
                ON CONFLICT DO NOTHING;
            END IF;
        END LOOP;
    END IF;

    -- 7. Insert Candidate Job Roles
    IF p_job_role_ids IS NOT NULL AND array_length(p_job_role_ids, 1) > 0 THEN
        FOREACH v_role_id IN ARRAY p_job_role_ids LOOP
            IF v_role_id IS NOT NULL AND v_role_id != '' THEN
                INSERT INTO public.candidate_job_roles (candidate_id, job_role_id)
                VALUES (v_candidate_id, v_role_id)
                ON CONFLICT DO NOTHING;
            END IF;
        END LOOP;
    END IF;

    -- 8. Insert Candidate Skills
    IF p_skill_ids IS NOT NULL AND array_length(p_skill_ids, 1) > 0 THEN
        FOREACH v_skill_id IN ARRAY p_skill_ids LOOP
            IF v_skill_id IS NOT NULL AND v_skill_id != '' THEN
                INSERT INTO public.candidate_skills (candidate_id, skill_id, is_other)
                VALUES (v_candidate_id, v_skill_id, false)
                ON CONFLICT DO NOTHING;
            END IF;
        END LOOP;
    END IF;

    -- Insert other skills if specified
    IF p_other_skills IS NOT NULL AND array_length(p_other_skills, 1) > 0 THEN
        FOREACH v_other_skill IN ARRAY p_other_skills LOOP
            IF trim(v_other_skill) != '' THEN
                INSERT INTO public.candidate_skills (candidate_id, skill_id, is_other, other_skill_name)
                VALUES (v_candidate_id, 'skill_other', true, trim(v_other_skill))
                ON CONFLICT DO NOTHING;
            END IF;
        END LOOP;
    END IF;

    -- 9. Insert Candidate Industry Preferences
    IF p_industry_ids IS NOT NULL AND array_length(p_industry_ids, 1) > 0 THEN
        FOREACH v_ind_id IN ARRAY p_industry_ids LOOP
            IF v_ind_id IS NOT NULL AND v_ind_id != '' THEN
                INSERT INTO public.candidate_industries (candidate_id, industry_id)
                VALUES (v_candidate_id, v_ind_id)
                ON CONFLICT DO NOTHING;
            END IF;
        END LOOP;
    END IF;

    -- Return safe public JSON response without exposing candidate ID or internal details
    RETURN jsonb_build_object(
        'success', true,
        'registration_number', v_reg_number,
        'message_en', 'Employment registration received successfully. Your reference number is ' || v_reg_number || '.',
        'message_mr', 'आपली रोजगार नोंदणी यशस्वीरित्या स्वीकारली गेली आहे. आपला नोंदणी क्रमांक ' || v_reg_number || ' असा आहे.',
        'is_duplicate', v_is_duplicate
    );
END;
$$;

-- Grant EXECUTE permission to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.submit_candidate_registration TO anon, authenticated;


-- >>> END OF 20260301000004_registration_rpc.sql <<<


-- >>> START OF 20260301000005_storage_bucket.sql <<<

-- DMIC Bidkin Employment Registration Portal
-- Migration: 000005_storage_bucket.sql
-- Description: Private Supabase Storage bucket for candidate resumes and strict storage RLS policies.

-- Create storage bucket if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'candidate-resumes',
    'candidate-resumes',
    false, -- STRICTLY PRIVATE BUCKET: No direct public URL access
    5242880, -- 5 MB max limit
    ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]::text[]
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]::text[];

-- Policy 1: Anonymous candidates can upload (INSERT) their own resume during registration
CREATE POLICY "Allow public resume upload"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
    bucket_id = 'candidate-resumes'
);

-- Policy 2: Strictly restrict downloading (SELECT) to authenticated administrators
CREATE POLICY "Allow authenticated admins to read resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'candidate-resumes'
);

-- Policy 3: Allow authenticated admins to delete resumes if requested by candidate
CREATE POLICY "Allow authenticated admins to delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'candidate-resumes'
);


-- >>> END OF 20260301000005_storage_bucket.sql <<<

