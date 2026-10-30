import { z } from 'zod';

export const candidateRegistrationSchema = z.object({
  // Section A: Personal Information
  full_name: z
    .string()
    .min(3, { message: 'नाव किमान ३ अक्षरांचे असणे आवश्यक आहे / Full name must be at least 3 characters' })
    .max(100, { message: 'नाव १०० अक्षरांपेक्षा कमी असावे / Full name too long' }),
  
  mobile_number: z
    .string()
    .regex(/^[6-9]\d{9}$/, { 
      message: 'कृपया वैध १०-अंकी भारतीय मोबाईल नंबर टाका (६, ७, ८, किंवा ९ ने सुरू होणारा) / Enter a valid 10-digit mobile number starting with 6-9' 
    }),

  alternate_mobile_number: z
    .string()
    .optional()
    .refine(val => !val || /^[6-9]\d{9}$/.test(val), {
      message: 'पर्यायी मोबाईल नंबर वैध १०-अंकी असावा / Alternate mobile number must be valid 10 digits'
    }),

  age: z
    .number({ invalid_type_error: 'वय अचूक अंकात प्रविष्ट करा / Please enter valid age' })
    .min(18, { message: 'उमेदवाराचे वय किमान १८ वर्षे असणे अनिवार्य आहे / Age must be at least 18 years' })
    .max(70, { message: 'वय ७० पेक्षा जास्त नसावे / Age must be less than 70' }),

  village: z
    .string()
    .min(2, { message: 'गाव किंवा शहराचे नाव आवश्यक आहे / Village or town is required' }),

  taluka: z
    .string()
    .min(2, { message: 'तालुका आवश्यक आहे / Taluka is required' }),

  district: z
    .string()
    .min(2, { message: 'जिल्हा आवश्यक आहे / District is required' }),

  pin_code: z
    .string()
    .optional()
    .refine(val => !val || /^\d{6}$/.test(val), {
      message: 'पिन कोड ६ अंकी असावा / PIN code must be 6 digits'
    }),

  current_location: z.string().optional(),
  willing_to_commute: z.boolean(),
  willing_to_relocate: z.boolean().optional(),

  // Section B: Education
  highest_qualification_id: z
    .string()
    .min(1, { message: 'कृपया आपले सर्वोच्च शिक्षण निवडा / Please select highest qualification' }),
  
  qualification_specialization: z.string().max(200).optional(),
  passing_year: z.number().optional().nullable(),
  additional_qualifications: z.string().max(500).optional(),
  certifications_text: z.string().max(500).optional(),
  professional_licenses: z.string().max(500).optional(),
  computer_proficiency_id: z.string().max(100).optional(),

  // Section C: Levels
  employment_level_ids: z
    .array(z.string().max(50))
    .min(1, { message: 'कृपया किमान एक पसंतीची नोकरी पातळी निवडा / Please select at least one employment level' })
    .max(20),

  // Section D: Roles
  job_role_ids: z.array(z.string().max(50)).max(50).optional(),

  // Section E: Skills
  skill_ids: z.array(z.string().max(50)).max(100).optional(),
  other_skills: z.array(z.string().max(100)).max(30).optional(),

  // Section F: Experience
  experience_category: z.enum(['fresher', 'experienced', 'apprentice']),
  total_experience_band: z.string().max(50),
  total_experience_months: z.number().optional().nullable(),
  previous_designation: z.string().max(150).optional(),
  previous_industry_id: z.string().max(50).optional(),
  previous_employer: z.string().max(150).optional(),
  relevant_skills_gained: z.string().max(500).optional(),
  previous_responsibilities: z.string().max(1000).optional(),
  notice_period_id: z.string().max(50).optional(),
  earliest_joining_date: z.string().max(30).optional(),

  // Section G: Industries
  industry_ids: z.array(z.string().max(50)).max(30).optional(),

  // Section H: Salary & Preferences
  expected_salary_band_id: z.string().max(50).optional(),
  employment_type_id: z.string().max(50).optional(),
  shift_preference_id: z.string().max(50).optional(),
  joining_availability_id: z.string().max(50).optional(),
  preferred_work_location: z.string().max(150).optional(),
  willing_overtime: z.boolean().optional(),
  languages: z.array(z.string().max(50)).max(20).optional(),

  // Section J: Consent
  consent_given: z.literal(true, {
    errorMap: () => ({ message: 'नोंदणीसाठी संमती देणे अनिवार्य आहे / You must agree to the terms and privacy notice' })
  }),
  privacy_notice_version: z.string().default('v1.0'),
});

export type CandidateFormData = z.infer<typeof candidateRegistrationSchema>;
