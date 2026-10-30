import { createClient } from '@supabase/supabase-js';
import { CandidateProfile, CandidateSubmissionPayload, FollowUpStatus } from '../types/candidate';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isLiveSupabaseConfigured = 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder-anon-key' &&
  !supabaseUrl.includes('your-project-id');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// RESILIENT CANDIDATE SERVICE (SUPABASE LIVE + SAFE IN-MEMORY ADAPTER)
// Sensitive candidate PII is never persisted to client browser disk (localStorage).
// ============================================================================

const LOCAL_STORAGE_KEY = 'dmic_registered_candidates';
const LOCAL_FOLLOWUPS_KEY = 'dmic_candidate_followups';

// Purge any legacy unencrypted candidate data from client browser localStorage
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.localStorage.removeItem(LOCAL_FOLLOWUPS_KEY);
  } catch {
    // Ignore storage errors in restricted browser contexts
  }
}

// In-memory isolated storage for testing and offline development fallback
const inMemoryStorage: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  return inMemoryStorage[key] || null;
}

function safeSetItem(key: string, value: string): void {
  inMemoryStorage[key] = value;
}

function getLocalCandidates(): CandidateProfile[] {
  try {
    const data = safeGetItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read in-memory candidates:', err);
    return [];
  }
}

function saveLocalCandidates(candidates: CandidateProfile[]) {
  try {
    safeSetItem(LOCAL_STORAGE_KEY, JSON.stringify(candidates));
  } catch (err) {
    console.error('Failed to save in-memory candidates:', err);
  }
}

