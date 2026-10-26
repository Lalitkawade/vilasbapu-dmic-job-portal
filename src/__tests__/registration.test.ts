import { describe, it, expect } from 'vitest';
import { candidateRegistrationSchema } from '../lib/validation';
import { submitCandidateRegistration } from '../lib/supabase';

describe('Candidate Registration Validation', () => {
  const validData = {
    full_name: 'राहुल ज्ञानेश्वर पवार',
    mobile_number: '9823456789',
    age: 24,
    village: 'बिडकीन (Bidkin)',
    taluka: 'पैठण',
    district: 'Chhatrapati Sambhajinagar',
    willing_to_commute: true,
    highest_qualification_id: 'iti',
    employment_level_ids: ['operator', 'technician'],
    job_role_ids: ['role_machine_op'],
    skill_ids: ['skill_cnc', 'skill_fitting'],
    industry_ids: ['ind_auto'],
    experience_category: 'fresher' as const,
    total_experience_band: 'no_experience',
    consent_given: true as const,
    privacy_notice_version: 'v1.0',
  };

  it('validates a correct candidate submission payload', () => {
    const result = candidateRegistrationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects candidate under 18 years old', () => {
    const invalid = { ...validData, age: 17 };
    const result = candidateRegistrationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('१८');
    }
  });

  it('rejects invalid mobile numbers (not 10 digits or non-Indian prefix)', () => {
    const invalidMobile1 = { ...validData, mobile_number: '12345' };
    const invalidMobile2 = { ...validData, mobile_number: '5555555555' }; // Does not start with 6-9
    
    expect(candidateRegistrationSchema.safeParse(invalidMobile1).success).toBe(false);
    expect(candidateRegistrationSchema.safeParse(invalidMobile2).success).toBe(false);
  });

  it('rejects submission without required consent', () => {
    const noConsent = { ...validData, consent_given: false as any };
    const result = candidateRegistrationSchema.safeParse(noConsent);
    expect(result.success).toBe(false);
  });

  it('rejects submission with empty employment levels', () => {
    const noLevels = { ...validData, employment_level_ids: [] };
    const result = candidateRegistrationSchema.safeParse(noLevels);
    expect(result.success).toBe(false);
  });

  it('successfully creates registration reference and detects duplicate mobile numbers', async () => {
    const res1 = await submitCandidateRegistration({
      full_name: 'Test Candidate One',
      mobile_number: '9876543210',
      age: 25,
      village: 'Bidkin',
      taluka: 'Paithan',
      district: 'Chhatrapati Sambhajinagar',
      willing_to_commute: true,
      willing_to_relocate: false,
      highest_qualification_id: 'iti',
      experience_category: 'fresher',
      total_experience_band: 'no_experience',
      consent_given: true,
      privacy_notice_version: 'v1.0',
      employment_level_ids: ['operator'],
      job_role_ids: ['role_machine_op'],
      skill_ids: ['skill_cnc'],
      other_skills: [],
      industry_ids: ['ind_auto'],
    });

    expect(res1.success).toBe(true);
    expect(res1.registration_number).toMatch(/^DMIC-\d{4}-\d{6}$/);

    // Submitting again with same mobile number should flag duplicate
    const res2 = await submitCandidateRegistration({
      full_name: 'Test Candidate One Repeat',
      mobile_number: '9876543210',
      age: 25,
      village: 'Bidkin',
      taluka: 'Paithan',
      district: 'Chhatrapati Sambhajinagar',
      willing_to_commute: true,
      willing_to_relocate: false,
      highest_qualification_id: 'iti',
      experience_category: 'fresher',
      total_experience_band: 'no_experience',
      consent_given: true,
      privacy_notice_version: 'v1.0',
      employment_level_ids: ['operator'],
      job_role_ids: ['role_machine_op'],
      skill_ids: ['skill_cnc'],
      other_skills: [],
      industry_ids: ['ind_auto'],
    });

    expect(res2.success).toBe(true);
    expect(res2.is_duplicate).toBe(true);
  });
});
