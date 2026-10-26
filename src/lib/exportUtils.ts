import { CandidateProfile } from '../types/candidate';
import { 
  QUALIFICATIONS, 
  EMPLOYMENT_LEVELS, 
  JOB_ROLES, 
  SKILLS, 
  INDUSTRIES, 
  SALARY_BANDS, 
  SHIFT_PREFERENCES, 
  JOINING_AVAILABILITY, 
  EXPERIENCE_BANDS,
  FOLLOW_UP_STATUS_OPTIONS,
  getItemLabel,
  getItemsLabels
} from '../data/catalogData';

// Prevent Spreadsheet Formula Injection (CSV Injection / CWE-1236)
function sanitizeForCsv(val: any): string {
  if (val === null || val === undefined) return '';
  let str = String(val).trim();
  
  // Prefix dangerous trigger characters with single quote
  if (/^[=\+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  
  // Escape quotes and wrap in quotes if it contains commas, newlines, or quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  
  return str;
}

export function exportCandidatesToCsv(candidates: CandidateProfile[], filename = 'dmic-bidkin-candidates.csv', lang: 'mr' | 'en' = 'mr') {
  if (!candidates || candidates.length === 0) {
    alert(lang === 'mr' ? 'निर्यात करण्यासाठी कोणतेही उमेदवार नाहीत.' : 'No candidates available to export.');
    return;
  }

  const headers = [
    lang === 'mr' ? 'नोंदणी क्रमांक' : 'Registration ID',
    lang === 'mr' ? 'नोंदणी तारीख' : 'Registration Date',
    lang === 'mr' ? 'पूर्ण नाव' : 'Full Name',
    lang === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number',
    lang === 'mr' ? 'पर्यायी मोबाईल' : 'Alternate Mobile',
    lang === 'mr' ? 'वय' : 'Age',
    lang === 'mr' ? 'गाव / शहर' : 'Village / Town',
    lang === 'mr' ? 'तालुका' : 'Taluka',
    lang === 'mr' ? 'जिल्हा' : 'District',
    lang === 'mr' ? 'सर्वोच्च शिक्षण' : 'Highest Qualification',
    lang === 'mr' ? 'शाखा / ट्रेड' : 'Specialization / Trade',
    lang === 'mr' ? 'उत्तीर्ण वर्ष' : 'Passing Year',
    lang === 'mr' ? 'अनुभव प्रकार' : 'Experience Category',
    lang === 'mr' ? 'कामाचा अनुभव' : 'Total Experience',
    lang === 'mr' ? 'मागील हुद्दा' : 'Previous Designation',
    lang === 'mr' ? 'पसंतीची नोकरी पातळी' : 'Preferred Employment Levels',
    lang === 'mr' ? 'पसंतीची पदे' : 'Preferred Job Roles',
    lang === 'mr' ? 'तांत्रिक कौशल्ये' : 'Technical Skills',
    lang === 'mr' ? 'उद्योग पसंती' : 'Industry Preferences',
    lang === 'mr' ? 'अपेक्षित मासिक वेतन' : 'Expected Salary',
    lang === 'mr' ? 'शिफ्ट पसंती' : 'Shift Preference',
    lang === 'mr' ? 'उपलब्धता' : 'Joining Availability',
    lang === 'mr' ? 'बिडकीन ये-जा तयारी' : 'Willing to Commute to Bidkin',
    lang === 'mr' ? 'सध्याची स्थिती' : 'Follow-up Status',
  ];

  const rows = candidates.map(c => {
    const qualLabel = getItemLabel(QUALIFICATIONS, c.highest_qualification_id, lang);
    const expLabel = getItemLabel(EXPERIENCE_BANDS, c.total_experience_band, lang);
    const levelsLabels = getItemsLabels(EMPLOYMENT_LEVELS, c.employment_levels, lang).join('; ');
    const rolesLabels = getItemsLabels(JOB_ROLES, c.job_roles, lang).join('; ');
    const skillsLabels = [
      ...getItemsLabels(SKILLS, c.skills, lang),
      ...(c.other_skills || [])
    ].join('; ');
    const indLabels = getItemsLabels(INDUSTRIES, c.industries, lang).join('; ');
    const salaryLabel = getItemLabel(SALARY_BANDS, c.expected_salary_band_id, lang);
    const shiftLabel = getItemLabel(SHIFT_PREFERENCES, c.shift_preference_id, lang);
    const availLabel = getItemLabel(JOINING_AVAILABILITY, c.joining_availability_id, lang);
    const statusObj = FOLLOW_UP_STATUS_OPTIONS.find(s => s.id === c.follow_up_status);
    const statusLabel = statusObj ? (lang === 'mr' ? statusObj.name_mr : statusObj.name_en) : c.follow_up_status;

    return [
      sanitizeForCsv(c.registration_number),
      sanitizeForCsv(new Date(c.created_at).toLocaleDateString()),
      sanitizeForCsv(c.full_name),
      sanitizeForCsv(c.mobile_number),
      sanitizeForCsv(c.alternate_mobile_number || ''),
      sanitizeForCsv(c.age),
      sanitizeForCsv(c.village),
      sanitizeForCsv(c.taluka),
      sanitizeForCsv(c.district),
      sanitizeForCsv(qualLabel),
      sanitizeForCsv(c.qualification_specialization || ''),
      sanitizeForCsv(c.passing_year || ''),
      sanitizeForCsv(c.experience_category),
      sanitizeForCsv(expLabel),
      sanitizeForCsv(c.previous_designation || ''),
      sanitizeForCsv(levelsLabels),
      sanitizeForCsv(rolesLabels),
      sanitizeForCsv(skillsLabels),
      sanitizeForCsv(indLabels),
      sanitizeForCsv(salaryLabel),
      sanitizeForCsv(shiftLabel),
      sanitizeForCsv(availLabel),
      sanitizeForCsv(c.willing_to_commute ? (lang === 'mr' ? 'होय' : 'Yes') : (lang === 'mr' ? 'नाही' : 'No')),
      sanitizeForCsv(statusLabel),
    ].join(',');
  });

  // UTF-8 BOM (\uFEFF) ensures Excel and spreadsheet software correctly render Marathi Devanagari text!
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
