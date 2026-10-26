export type Language = 'mr' | 'en';

export type FollowUpStatus = 
  | 'new'
  | 'contacted'
  | 'referred'
  | 'interview'
  | 'selected'
  | 'placed'
  | 'not_proceeding';

export interface ReferenceItem {
  id: string;
  name_en: string;
  name_mr: string;
  category?: string;
  category_en?: string;
  category_mr?: string;
  department_id?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface CandidateProfile {
  id: string;
  registration_number: string;
  
  // Section A: Personal Information
  full_name: string;
  mobile_number: string;
  normalized_mobile_number: string;
  alternate_mobile_number?: string | null;
  age: number;
  village: string;
  taluka: string;
  district: string;
  pin_code?: string | null;
  current_location?: string | null;
  willing_to_commute: boolean;
  willing_to_relocate: boolean;
  
  // Section B: Education & Qualifications
  highest_qualification_id?: string | null;
  qualification_specialization?: string | null;
  passing_year?: number | null;
  additional_qualifications?: string | null;
  certifications_text?: string | null;
  professional_licenses?: string | null;
  computer_proficiency_id?: string | null;
  
  // Section F: Experience
  experience_category: 'fresher' | 'experienced' | 'apprentice';
  total_experience_band: string;
  total_experience_months?: number | null;
  previous_designation?: string | null;
  previous_industry_id?: string | null;
  previous_employer?: string | null;
  relevant_skills_gained?: string | null;
  previous_responsibilities?: string | null;
  notice_period_id?: string | null;
  earliest_joining_date?: string | null;
  
  // Section H: Preferences
  expected_salary_band_id?: string | null;
  employment_type_id?: string | null;
  shift_preference_id?: string | null;
  joining_availability_id?: string | null;
  preferred_work_location?: string | null;
  willing_overtime: boolean;
  languages: string[];
  
  // Section I: Resume
  resume_storage_path?: string | null;
  resume_original_name?: string | null;
  resume_size_bytes?: number | null;
  resume_mime_type?: string | null;
  
  // Section J: Consent
  consent_given: boolean;
  consent_timestamp: string;
  privacy_notice_version: string;
  
  // Administration
  registration_source: string;
  follow_up_status: FollowUpStatus;
  is_duplicate_flag: boolean;
  created_at: string;
  updated_at: string;
  
  // Relational details populated for views
  employment_levels?: string[]; // IDs
  job_roles?: string[]; // IDs
  skills?: string[]; // IDs
  other_skills?: string[]; // Custom skill texts
  industries?: string[]; // IDs
}

export interface CandidateFollowup {
  id: string;
  candidate_id: string;
  status: FollowUpStatus;
  internal_note: string;
  created_by: string;
  created_at: string;
}

export interface CandidateFilterState {
  searchQuery: string; // matches name, mobile, registration_number
  village: string;
  taluka: string;
  highestQualification: string;
  experienceCategory: string; // all, fresher, experienced, apprentice
  experienceBand: string;
  employmentLevels: string[];
  jobRoles: string[];
  selectedSkills: string[];
  skillMatchMode: 'ANY' | 'ALL';
  industries: string[];
  salaryBand: string;
  shiftPreference: string;
  joiningAvailability: string;
  followUpStatus: string;
  willingToCommute: string; // 'all' | 'yes' | 'no'
  startDate?: string;
  endDate?: string;
}

export interface CandidateSubmissionPayload {
  full_name: string;
  mobile_number: string;
  alternate_mobile_number?: string;
  age: number;
  village: string;
  taluka: string;
  district: string;
  pin_code?: string;
  current_location?: string;
  willing_to_commute: boolean;
  willing_to_relocate: boolean;
  
  highest_qualification_id: string;
  qualification_specialization?: string;
  passing_year?: number;
  additional_qualifications?: string;
  certifications_text?: string;
  professional_licenses?: string;
  computer_proficiency_id?: string;
  
  experience_category: 'fresher' | 'experienced' | 'apprentice';
  total_experience_band: string;
  total_experience_months?: number;
  previous_designation?: string;
  previous_industry_id?: string;
  previous_employer?: string;
  relevant_skills_gained?: string;
  previous_responsibilities?: string;
  notice_period_id?: string;
  earliest_joining_date?: string;
  
  expected_salary_band_id?: string;
  employment_type_id?: string;
  shift_preference_id?: string;
  joining_availability_id?: string;
  preferred_work_location?: string;
  willing_overtime?: boolean;
  languages?: string[];
  
  resume_file?: File | null;
  resume_storage_path?: string;
  resume_original_name?: string;
  resume_size_bytes?: number;
  resume_mime_type?: string;
  
  consent_given: boolean;
  privacy_notice_version: string;
  
  // Multiple selections
  employment_level_ids: string[];
  job_role_ids: string[];
  skill_ids: string[];
  other_skills: string[];
  industry_ids: string[];
}
