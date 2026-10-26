import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  QUALIFICATIONS, 
  EMPLOYMENT_LEVELS, 
  JOB_DEPARTMENTS, 
  JOB_ROLES, 
  SKILLS, 
  INDUSTRIES, 
  SALARY_BANDS, 
  SHIFT_PREFERENCES, 
  EMPLOYMENT_TYPES, 
  JOINING_AVAILABILITY, 
  EXPERIENCE_BANDS, 
  NOTICE_PERIODS, 
  COMPUTER_PROFICIENCY,
  getItemLabel,
  getItemsLabels
} from '../../data/catalogData';
import { BIDKIN_VILLAGES, TALUKAS } from '../../data/villagesData';
import { submitCandidateRegistration } from '../../lib/supabase';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  X, 
  Plus, 
  Search,
  Eye,
  Building,
  DollarSign
} from 'lucide-react';

export const RegistrationWizard: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    // Section A: Personal
    full_name: '',
    mobile_number: '',
    alternate_mobile_number: '',
    age: 22,
    village: 'बिडकीन (Bidkin)',
    custom_village: '',
    taluka: 'पैठण',
    district: 'Chhatrapati Sambhajinagar',
    pin_code: '431105',
    current_location: '',
    willing_to_commute: true,
    willing_to_relocate: false,

    // Section B: Education
    highest_qualification_id: 'iti',
    qualification_specialization: '',
    passing_year: new Date().getFullYear() - 2,
    additional_qualifications: '',
    certifications_text: '',
    professional_licenses: '',
    computer_proficiency_id: 'basic',

    // Section C: Employment Levels
    employment_level_ids: ['operator', 'technician'] as string[],

    // Section D: Job Roles
    job_role_ids: ['role_machine_op', 'role_fitter_fabricator'] as string[],

    // Section E: Skills
    skill_ids: ['skill_machine_op', 'skill_fitting'] as string[],
    other_skills: [] as string[],
    new_other_skill: '',

    // Section F: Experience
    experience_category: 'fresher' as 'fresher' | 'experienced' | 'apprentice',
    total_experience_band: 'no_experience',
    total_experience_months: 0,
    previous_designation: '',
    previous_industry_id: '',
    previous_employer: '',
    relevant_skills_gained: '',
    previous_responsibilities: '',
    notice_period_id: 'notice_immediate',
    earliest_joining_date: '',

    // Section G: Industries
    industry_ids: ['ind_auto', 'ind_general_mfg'] as string[],

    // Section H: Preferences
    expected_salary_band_id: '15k_20k',
    employment_type_id: 'permanent',
    shift_preference_id: 'rotational_shift',
    joining_availability_id: 'immediately',
    preferred_work_location: 'Bidkin / Paithan / Shendra',
    willing_overtime: true,
    languages: ['Marathi', 'Hindi'],

    // Section I: Resume
    resume_file: null as File | null,

    // Section J: Consent
    consent_given: true,
  });

  // Filter searches
  const [roleSearch, setRoleSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [villageSearch, setVillageSearch] = useState('');

  // Step Completion Checkers
  const isStepComplete = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1: {
        const cleanMobile = formData.mobile_number.replace(/\D/g, '').slice(-10);
        const nameValid = Boolean(formData.full_name && formData.full_name.trim().length >= 3);
        const mobileValid = cleanMobile.length === 10 && /^[6-9]/.test(cleanMobile);
        const ageValid = Boolean(formData.age && formData.age >= 18 && formData.age <= 75);
        const villageValid = Boolean(formData.village && (!formData.village.includes('Other') || formData.custom_village));
        return nameValid && mobileValid && ageValid && villageValid;
      }
      case 2:
        return Boolean(formData.highest_qualification_id);
      case 3:
        return formData.employment_level_ids.length > 0;
      case 4:
        return true; // Skills & Industries can be customized freely
      case 5:
        return true; // Salary & Shift preferences have pre-filled options
      case 6:
        return Boolean(formData.consent_given);
      default:
        return false;
    }
  };

  // Full validation across all mandatory sections
  const getValidationErrors = (): { step: number; message: string }[] => {
    const errors: { step: number; message: string }[] = [];

    // Step 1: Personal Details
    if (!formData.full_name || formData.full_name.trim().length < 3) {
      errors.push({
        step: 1,
        message: language === 'mr' ? 'पायरी १: कृपया आपले पूर्ण नाव लिहा (किमान ३ अक्षरे).' : 'Step 1: Please enter your full name (at least 3 characters).'
      });
    }
    const cleanMobile = formData.mobile_number.replace(/\D/g, '').slice(-10);
    if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
      errors.push({
        step: 1,
        message: language === 'mr' ? 'पायरी १: कृपया वैध १०-अंकी मोबाईल नंबर टाका (६ ते ९ ने सुरू होणारा).' : 'Step 1: Please enter a valid 10-digit mobile number starting with 6-9.'
      });
    }
    if (!formData.age || formData.age < 18 || formData.age > 75) {
      errors.push({
        step: 1,
        message: language === 'mr' ? 'पायरी १: उमेदवाराचे वय १८ ते ७० वर्षे असणे आवश्यक आहे.' : 'Step 1: Candidate age must be between 18 and 70.'
      });
    }
    if (!formData.village || (formData.village.includes('Other') && !formData.custom_village)) {
      errors.push({
        step: 1,
        message: language === 'mr' ? 'पायरी १: कृपया आपले गाव किंवा शहर निवडा / लिहा.' : 'Step 1: Please specify your village or town.'
      });
    }

    // Step 2: Qualification
    if (!formData.highest_qualification_id) {
      errors.push({
        step: 2,
        message: language === 'mr' ? 'पायरी २: कृपया आपले सर्वोच्च शिक्षण निवडा.' : 'Step 2: Please select your highest educational qualification.'
      });
    }

    // Step 3: Employment Level
    if (formData.employment_level_ids.length === 0) {
      errors.push({
        step: 3,
        message: language === 'mr' ? 'पायरी ३: कृपया किमान एक पसंतीची नोकरी पातळी निवडा.' : 'Step 3: Please select at least one preferred employment level.'
      });
    }

    // Step 6: Consent
    if (!formData.consent_given) {
      errors.push({
        step: 6,
        message: language === 'mr' ? 'पायरी ६: नोंदणीसाठी गोपनीयता संमती देणे आवश्यक आहे.' : 'Step 6: You must accept the privacy notice and consent terms.'
      });
    }

    return errors;
  };

  // Free exploration navigation: allow stepping forward/backward smoothly
  const handleNext = () => {
    setErrorMessage(null);
    setCurrentStep(prev => Math.min(prev + 1, 6));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setErrorMessage(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const jumpToStep = (stepNum: number) => {
    setErrorMessage(null);
    setCurrentStep(stepNum);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Toggle helpers for multi-select arrays
  const toggleArrayItem = (key: 'employment_level_ids' | 'job_role_ids' | 'skill_ids' | 'industry_ids' | 'languages', id: string) => {
    setFormData(prev => {
      const arr = prev[key] as string[];
      const exists = arr.includes(id);
      return {
        ...prev,
        [key]: exists ? arr.filter(item => item !== id) : [...arr, id],
      };
    });
  };

  const handleAddOtherSkill = () => {
    if (formData.new_other_skill.trim()) {
      setFormData(prev => ({
        ...prev,
        other_skills: [...prev.other_skills, prev.new_other_skill.trim()],
        new_other_skill: '',
      }));
    }
  };

  const handleRemoveOtherSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      other_skills: prev.other_skills.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate 5 MB
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage(language === 'mr' ? 'रेझ्युमे फाईलचा आकार ५ MB पेक्षा कमी असावा.' : 'Resume file size must be less than 5 MB.');
        return;
      }
      // Validate extensions
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(ext || '')) {
        setErrorMessage(language === 'mr' ? 'फक्त PDF, DOC किंवा DOCX फाईल्स स्वीकारल्या जातात.' : 'Only PDF, DOC, or DOCX files are allowed.');
        return;
      }
      setFormData(prev => ({ ...prev, resume_file: file }));
      setErrorMessage(null);
    }
  };

  const handleSubmit = async () => {
    const errors = getValidationErrors();
    if (errors.length > 0) {
      setErrorMessage(errors[0].message);
      setCurrentStep(errors[0].step);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const actualVillage = formData.village.includes('Other') && formData.custom_village 
      ? formData.custom_village 
      : formData.village;

    try {
      const res = await submitCandidateRegistration({
        full_name: formData.full_name.trim(),
        mobile_number: formData.mobile_number.trim(),
        alternate_mobile_number: formData.alternate_mobile_number.trim() || undefined,
        age: Number(formData.age),
        village: actualVillage,
        taluka: formData.taluka,
        district: formData.district,
        pin_code: formData.pin_code || undefined,
        current_location: formData.current_location || undefined,
        willing_to_commute: formData.willing_to_commute,
        willing_to_relocate: formData.willing_to_relocate,

        highest_qualification_id: formData.highest_qualification_id,
        qualification_specialization: formData.qualification_specialization || undefined,
        passing_year: formData.passing_year ? Number(formData.passing_year) : undefined,
        additional_qualifications: formData.additional_qualifications || undefined,
        certifications_text: formData.certifications_text || undefined,
        professional_licenses: formData.professional_licenses || undefined,
        computer_proficiency_id: formData.computer_proficiency_id || undefined,

        experience_category: formData.experience_category,
        total_experience_band: formData.total_experience_band,
        total_experience_months: formData.total_experience_months || 0,
        previous_designation: formData.previous_designation || undefined,
        previous_industry_id: formData.previous_industry_id || undefined,
        previous_employer: formData.previous_employer || undefined,
        relevant_skills_gained: formData.relevant_skills_gained || undefined,
        previous_responsibilities: formData.previous_responsibilities || undefined,
        notice_period_id: formData.notice_period_id || undefined,
        earliest_joining_date: formData.earliest_joining_date || undefined,

        expected_salary_band_id: formData.expected_salary_band_id || undefined,
        employment_type_id: formData.employment_type_id || undefined,
        shift_preference_id: formData.shift_preference_id || undefined,
        joining_availability_id: formData.joining_availability_id || undefined,
        preferred_work_location: formData.preferred_work_location || undefined,
        willing_overtime: formData.willing_overtime,
        languages: formData.languages,

        resume_file: formData.resume_file,

        consent_given: formData.consent_given,
        privacy_notice_version: 'v1.0',

        employment_level_ids: formData.employment_level_ids,
        job_role_ids: formData.job_role_ids,
        skill_ids: formData.skill_ids,
        other_skills: formData.other_skills,
        industry_ids: formData.industry_ids,
      });

      if (res.success) {
        navigate('/success', {
          state: {
            registration_number: res.registration_number,
            candidate_name: formData.full_name,
            mobile_number: formData.mobile_number,
            village: actualVillage,
            is_duplicate: res.is_duplicate,
          }
        });
      } else {
        setErrorMessage(language === 'mr' ? 'नोंदणी सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' : 'An error occurred while submitting. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error submitting registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, label: t('stepPersonal'), icon: User },
    { num: 2, label: t('stepEducation'), icon: GraduationCap },
    { num: 3, label: t('stepLevel'), icon: Briefcase },
    { num: 4, label: t('stepSkills'), icon: Wrench },
    { num: 5, label: t('stepPreferences'), icon: Clock },
    { num: 6, label: t('stepReview'), icon: FileText },
  ];

  const readinessChecklist = [
    {
      step: 1,
      title: language === 'mr' ? 'पायरी १: वैयक्तिक माहिती (नाव, मोबाईल, वय, गाव)' : 'Step 1: Personal Details (Name, Phone, Age, Village)',
      isComplete: isStepComplete(1),
    },
    {
      step: 2,
      title: language === 'mr' ? 'पायरी २: शैक्षणिक पात्रता (सर्वोच्च शिक्षण)' : 'Step 2: Education (Highest Qualification)',
      isComplete: isStepComplete(2),
    },
    {
      step: 3,
      title: language === 'mr' ? 'पायरी ३: नोकरीची पातळी (किमान एक पद निवड)' : 'Step 3: Employment Level (At least one level)',
      isComplete: isStepComplete(3),
    },
    {
      step: 6,
      title: language === 'mr' ? 'पायरी ६: संमती व नियम स्वीकृती' : 'Step 6: Consent & Privacy Terms Acceptance',
      isComplete: isStepComplete(6),
    },
  ];
  const allRequiredComplete = readinessChecklist.every(item => item.isComplete);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Exploration Banner */}
      <div className="mb-6 bg-gradient-to-r from-navy-50 via-white to-amber-50 border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="shrink-0 px-2 py-0.5 rounded-md bg-saffron-500 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-2xs">
            <Eye className="w-3 h-3" />
            <span>{t('exploreBadge')}</span>
          </span>
          <span className="text-slate-700 font-medium text-xs">
            {t('exploreFormNotice')}
          </span>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] font-semibold text-slate-500 shrink-0">
          <span className={`w-2 h-2 rounded-full ${allRequiredComplete ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span>
            {readinessChecklist.filter(r => r.isComplete).length} / {readinessChecklist.length} {language === 'mr' ? 'आवश्यक बाबी पूर्ण' : 'Mandatory Complete'}
          </span>
        </div>
      </div>

      {/* Wizard Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between relative px-2 sm:px-6">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0"></div>
          <div 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-saffron-500 transition-all duration-300 -z-0"
            style={{ width: `calc(${((currentStep - 1) / (stepsList.length - 1)) * 100}% - 12px)` }}
          ></div>

          {stepsList.map(step => {
            const Icon = step.icon;
            const complete = isStepComplete(step.num);
            const isCurrent = step.num === currentStep;

            return (
              <button
                key={step.num}
                type="button"
                onClick={() => jumpToStep(step.num)}
                title={`${step.num}. ${step.label} (${language === 'mr' ? 'पाहण्यासाठी क्लिक करा' : 'Click to view'})`}
                className={`relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-105`}
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-sm ${
                    isCurrent
                      ? 'bg-saffron-500 text-white ring-4 ring-saffron-200 border-2 border-white scale-110'
                      : complete
                      ? 'bg-navy-900 text-emerald-400 border-2 border-emerald-500'
                      : 'bg-white text-slate-400 border-2 border-slate-300 group-hover:border-navy-500 group-hover:text-navy-900'
                  }`}
                >
                  {complete && !isCurrent ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                <span
                  className={`mt-2 text-[10px] sm:text-xs font-medium text-center hidden md:block max-w-[85px] leading-tight transition-colors ${
                    isCurrent 
                      ? 'text-navy-900 font-extrabold' 
                      : complete 
                      ? 'text-navy-700 font-semibold' 
                      : 'text-slate-500 group-hover:text-slate-800'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile current active step display & chip tabs */}
        <div className="mt-4 md:hidden">
          <div className="flex items-center justify-between bg-slate-100/90 border border-slate-200 rounded-lg px-3 py-2 text-xs mb-2">
            <span className="font-bold text-navy-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-saffron-500 text-white flex items-center justify-center text-[10px] font-bold">
                {currentStep}
              </span>
              <span>{stepsList[currentStep - 1].label}</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {currentStep} / {stepsList.length}
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {stepsList.map(s => {
              const complete = isStepComplete(s.num);
              const isCurrent = s.num === currentStep;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => jumpToStep(s.num)}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-navy-900 text-white border-navy-900 shadow-xs'
                      : complete
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{s.num}. {s.label}</span>
                  {complete && !isCurrent && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start justify-between gap-3 text-red-800 text-sm shadow-xs">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="font-medium">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step Container Card */}
      <div className="bg-white rounded-xl shadow-card border border-slate-200 p-6 sm:p-8">

        {/* STEP 1: PERSONAL INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-navy-900">{t('secAPersonalTitle')}</h2>
              <p className="text-sm text-slate-500">{t('secAPersonalDesc')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('fullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder={t('fullNamePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('mobileNumber')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.mobile_number}
                  onChange={e => setFormData({ ...formData, mobile_number: e.target.value.replace(/\D/g, '') })}
                  placeholder={t('mobilePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                />
              </div>

              {/* Alternative Mobile */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('altMobileNumber')}
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.alternate_mobile_number}
                  onChange={e => setFormData({ ...formData, alternate_mobile_number: e.target.value.replace(/\D/g, '') })}
                  placeholder={t('altMobilePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('age')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={18}
                  max={70}
                  required
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                />
              </div>

              {/* Village Selector with Instant Search */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 uppercase">
                    {t('village')} <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {language === 'mr' ? '२४०+ पैठण मतदारसंघ गावे उपलब्ध' : '240+ Constituency Villages'}
                  </span>
                </div>

                {/* Instant Search Bar */}
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={villageSearch}
                    onChange={e => setVillageSearch(e.target.value)}
                    placeholder={language === 'mr' ? 'गाव शोधा (उदा. बिडकीन, आपेगाव, पिंप्री, चितेगाव, लोहगाव, पाचोड)...' : 'Search village name (e.g. Bidkin, Apegaon, Pimpri, Pachod)...'}
                    className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-navy-600 focus:border-transparent bg-slate-50/70"
                  />
                  {villageSearch && (
                    <button
                      type="button"
                      onClick={() => setVillageSearch('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Quick 1-Tap Filtered Chips when searching */}
                {villageSearch.trim().length > 0 && (
                  <div className="mb-2.5 p-2 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <span className="text-[10px] font-bold uppercase text-amber-800 block mb-1.5">
                      {language === 'mr' ? 'शोधाचे निकाल (त्वरित निवडीसाठी क्लिक करा):' : 'Search Results (Tap to select):'}
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                      {BIDKIN_VILLAGES.filter(v => 
                        v.name_mr.toLowerCase().includes(villageSearch.toLowerCase()) || 
                        v.name_en.toLowerCase().includes(villageSearch.toLowerCase())
                      ).slice(0, 15).map((v, i) => {
                        const val = language === 'mr' ? v.name_mr : v.name_en;
                        const isSel = formData.village === val;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                village: val,
                                taluka: language === 'mr' ? v.taluka_mr : v.taluka_en,
                              });
                              setVillageSearch('');
                            }}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition flex items-center gap-1 ${
                              isSel 
                                ? 'bg-navy-900 text-white border-navy-900 shadow-2xs' 
                                : 'bg-white text-navy-800 border-slate-200 hover:bg-slate-100 hover:border-navy-400'
                            }`}
                          >
                            <span>{val}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({v.taluka_mr})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Categorized Dropdown Selector */}
                <select
                  value={formData.village}
                  onChange={e => {
                    const selected = BIDKIN_VILLAGES.find(v => (language === 'mr' ? v.name_mr : v.name_en) === e.target.value);
                    setFormData({
                      ...formData,
                      village: e.target.value,
                      taluka: selected ? (language === 'mr' ? selected.taluka_mr : selected.taluka_en) : formData.taluka,
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm bg-white font-medium"
                >
                  <optgroup label={language === 'mr' ? '🌟 प्रमुख औद्योगिक केंद्रे (Primary & DMIC Hubs)' : '🌟 Primary & DMIC Hubs'}>
                    {BIDKIN_VILLAGES.filter(v => v.category === 'primary').map((v, i) => (
                      <option key={`p_${i}`} value={language === 'mr' ? v.name_mr : v.name_en}>
                        {language === 'mr' ? v.name_mr : v.name_en} ({language === 'mr' ? v.taluka_mr : v.taluka_en})
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label={language === 'mr' ? '🏛️ पिंप्री महसूल मंडळ (११०-पैठण विधानसभा)' : '🏛️ Pimpri Revenue Circle (110-Paithan)'}>
                    {BIDKIN_VILLAGES.filter(v => v.category === 'pimpri_circle').map((v, i) => (
                      <option key={`pc_${i}`} value={language === 'mr' ? v.name_mr : v.name_en}>
                        {language === 'mr' ? v.name_mr : v.name_en} ({language === 'mr' ? v.taluka_mr : v.taluka_en})
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label={language === 'mr' ? '📍 पैठण तालुका गावे (Paithan Taluka Villages)' : '📍 Paithan Taluka Villages'}>
                    {BIDKIN_VILLAGES.filter(v => v.category === 'paithan' || !v.category).map((v, i) => (
                      <option key={`pt_${i}`} value={language === 'mr' ? v.name_mr : v.name_en}>
                        {language === 'mr' ? v.name_mr : v.name_en} ({language === 'mr' ? v.taluka_mr : v.taluka_en})
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label={language === 'mr' ? '🏭 लगतची औद्योगिक क्षेत्रे (Industrial & Regional Hubs)' : '🏭 Industrial & Regional Hubs'}>
                    {BIDKIN_VILLAGES.filter(v => v.category === 'industrial').map((v, i) => (
                      <option key={`ind_${i}`} value={language === 'mr' ? v.name_mr : v.name_en}>
                        {language === 'mr' ? v.name_mr : v.name_en} ({language === 'mr' ? v.taluka_mr : v.taluka_en})
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label={language === 'mr' ? 'इतर (Other)' : 'Other'}>
                    {BIDKIN_VILLAGES.filter(v => v.category === 'other').map((v, i) => (
                      <option key={`oth_${i}`} value={language === 'mr' ? v.name_mr : v.name_en}>
                        {language === 'mr' ? v.name_mr : v.name_en}
                      </option>
                    ))}
                  </optgroup>
                </select>

                {formData.village.includes('Other') && (
                  <div className="mt-2 p-3 bg-amber-50/50 border border-amber-200 rounded-lg">
                    <label className="block text-xs font-semibold text-amber-900 mb-1">
                      {language === 'mr' ? 'आपल्या गाव/वाडी/तांड्याचे नाव लिहा:' : 'Type your village/hamlet/tanda name:'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'mr' ? 'उदा. नवी वस्ती, तांडा, वाडी...' : 'e.g. New Wasti, Tanda, Hamlet...'}
                      value={formData.custom_village}
                      onChange={e => setFormData({ ...formData, custom_village: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Taluka */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('taluka')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.taluka}
                  onChange={e => setFormData({ ...formData, taluka: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm bg-white"
                >
                  {TALUKAS.map(tItem => (
                    <option key={tItem.id} value={language === 'mr' ? tItem.name_mr : tItem.name_en}>
                      {language === 'mr' ? tItem.name_mr : tItem.name_en}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('district')}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 text-sm"
                />
              </div>

              {/* PIN Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('pinCode')}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pin_code}
                  onChange={e => setFormData({ ...formData, pin_code: e.target.value })}
                  placeholder="431105"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 text-sm"
                />
              </div>

              {/* Current Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('currentLocation')}
                </label>
                <input
                  type="text"
                  value={formData.current_location}
                  onChange={e => setFormData({ ...formData, current_location: e.target.value })}
                  placeholder={t('currentLocationPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {/* Willingness to Commute */}
              <div className="sm:col-span-2 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">
                    {t('willingToCommute')} <span className="text-red-500">*</span>
                  </span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.willing_to_commute === true}
                        onChange={() => setFormData({ ...formData, willing_to_commute: true })}
                        className="text-navy-700 focus:ring-navy-600"
                      />
                      <span>{t('yes')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.willing_to_commute === false}
                        onChange={() => setFormData({ ...formData, willing_to_commute: false })}
                        className="text-navy-700 focus:ring-navy-600"
                      />
                      <span>{t('no')}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Willingness to Relocate */}
              <div className="sm:col-span-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">
                    {t('willingToRelocate')}
                  </span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.willing_to_relocate === true}
                        onChange={() => setFormData({ ...formData, willing_to_relocate: true })}
                        className="text-navy-700"
                      />
                      <span>{t('yes')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.willing_to_relocate === false}
                        onChange={() => setFormData({ ...formData, willing_to_relocate: false })}
                        className="text-navy-700"
                      />
                      <span>{t('no')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EDUCATION & QUALIFICATIONS */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-navy-900">{t('secBEducationTitle')}</h2>
              <p className="text-sm text-slate-500">{t('secBEducationDesc')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Highest Qualification */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('highestQualification')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.highest_qualification_id}
                  onChange={e => setFormData({ ...formData, highest_qualification_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 text-sm bg-white font-medium"
                >
                  {QUALIFICATIONS.map(q => (
                    <option key={q.id} value={q.id}>
                      {language === 'mr' ? q.name_mr : q.name_en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialization / Trade */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('specialization')}
                </label>
                <input
                  type="text"
                  value={formData.qualification_specialization}
                  onChange={e => setFormData({ ...formData, qualification_specialization: e.target.value })}
                  placeholder={t('specializationPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {/* Passing Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('passingYear')}
                </label>
                <input
                  type="number"
                  min={1980}
                  max={2030}
                  value={formData.passing_year}
                  onChange={e => setFormData({ ...formData, passing_year: Number(e.target.value) })}
                  placeholder={t('passingYearPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {/* Certifications */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('certificationsText')}
                </label>
                <input
                  type="text"
                  value={formData.certifications_text}
                  onChange={e => setFormData({ ...formData, certifications_text: e.target.value })}
                  placeholder={t('certificationsPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {/* Licenses */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('professionalLicenses')}
                </label>
                <input
                  type="text"
                  value={formData.professional_licenses}
                  onChange={e => setFormData({ ...formData, professional_licenses: e.target.value })}
                  placeholder={t('professionalLicensesPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {/* Computer Proficiency */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('computerProficiency')}
                </label>
                <select
                  value={formData.computer_proficiency_id}
                  onChange={e => setFormData({ ...formData, computer_proficiency_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  {COMPUTER_PROFICIENCY.map(cp => (
                    <option key={cp.id} value={cp.id}>
                      {language === 'mr' ? cp.name_mr : cp.name_en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Qualifications */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t('additionalQualifications')}
                </label>
                <textarea
                  rows={2}
                  value={formData.additional_qualifications}
                  onChange={e => setFormData({ ...formData, additional_qualifications: e.target.value })}
                  placeholder={language === 'mr' ? 'इतर डिप्लोमा, सर्टिफिकेट किंवा प्रशिक्षण...' : 'Other diplomas, short courses or skills...'}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EMPLOYMENT LEVEL & DESIRED JOB ROLES */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* Section C: Employment Levels */}
            <div>
              <div className="border-b border-slate-100 pb-3 mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-navy-900">{t('secCLevelTitle')}</h2>
                  <span className="text-xs bg-saffron-100 text-saffron-800 font-semibold px-2.5 py-1 rounded-full">
                    {formData.employment_level_ids.length} {t('selectedLevelsCount')}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{t('secCLevelDesc')}</p>
              </div>

              {/* Categorized level pills */}
              <div className="space-y-4">
                {['casual', 'skilled', 'supervisory', 'engineering', 'executive', 'management'].map(cat => {
                  const catLevels = EMPLOYMENT_LEVELS.filter(l => l.category === cat);
                  const catTitle = catLevels[0] 
                    ? (language === 'mr' ? catLevels[0].category_mr : catLevels[0].category_en)
                    : cat;

                  return (
                    <div key={cat} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wide mb-2.5">
                        {catTitle}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {catLevels.map(level => {
                          const isSelected = formData.employment_level_ids.includes(level.id);
                          return (
                            <button
                              key={level.id}
                              type="button"
                              onClick={() => toggleArrayItem('employment_level_ids', level.id)}
                              className={`text-xs px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 border ${
                                isSelected
                                  ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-navy-300 hover:bg-slate-100'
                              }`}
                            >
                              <span>{language === 'mr' ? level.name_mr : level.name_en}</span>
                              {isSelected && <CheckCircle className="w-3.5 h-3.5 text-saffron-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section D: Specific Job Roles */}
            <div className="pt-4 border-t border-slate-200">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-navy-900">{t('secDRolesTitle')}</h2>
                  <span className="text-xs bg-saffron-100 text-saffron-800 font-semibold px-2.5 py-1 rounded-full">
                    {formData.job_role_ids.length} {language === 'mr' ? 'निवडलेली पदे' : 'Roles Selected'}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{t('secDRolesDesc')}</p>
              </div>

              {/* Department filter and search input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={roleSearch}
                    onChange={e => setRoleSearch(e.target.value)}
                    placeholder={language === 'mr' ? 'पदाचे नाव शोधा (उदा. ऑपरेटर, वेल्डर)...' : 'Search role name...'}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <select
                  value={selectedDeptFilter}
                  onChange={e => setSelectedDeptFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="all">{language === 'mr' ? '-- सर्व विभाग (All Departments) --' : '-- All Departments --'}</option>
                  {JOB_DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {language === 'mr' ? dept.name_mr : dept.name_en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Roles Badges */}
              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-3 bg-slate-50 border border-slate-200 rounded-lg">
                {JOB_ROLES.filter(r => {
                  const matchesSearch = 
                    r.name_mr.toLowerCase().includes(roleSearch.toLowerCase()) || 
                    r.name_en.toLowerCase().includes(roleSearch.toLowerCase());
                  const matchesDept = selectedDeptFilter === 'all' || r.department_id === selectedDeptFilter;
                  return matchesSearch && matchesDept;
                }).map(role => {
                  const isSelected = formData.job_role_ids.includes(role.id);
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => toggleArrayItem('job_role_ids', role.id)}
                      className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-navy-800 text-white border-navy-800 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{language === 'mr' ? role.name_mr : role.name_en}</span>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 text-saffron-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: TECHNICAL SKILLS & INDUSTRY PREFERENCES */}
        {currentStep === 4 && (
          <div className="space-y-8">
            {/* Section E: Skills */}
            <div>
              <div className="border-b border-slate-100 pb-3 mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-navy-900">{t('secESkillsTitle')}</h2>
                  <span className="text-xs bg-saffron-100 text-saffron-800 font-semibold px-2.5 py-1 rounded-full">
                    {formData.skill_ids.length + formData.other_skills.length} {language === 'mr' ? 'कौशल्ये' : 'Skills'}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{t('secESkillsDesc')}</p>
              </div>

              {/* Skill search */}
              <div className="mb-4 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={e => setSkillSearch(e.target.value)}
                  placeholder={language === 'mr' ? 'कौशल्य शोधा (उदा. CNC, वेल्डिंग, Tally, Excel)...' : 'Search skills...'}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              {/* Categorized Skills */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {['mechanical', 'electrical', 'quality', 'logistics', 'computer', 'management'].map(cat => {
                  const catSkills = SKILLS.filter(s => s.category === cat && (
                    !skillSearch || 
                    s.name_mr.toLowerCase().includes(skillSearch.toLowerCase()) || 
                    s.name_en.toLowerCase().includes(skillSearch.toLowerCase())
                  ));

                  if (catSkills.length === 0) return null;
                  const catTitle = catSkills[0] ? (language === 'mr' ? catSkills[0].category_mr : catSkills[0].category_en) : cat;

                  return (
                    <div key={cat} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                        {catTitle}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {catSkills.map(s => {
                          const isSelected = formData.skill_ids.includes(s.id);
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => toggleArrayItem('skill_ids', s.id)}
                              className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition border flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-navy-800 text-white border-navy-800'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <span>{language === 'mr' ? s.name_mr : s.name_en}</span>
                              {isSelected && <CheckCircle className="w-3.5 h-3.5 text-saffron-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Other Skills Entry */}
              <div className="mt-4 p-3.5 bg-amber-50/50 border border-amber-200 rounded-lg">
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  {t('otherSkillLabel')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.new_other_skill}
                    onChange={e => setFormData({ ...formData, new_other_skill: e.target.value })}
                    placeholder={t('otherSkillPlaceholder')}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddOtherSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddOtherSkill}
                    className="bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('addSkill')}</span>
                  </button>
                </div>
                {/* List of custom skills added */}
                {formData.other_skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {formData.other_skills.map((os, idx) => (
                      <span key={idx} className="bg-amber-100 text-amber-900 border border-amber-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span>{os}</span>
                        <button type="button" onClick={() => handleRemoveOtherSkill(idx)} className="hover:text-red-700">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section G: Industry Preferences */}
            <div className="pt-4 border-t border-slate-200">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-navy-900">{t('secGIndustriesTitle')}</h2>
                  <span className="text-xs bg-saffron-100 text-saffron-800 font-semibold px-2.5 py-1 rounded-full">
                    {formData.industry_ids.length} {language === 'mr' ? 'उद्योग' : 'Industries'}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{t('secGIndustriesDesc')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INDUSTRIES.map(ind => {
                  const isChecked = formData.industry_ids.includes(ind.id);
                  return (
                    <label
                      key={ind.id}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                        isChecked
                          ? 'bg-navy-50/70 border-navy-600 text-navy-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleArrayItem('industry_ids', ind.id)}
                        className="rounded text-navy-800 focus:ring-navy-600 w-4 h-4"
                      />
                      <span>{language === 'mr' ? ind.name_mr : ind.name_en}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: WORK EXPERIENCE & WORK PREFERENCES */}
        {currentStep === 5 && (
          <div className="space-y-8">
            {/* Section F: Experience */}
            <div>
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h2 className="text-xl font-bold text-navy-900">{t('secFExperienceTitle')}</h2>
                <p className="text-sm text-slate-500">{t('secFExperienceDesc')}</p>
              </div>

              <div className="space-y-4">
                {/* Category Radio */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    {t('experienceCategory')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'fresher', label: t('fresher') },
                      { id: 'experienced', label: t('experienced') },
                      { id: 'apprentice', label: t('apprentice') },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, experience_category: cat.id as any })}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition ${
                          formData.experience_category === cat.id
                            ? 'bg-navy-800 text-white border-navy-800 font-semibold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Experience Band */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    {t('totalExperienceBand')}
                  </label>
                  <select
                    value={formData.total_experience_band}
                    onChange={e => setFormData({ ...formData, total_experience_band: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {EXPERIENCE_BANDS.map(eb => (
                      <option key={eb.id} value={eb.id}>
                        {language === 'mr' ? eb.name_mr : eb.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Details if Experienced */}
                {formData.experience_category !== 'fresher' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        {t('previousDesignation')}
                      </label>
                      <input
                        type="text"
                        value={formData.previous_designation}
                        onChange={e => setFormData({ ...formData, previous_designation: e.target.value })}
                        placeholder={t('previousDesignationPlaceholder')}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        {t('previousEmployer')}
                      </label>
                      <input
                        type="text"
                        value={formData.previous_employer}
                        onChange={e => setFormData({ ...formData, previous_employer: e.target.value })}
                        placeholder={t('previousEmployerPlaceholder')}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        {t('previousIndustry')}
                      </label>
                      <select
                        value={formData.previous_industry_id}
                        onChange={e => setFormData({ ...formData, previous_industry_id: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="">{language === 'mr' ? '-- उद्योग निवडा --' : '-- Select Industry --'}</option>
                        {INDUSTRIES.map(i => (
                          <option key={i.id} value={i.id}>
                            {language === 'mr' ? i.name_mr : i.name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        {t('noticePeriod')}
                      </label>
                      <select
                        value={formData.notice_period_id}
                        onChange={e => setFormData({ ...formData, notice_period_id: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        {NOTICE_PERIODS.map(np => (
                          <option key={np.id} value={np.id}>
                            {language === 'mr' ? np.name_mr : np.name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        {t('relevantSkillsGained')}
                      </label>
                      <input
                        type="text"
                        value={formData.relevant_skills_gained}
                        onChange={e => setFormData({ ...formData, relevant_skills_gained: e.target.value })}
                        placeholder={language === 'mr' ? 'उदा. ५ वर्षे लेथ मशीन व मेंटेनन्स अनुभव' : 'e.g. 5 years lathe & plant maintenance'}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section H: Salary and Work Preferences */}
            <div className="pt-4 border-t border-slate-200">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h2 className="text-xl font-bold text-navy-900">{t('secHPreferencesTitle')}</h2>
                <p className="text-sm text-slate-500">{t('secHPreferencesDesc')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Expected Salary */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    {t('expectedSalary')}
                  </label>
                  <select
                    value={formData.expected_salary_band_id}
                    onChange={e => setFormData({ ...formData, expected_salary_band_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white font-medium"
                  >
                    {SALARY_BANDS.map(sb => (
                      <option key={sb.id} value={sb.id}>
                        {language === 'mr' ? sb.name_mr : sb.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    {t('employmentType')}
                  </label>
                  <select
                    value={formData.employment_type_id}
                    onChange={e => setFormData({ ...formData, employment_type_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {EMPLOYMENT_TYPES.map(et => (
                      <option key={et.id} value={et.id}>
                        {language === 'mr' ? et.name_mr : et.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Shift Preference */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    {t('shiftPreference')}
                  </label>
                  <select
                    value={formData.shift_preference_id}
                    onChange={e => setFormData({ ...formData, shift_preference_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {SHIFT_PREFERENCES.map(sp => (
                      <option key={sp.id} value={sp.id}>
                        {language === 'mr' ? sp.name_mr : sp.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Joining Availability */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    {t('joiningAvailability')}
                  </label>
                  <select
                    value={formData.joining_availability_id}
                    onChange={e => setFormData({ ...formData, joining_availability_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {JOINING_AVAILABILITY.map(ja => (
                      <option key={ja.id} value={ja.id}>
                        {language === 'mr' ? ja.name_mr : ja.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    {t('preferredWorkLocation')}
                  </label>
                  <input
                    type="text"
                    value={formData.preferred_work_location}
                    onChange={e => setFormData({ ...formData, preferred_work_location: e.target.value })}
                    placeholder="e.g. Bidkin, Shendra, Waluj"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                  />
                </div>

                {/* Overtime Willingness */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50 w-full cursor-pointer text-xs font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.willing_overtime}
                      onChange={e => setFormData({ ...formData, willing_overtime: e.target.checked })}
                      className="rounded text-navy-800 w-4 h-4"
                    />
                    <span>{t('willingOvertime')}</span>
                  </label>
                </div>

                {/* Languages */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    {t('languagesKnown')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Marathi', 'Hindi', 'English', 'Other'].map(langOption => {
                      const isSel = formData.languages.includes(langOption);
                      return (
                        <button
                          key={langOption}
                          type="button"
                          onClick={() => toggleArrayItem('languages', langOption)}
                          className={`text-xs px-3 py-1.5 rounded-md font-medium border transition ${
                            isSel
                              ? 'bg-navy-800 text-white border-navy-800'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {langOption === 'Marathi' ? 'मराठी (Marathi)' : langOption === 'Hindi' ? 'हिंदी (Hindi)' : langOption}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: RESUME UPLOAD, CONSENT & REVIEW SUMMARY */}
        {currentStep === 6 && (
          <div className="space-y-8">
            {/* Section I: Resume Upload */}
            <div>
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h2 className="text-xl font-bold text-navy-900">{t('secIResumeTitle')}</h2>
                <p className="text-sm text-slate-500">{t('secIResumeDesc')}</p>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/70 text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">{t('maxSizeNotice')}</p>
                <label className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg cursor-pointer transition shadow-sm">
                  <span>{t('uploadResumeButton')}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {formData.resume_file && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 py-1.5 px-3 rounded-md max-w-sm mx-auto">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="truncate">{formData.resume_file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, resume_file: null })}
                      className="text-red-500 hover:text-red-700 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Review Summary Box */}
            <div className="p-4 bg-navy-50/60 border border-navy-200 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-saffron-500" />
                  <span>{language === 'mr' ? 'नोंदणी तपशील सारांश (Summary)' : 'Registration Summary'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(true)}
                  className="text-xs text-navy-700 hover:text-navy-900 font-semibold underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'पूर्ण अर्ज तपासा' : 'Full Preview'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">{t('fullName')}:</span>
                  <span className="font-semibold text-slate-900">{formData.full_name || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('mobileNumber')}:</span>
                  <span className="font-semibold text-slate-900">{formData.mobile_number || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('village')}:</span>
                  <span className="font-semibold text-slate-900">{formData.village}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('highestQualification')}:</span>
                  <span className="font-semibold text-slate-900">
                    {getItemLabel(QUALIFICATIONS, formData.highest_qualification_id, language)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('stepLevel')}:</span>
                  <span className="font-semibold text-slate-900">{formData.employment_level_ids.length} Levels</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('stepSkills')}:</span>
                  <span className="font-semibold text-slate-900">
                    {formData.skill_ids.length + formData.other_skills.length} Skills
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('expectedSalary')}:</span>
                  <span className="font-semibold text-slate-900">
                    {getItemLabel(SALARY_BANDS, formData.expected_salary_band_id, language)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('joiningAvailability')}:</span>
                  <span className="font-semibold text-slate-900">
                    {getItemLabel(JOINING_AVAILABILITY, formData.joining_availability_id, language)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submission Readiness Checklist */}
            <div className={`p-4 rounded-xl border transition-all ${
              allRequiredComplete 
                ? 'bg-emerald-50/70 border-emerald-200' 
                : 'bg-amber-50/70 border-amber-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  {allRequiredComplete ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                  <span>{t('submissionReadinessTitle')}</span>
                </h3>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  allRequiredComplete 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  {allRequiredComplete ? t('readyToSubmit') : t('requiredFieldsPending')}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {readinessChecklist.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/80 border border-slate-200/70"
                  >
                    <div className="flex items-center gap-2">
                      {item.isComplete ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-amber-500 shrink-0" />
                      )}
                      <span className={item.isComplete ? 'text-slate-700' : 'text-slate-900 font-medium'}>
                        {item.title}
                      </span>
                    </div>

                    {!item.isComplete ? (
                      <button
                        type="button"
                        onClick={() => jumpToStep(item.step)}
                        className="text-[11px] bg-navy-800 hover:bg-navy-700 text-white px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 shadow-2xs"
                      >
                        <span>{t('fillStepInfo')}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>{language === 'mr' ? 'पूर्ण' : 'Done'}</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {!allRequiredComplete && (
                <p className="mt-3 text-[11px] text-amber-800 font-medium">
                  {language === 'mr'
                    ? 'सूचना: आपण अर्जाची पाहणी करू शकता, परंतु नोंदणी पूर्ण करण्यासाठी वरील सर्व आवश्यक बाबी पूर्ण करणे बंधनकारक आहे.'
                    : 'Notice: You can explore the application freely, but all mandatory sections above must be completed before submission.'}
                </p>
              )}
            </div>

            {/* Section J: Consent & Privacy Notice */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h3 className="font-bold text-sm text-slate-900">{t('secJConsentTitle')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('privacyDisclaimerSummary')}
              </p>
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent_given}
                    onChange={e => setFormData({ ...formData, consent_given: e.target.checked })}
                    className="mt-0.5 rounded text-navy-800 w-4 h-4"
                  />
                  <span className="text-xs text-slate-800 font-medium leading-normal">
                    {t('consentCheckbox')} <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('prev')}</span>
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              {language === 'mr' ? `पायरी ${currentStep} / ६` : `Step ${currentStep} of 6`}
            </span>
          </div>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition"
            >
              <span>{t('next')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition ${
                allRequiredComplete
                  ? 'bg-saffron-500 hover:bg-saffron-600 text-white cursor-pointer'
                  : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('submitting')}</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>{t('submitRegistration')}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* FULL REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-navy-900 text-white">
              <h3 className="font-bold text-base">{language === 'mr' ? 'नोंदणी अर्ज पूर्वतपासणी' : 'Application Review'}</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div><span className="text-slate-400 block">{t('fullName')}:</span><strong>{formData.full_name}</strong></div>
                <div><span className="text-slate-400 block">{t('mobileNumber')}:</span><strong>{formData.mobile_number}</strong></div>
                <div><span className="text-slate-400 block">{t('village')}:</span><strong>{formData.village}</strong></div>
                <div><span className="text-slate-400 block">{t('taluka')}:</span><strong>{formData.taluka}</strong></div>
                <div><span className="text-slate-400 block">{t('age')}:</span><strong>{formData.age} years</strong></div>
                <div><span className="text-slate-400 block">{t('highestQualification')}:</span><strong>{getItemLabel(QUALIFICATIONS, formData.highest_qualification_id, language)}</strong></div>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">{t('secCLevelTitle')}:</span>
                <p className="font-medium">{getItemsLabels(EMPLOYMENT_LEVELS, formData.employment_level_ids, language).join(', ') || 'None'}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">{t('secESkillsTitle')}:</span>
                <p className="font-medium">{[...getItemsLabels(SKILLS, formData.skill_ids, language), ...formData.other_skills].join(', ') || 'None'}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">{t('secGIndustriesTitle')}:</span>
                <p className="font-medium">{getItemsLabels(INDUSTRIES, formData.industry_ids, language).join(', ') || 'None'}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                <div><span className="text-slate-400 block">{t('expectedSalary')}:</span><strong>{getItemLabel(SALARY_BANDS, formData.expected_salary_band_id, language)}</strong></div>
                <div><span className="text-slate-400 block">{t('shiftPreference')}:</span><strong>{getItemLabel(SHIFT_PREFERENCES, formData.shift_preference_id, language)}</strong></div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="bg-navy-800 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                {language === 'mr' ? 'तपासले (Close)' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