// 1. Submit Registration
export async function submitCandidateRegistration(payload: CandidateSubmissionPayload): Promise<{
  success: boolean;
  registration_number: string;
  message_en: string;
  message_mr: string;
  is_duplicate: boolean;
}> {
  // If resume file is present and Supabase is live, upload it to private bucket
  let resumePath: string | null = null;
  let resumeName: string | null = null;
  let resumeSize: number | null = null;
  let resumeMime: string | null = null;

  if (payload.resume_file) {
    resumeName = payload.resume_file.name;
    resumeSize = payload.resume_file.size;
    resumeMime = payload.resume_file.type;
    const fileExt = resumeName.split('.').pop();
    const randomizedName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    resumePath = `resumes/${randomizedName}`;

    if (isLiveSupabaseConfigured) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('candidate-resumes')
          .upload(resumePath, payload.resume_file, {
            contentType: resumeMime,
            upsert: false,
          });
        if (uploadError) {
          console.warn('Supabase storage upload error:', uploadError.message);
        }
      } catch (uploadEx) {
        console.warn('Storage upload exception (will save local metadata):', uploadEx);
      }
    }
  }

  // Try live Supabase RPC first if configured
  if (isLiveSupabaseConfigured) {
    try {
      const { data, error } = await supabase.rpc('submit_candidate_registration', {
        p_full_name: payload.full_name,
        p_mobile_number: payload.mobile_number,
        p_alternate_mobile_number: payload.alternate_mobile_number || null,
        p_age: payload.age,
        p_village: payload.village,
        p_taluka: payload.taluka,
        p_district: payload.district,
        p_pin_code: payload.pin_code || null,
        p_current_location: payload.current_location || null,
        p_willing_to_commute: payload.willing_to_commute,
        p_willing_to_relocate: payload.willing_to_relocate,
        p_highest_qualification_id: payload.highest_qualification_id,
        p_qualification_specialization: payload.qualification_specialization || null,
        p_passing_year: payload.passing_year || null,
        p_additional_qualifications: payload.additional_qualifications || null,
        p_certifications_text: payload.certifications_text || null,
        p_professional_licenses: payload.professional_licenses || null,
        p_computer_proficiency_id: payload.computer_proficiency_id || null,
        p_experience_category: payload.experience_category,
        p_total_experience_band: payload.total_experience_band,
        p_total_experience_months: payload.total_experience_months || 0,
        p_previous_designation: payload.previous_designation || null,
        p_previous_industry_id: payload.previous_industry_id || null,
        p_previous_employer: payload.previous_employer || null,
        p_relevant_skills_gained: payload.relevant_skills_gained || null,
        p_previous_responsibilities: payload.previous_responsibilities || null,
        p_notice_period_id: payload.notice_period_id || null,
        p_earliest_joining_date: payload.earliest_joining_date || null,
        p_expected_salary_band_id: payload.expected_salary_band_id || null,
        p_employment_type_id: payload.employment_type_id || null,
        p_shift_preference_id: payload.shift_preference_id || null,
        p_joining_availability_id: payload.joining_availability_id || null,
        p_preferred_work_location: payload.preferred_work_location || null,
        p_willing_overtime: payload.willing_overtime || false,
        p_languages: payload.languages || ['Marathi'],
        p_resume_storage_path: resumePath,
        p_resume_original_name: resumeName,
        p_resume_size_bytes: resumeSize,
        p_resume_mime_type: resumeMime,
        p_consent_given: payload.consent_given,
        p_privacy_notice_version: payload.privacy_notice_version,
        p_employment_level_ids: payload.employment_level_ids,
        p_job_role_ids: payload.job_role_ids,
        p_skill_ids: payload.skill_ids,
        p_other_skills: payload.other_skills,
        p_industry_ids: payload.industry_ids,
      });

      if (!error && data) {
        return data;
      }
      console.warn('Supabase RPC returned error:', error?.message);
    } catch (e) {
      console.warn('Supabase connection error:', e);
    }
  }

  // Fallback: Local resilient storage
  const cleanMobile = payload.mobile_number.replace(/\D/g, '').slice(-10);
  const existingCandidates = getLocalCandidates();
  const isDuplicate = existingCandidates.some(c => c.normalized_mobile_number === cleanMobile);

  const year = new Date().getFullYear();
  const randomSeq = Math.floor(100000 + Math.random() * 900000);
  const regNumber = `DMIC-${year}-${randomSeq}`;

  const newCandidate: CandidateProfile = {
    id: `local-${Date.now()}-${randomSeq}`,
    registration_number: regNumber,
    full_name: payload.full_name,
    mobile_number: payload.mobile_number,
    normalized_mobile_number: cleanMobile,
    alternate_mobile_number: payload.alternate_mobile_number,
    age: payload.age,
    village: payload.village,
    taluka: payload.taluka,
    district: payload.district,
    pin_code: payload.pin_code,
    current_location: payload.current_location,
    willing_to_commute: payload.willing_to_commute,
    willing_to_relocate: payload.willing_to_relocate,
    highest_qualification_id: payload.highest_qualification_id,
    qualification_specialization: payload.qualification_specialization,
    passing_year: payload.passing_year,
    additional_qualifications: payload.additional_qualifications,
    certifications_text: payload.certifications_text,
    professional_licenses: payload.professional_licenses,
    computer_proficiency_id: payload.computer_proficiency_id,
    experience_category: payload.experience_category,
    total_experience_band: payload.total_experience_band,
    total_experience_months: payload.total_experience_months,
    previous_designation: payload.previous_designation,
    previous_industry_id: payload.previous_industry_id,
    previous_employer: payload.previous_employer,
    relevant_skills_gained: payload.relevant_skills_gained,
    previous_responsibilities: payload.previous_responsibilities,
    notice_period_id: payload.notice_period_id,
    earliest_joining_date: payload.earliest_joining_date,
    expected_salary_band_id: payload.expected_salary_band_id,
    employment_type_id: payload.employment_type_id,
    shift_preference_id: payload.shift_preference_id,
    joining_availability_id: payload.joining_availability_id,
    preferred_work_location: payload.preferred_work_location,
    willing_overtime: payload.willing_overtime || false,
    languages: payload.languages || ['Marathi'],
    resume_storage_path: resumePath,
    resume_original_name: resumeName,
    resume_size_bytes: resumeSize,
    resume_mime_type: resumeMime,
    consent_given: payload.consent_given,
    consent_timestamp: new Date().toISOString(),
    privacy_notice_version: payload.privacy_notice_version,
    registration_source: 'public_web',
    follow_up_status: 'new',
    is_duplicate_flag: isDuplicate,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    employment_levels: payload.employment_level_ids,
    job_roles: payload.job_role_ids,
    skills: payload.skill_ids,
    other_skills: payload.other_skills,
    industries: payload.industry_ids,
  };

  saveLocalCandidates([newCandidate, ...existingCandidates]);

  return {
    success: true,
    registration_number: regNumber,
    message_en: `Employment registration received successfully. Your reference number is ${regNumber}.`,
    message_mr: `आपली रोजगार नोंदणी यशस्वीरित्या स्वीकारली गेली आहे. आपला नोंदणी क्रमांक ${regNumber} असा आहे.`,
    is_duplicate: isDuplicate,
  };
}

