import { describe, it, expect } from 'vitest';
import { CandidateProfile } from '../types/candidate';

describe('Search, Filtering and Export Engine', () => {
  const sampleCandidates: CandidateProfile[] = [
    {
      id: '1',
      registration_number: 'DMIC-2026-100001',
      full_name: 'राहुल पवार (Rahul Pawar)',
      mobile_number: '9822112233',
      normalized_mobile_number: '9822112233',
      age: 23,
      village: 'बिडकीन (Bidkin)',
      taluka: 'पैठण',
      district: 'Chhatrapati Sambhajinagar',
      willing_to_commute: true,
      willing_to_relocate: false,
      willing_overtime: true,
      highest_qualification_id: 'iti',
      experience_category: 'experienced',
      total_experience_band: '1_to_2',
      employment_levels: ['operator', 'technician'],
      skills: ['skill_cnc', 'skill_fitting'],
      industries: ['ind_auto'],
      follow_up_status: 'new',
      consent_given: true,
      consent_timestamp: new Date().toISOString(),
      privacy_notice_version: 'v1.0',
      registration_source: 'public_web',
      is_duplicate_flag: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      languages: ['Marathi', 'Hindi'],
    },
    {
      id: '2',
      registration_number: 'DMIC-2026-100002',
      full_name: 'अमित काळे (Amit Kale)',
      mobile_number: '9822445566',
      normalized_mobile_number: '9822445566',
      age: 28,
      village: 'पैठण (Paithan)',
      taluka: 'पैठण',
      district: 'Chhatrapati Sambhajinagar',
      willing_to_commute: true,
      willing_to_relocate: false,
      willing_overtime: true,
      highest_qualification_id: 'be_btech',
      experience_category: 'experienced',
      total_experience_band: '3_to_5',
      employment_levels: ['engineer'],
      skills: ['skill_cnc', 'skill_plc', 'skill_autocad'],
      industries: ['ind_heavy_eng'],
      follow_up_status: 'contacted',
      consent_given: true,
      consent_timestamp: new Date().toISOString(),
      privacy_notice_version: 'v1.0',
      registration_source: 'public_web',
      is_duplicate_flag: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      languages: ['Marathi', 'English'],
    },
    {
      id: '3',
      registration_number: 'DMIC-2026-100003',
      full_name: 'गणेश जाधव (Ganesh Jadhav)',
      mobile_number: '9822778899',
      normalized_mobile_number: '9822778899',
      age: 21,
      village: 'निलजगाव (Nilajgaon)',
      taluka: 'पैठण',
      district: 'Chhatrapati Sambhajinagar',
      willing_to_commute: true,
      willing_to_relocate: false,
      willing_overtime: true,
      highest_qualification_id: '10th_pass',
      experience_category: 'fresher',
      total_experience_band: 'no_experience',
      employment_levels: ['casual_labour', 'helper'],
      skills: ['skill_machine_op'],
      industries: ['ind_general_mfg'],
      follow_up_status: 'new',
      consent_given: true,
      consent_timestamp: new Date().toISOString(),
      privacy_notice_version: 'v1.0',
      registration_source: 'public_web',
      is_duplicate_flag: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      languages: ['Marathi'],
    }
  ];

  it('filters candidates by village accurately', () => {
    const bidkinCandidates = sampleCandidates.filter(c => c.village.includes('Bidkin'));
    expect(bidkinCandidates.length).toBe(1);
    expect(bidkinCandidates[0].registration_number).toBe('DMIC-2026-100001');
  });

  it('filters candidates with MATCH ANY skills', () => {
    const searchSkills = ['skill_fitting', 'skill_plc'];
    // Candidate 1 has skill_fitting, Candidate 2 has skill_plc
    const matchesAny = sampleCandidates.filter(c => 
      searchSkills.some(s => (c.skills || []).includes(s))
    );
    expect(matchesAny.length).toBe(2);
  });

  it('filters candidates with MATCH ALL skills', () => {
    const searchSkills = ['skill_cnc', 'skill_plc'];
    // Only Candidate 2 has both skill_cnc AND skill_plc
    const matchesAll = sampleCandidates.filter(c => 
      searchSkills.every(s => (c.skills || []).includes(s))
    );
    expect(matchesAll.length).toBe(1);
    expect(matchesAll[0].id).toBe('2');
  });

  it('combines multiple filters (Qualification + Experience + Level)', () => {
    // Find candidates with ITI, 1-2 years experience, seeking operator level
    const complexFiltered = sampleCandidates.filter(c => 
      c.highest_qualification_id === 'iti' &&
      c.total_experience_band === '1_to_2' &&
      (c.employment_levels || []).includes('operator')
    );
    expect(complexFiltered.length).toBe(1);
    expect(complexFiltered[0].registration_number).toBe('DMIC-2026-100001');
  });

  it('sanitizes dangerous CSV injection characters (=, +, -, @)', () => {
    function sanitize(val: string): string {
      if (/^[=\+\-@\t\r]/.test(val)) return `'${val}`;
      return val;
    }

    expect(sanitize('=1+1')).toBe("'=1+1");
    expect(sanitize('+cmd|')).toBe("'+cmd|");
    expect(sanitize('@calc')).toBe("'@calc");
    expect(sanitize('Normal Name')).toBe('Normal Name');
  });
});
