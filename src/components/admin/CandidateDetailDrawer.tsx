import React, { useState, useEffect } from 'react';
import { CandidateProfile, FollowUpStatus } from '../../types/candidate';
import { useLanguage } from '../../context/LanguageContext';
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
  COMPUTER_PROFICIENCY,
  getItemLabel,
  getItemsLabels
} from '../../data/catalogData';
import { updateCandidateStatus, getCandidateFollowups, supabase } from '../../lib/supabase';
import { 
  X, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Download, 
  FileText, 
  MessageSquare, 
  Clock, 
  Check, 
  AlertCircle,
  Building2,
  DollarSign,
  UserCheck
} from 'lucide-react';

interface CandidateDetailDrawerProps {
  candidate: CandidateProfile | null;
  onClose: () => void;
  onCandidateUpdated: () => void;
}

export const CandidateDetailDrawer: React.FC<CandidateDetailDrawerProps> = ({
  candidate,
  onClose,
  onCandidateUpdated,
}) => {
  const { language, t } = useLanguage();

  const [currentStatus, setCurrentStatus] = useState<FollowUpStatus>('new');
  const [internalNote, setInternalNote] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [followupHistory, setFollowupHistory] = useState<any[]>([]);

  useEffect(() => {
    if (candidate) {
      setCurrentStatus(candidate.follow_up_status || 'new');
      setInternalNote('');
      setUpdateSuccess(false);

      // Load followups history
      getCandidateFollowups(candidate.id).then(notes => {
        setFollowupHistory(notes || []);
      });
    }
  }, [candidate]);

  if (!candidate) return null;

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      const ok = await updateCandidateStatus(candidate.id, currentStatus, internalNote);
      if (ok) {
        setUpdateSuccess(true);
        setInternalNote('');
        onCandidateUpdated();
        const updatedNotes = await getCandidateFollowups(candidate.id);
        setFollowupHistory(updatedNotes);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDownloadResume = async () => {
    if (!candidate.resume_storage_path) return;
    try {
      const { data, error } = await supabase.storage
        .from('candidate-resumes')
        .download(candidate.resume_storage_path);

      if (error || !data) {
        alert(language === 'mr' ? 'रेझ्युमे फाईल डाऊनलोड करता आली नाही.' : 'Could not download resume file.');
        return;
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = candidate.resume_original_name || `${candidate.registration_number}-resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Resume download error');
    }
  };

  const statusObj = FOLLOW_UP_STATUS_OPTIONS.find(s => s.id === candidate.follow_up_status);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex justify-between items-start border-b border-navy-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs bg-navy-800 border border-navy-700 text-saffron-400 font-bold px-2 py-0.5 rounded">
                {candidate.registration_number}
              </span>
              {candidate.is_duplicate_flag && (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold px-2 py-0.5 rounded-full">
                  {language === 'mr' ? 'पुनरावृत्ती (Duplicate)' : 'Possible Duplicate'}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">{candidate.full_name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-1.5">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-saffron-400" />
                <a href={`tel:${candidate.mobile_number}`} className="hover:underline">{candidate.mobile_number}</a>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-saffron-400" />
                <span>{candidate.village}, {candidate.taluka}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(candidate.created_at).toLocaleDateString()}</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          
          {/* Status & Followup Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-navy-900 uppercase tracking-wide flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-navy-700" />
                <span>{t('followUpStatus')}</span>
              </h3>
              {statusObj && (
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${statusObj.color}`}>
                  {language === 'mr' ? statusObj.name_mr : statusObj.name_en}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  {language === 'mr' ? 'स्थिती बदला' : 'Change Status'}
                </label>
                <select
                  value={currentStatus}
                  onChange={e => setCurrentStatus(e.target.value as FollowUpStatus)}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                >
                  {FOLLOW_UP_STATUS_OPTIONS.map(s => (
                    <option key={s.id} value={s.id}>
                      {language === 'mr' ? s.name_mr : s.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  {t('internalNotes')}
                </label>
                <input
                  type="text"
                  value={internalNote}
                  onChange={e => setInternalNote(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. उमेदवाराशी फोनवर बोलणे झाले, कागदपत्रे तपासली...' : 'e.g. Candidate contacted, details verified...'}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-2 pt-1">
              {updateSuccess && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>{language === 'mr' ? 'स्थिती अद्ययावत झाली!' : 'Status updated successfully!'}</span>
                </span>
              )}
              <button
                type="button"
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg shadow-sm transition"
              >
                {isUpdating ? 'Updating...' : t('saveStatus')}
              </button>
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-navy-900 uppercase tracking-wide flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-navy-700" />
              <span>{t('stepEducation')}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">{t('highestQualification')}:</span>
                <span className="font-semibold text-slate-900">
                  {getItemLabel(QUALIFICATIONS, candidate.highest_qualification_id, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('specialization')}:</span>
                <span className="font-semibold text-slate-900">{candidate.qualification_specialization || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('passingYear')}:</span>
                <span className="font-semibold text-slate-900">{candidate.passing_year || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('computerProficiency')}:</span>
                <span className="font-semibold text-slate-900">
                  {getItemLabel(COMPUTER_PROFICIENCY, candidate.computer_proficiency_id, language)}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">{t('certificationsText')}:</span>
                <span className="text-slate-900 font-medium">{candidate.certifications_text || '—'}</span>
              </div>
            </div>
          </div>

          {/* Preferred Employment Levels */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-xs text-navy-900 uppercase tracking-wide flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-navy-700" />
              <span>{t('secCLevelTitle')}</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {getItemsLabels(EMPLOYMENT_LEVELS, candidate.employment_levels, language).map((levelName, idx) => (
                <span key={idx} className="bg-navy-50 text-navy-900 border border-navy-200 text-xs px-2.5 py-1 rounded-md font-medium">
                  {levelName}
                </span>
              ))}
              {(!candidate.employment_levels || candidate.employment_levels.length === 0) && (
                <span className="text-xs text-slate-400">None specified</span>
              )}
            </div>
          </div>

          {/* Preferred Job Roles */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-xs text-navy-900 uppercase tracking-wide">
              {t('secDRolesTitle')}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {getItemsLabels(JOB_ROLES, candidate.job_roles, language).map((roleName, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-medium">
                  {roleName}
                </span>
              ))}
              {(!candidate.job_roles || candidate.job_roles.length === 0) && (
                <span className="text-xs text-slate-400">None specified</span>
              )}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-xs text-navy-900 uppercase tracking-wide">
              {t('stepSkills')}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {getItemsLabels(SKILLS, candidate.skills, language).map((skillName, idx) => (
                <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded-md font-medium">
                  {skillName}
                </span>
              ))}
              {candidate.other_skills?.map((otherSkill, idx) => (
                <span key={`oth-${idx}`} className="bg-amber-50 text-amber-800 border border-amber-200 text-xs px-2.5 py-1 rounded-md font-medium">
                  {otherSkill}
                </span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-navy-900 uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-navy-700" />
              <span>{t('stepExperience')}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">{t('experienceCategory')}:</span>
                <span className="font-semibold text-slate-900 capitalize">{candidate.experience_category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('totalExperienceBand')}:</span>
                <span className="font-semibold text-slate-900">
                  {getItemLabel(EXPERIENCE_BANDS, candidate.total_experience_band, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('previousDesignation')}:</span>
                <span className="font-semibold text-slate-900">{candidate.previous_designation || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('previousEmployer')}:</span>
                <span className="font-semibold text-slate-900">{candidate.previous_employer || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('previousIndustry')}:</span>
                <span className="font-semibold text-slate-900">
                  {getItemLabel(INDUSTRIES, candidate.previous_industry_id, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('noticePeriod')}:</span>
                <span className="font-semibold text-slate-900">{candidate.notice_period_id || '—'}</span>
              </div>
            </div>
          </div>

          {/* Preferences & Compensation */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-navy-900 uppercase tracking-wide flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-navy-700" />
              <span>{t('secHPreferencesTitle')}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">{t('expectedSalary')}:</span>
                <span className="font-semibold text-slate-900">
                  {getItemLabel(SALARY_BANDS, candidate.expected_salary_band_id, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('shiftPreference')}:</span>
                <span className="font-semibold text-slate-900">
                  {getItemLabel(SHIFT_PREFERENCES, candidate.shift_preference_id, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('joiningAvailability')}:</span>
                <span className="font-semibold text-slate-900">
                  {getItemLabel(JOINING_AVAILABILITY, candidate.joining_availability_id, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('willingToCommute')}:</span>
                <span className="font-semibold text-slate-900">{candidate.willing_to_commute ? t('yes') : t('no')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('willingOvertime')}:</span>
                <span className="font-semibold text-slate-900">{candidate.willing_overtime ? t('yes') : t('no')}</span>
              </div>
            </div>
          </div>

          {/* Resume Download (If Available) */}
          {candidate.resume_storage_path && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-emerald-700" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">
                    {candidate.resume_original_name || 'Resume Document'}
                  </h4>
                  <span className="text-[11px] text-emerald-700">
                    {candidate.resume_size_bytes ? `${(candidate.resume_size_bytes / 1024).toFixed(1)} KB` : 'Attached'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadResume}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('downloadResume')}</span>
              </button>
            </div>
          )}

          {/* Follow-up Notes Audit History */}
          {followupHistory.length > 0 && (
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'mr' ? 'कार्यालयीन नोंदींचा इतिहास' : 'Internal Notes History'}</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {followupHistory.map((note, index) => (
                  <div key={index} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                      <span className="font-semibold text-navy-800">{note.created_by}</span>
                      <span>{new Date(note.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-800">{note.internal_note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