// 2. Fetch All Candidates (Admin)
export async function fetchAllCandidates(): Promise<CandidateProfile[]> {
  if (isLiveSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select(`
          *,
          candidate_employment_levels(employment_level_id),
          candidate_job_roles(job_role_id),
          candidate_skills(skill_id, other_skill_name),
          candidate_industries(industry_id)
        `)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((c: any) => ({
          ...c,
          employment_levels: c.candidate_employment_levels?.map((l: any) => l.employment_level_id) || [],
          job_roles: c.candidate_job_roles?.map((r: any) => r.job_role_id) || [],
          skills: c.candidate_skills?.map((s: any) => s.skill_id) || [],
          other_skills: c.candidate_skills?.filter((s: any) => s.other_skill_name).map((s: any) => s.other_skill_name) || [],
          industries: c.candidate_industries?.map((i: any) => i.industry_id) || [],
        }));
      }
    } catch (e) {
      console.warn('Error fetching candidates from Supabase, checking local cache:', e);
    }
  }

  // Fallback to local storage
  return getLocalCandidates();
}

// 3. Update Follow-up Status & Add Note
export async function updateCandidateStatus(
  candidateId: string,
  newStatus: FollowUpStatus,
  internalNote?: string
): Promise<boolean> {
  if (isLiveSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('candidate_profiles')
        .update({ follow_up_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', candidateId);

      if (!error) {
        if (internalNote && internalNote.trim()) {
          await supabase.from('candidate_followups').insert({
            candidate_id: candidateId,
            status: newStatus,
            internal_note: internalNote.trim(),
            created_by: 'admin',
          });
        }
        return true;
      }
    } catch (e) {
      console.warn('Supabase update status failed, saving locally:', e);
    }
  }

  // Fallback: update local candidates
  const candidates = getLocalCandidates();
  const updated = candidates.map(c => {
    if (c.id === candidateId || c.registration_number === candidateId) {
      return { ...c, follow_up_status: newStatus, updated_at: new Date().toISOString() };
    }
    return c;
  });
  saveLocalCandidates(updated);

  // Save followup note locally
  if (internalNote && internalNote.trim()) {
    try {
      const notes = JSON.parse(safeGetItem(LOCAL_FOLLOWUPS_KEY) || '[]');
      notes.push({
        id: `fn-${Date.now()}`,
        candidate_id: candidateId,
        status: newStatus,
        internal_note: internalNote.trim(),
        created_by: 'admin',
        created_at: new Date().toISOString(),
      });
      safeSetItem(LOCAL_FOLLOWUPS_KEY, JSON.stringify(notes));
    } catch (err) {
      console.error(err);
    }
  }

  return true;
}

// 4. Get Follow-up Notes
export async function getCandidateFollowups(candidateId: string): Promise<any[]> {
  if (isLiveSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('candidate_followups')
        .select('*')
        .eq('candidate_id', candidateId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } catch (e) {
      console.warn('Error fetching followups from Supabase:', e);
    }
  }

  try {
    const notes = JSON.parse(safeGetItem(LOCAL_FOLLOWUPS_KEY) || '[]');
    return notes.filter((n: any) => n.candidate_id === candidateId || n.candidate_id === candidateId);
  } catch {
    return [];
  }
}
