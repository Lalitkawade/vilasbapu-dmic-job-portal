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
