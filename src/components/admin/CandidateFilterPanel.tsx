import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CandidateFilterState } from '../../types/candidate';
import { 
  QUALIFICATIONS, 
  EMPLOYMENT_LEVELS, 
  SKILLS, 
  INDUSTRIES, 
  SALARY_BANDS, 
  JOINING_AVAILABILITY, 
  EXPERIENCE_BANDS,
  FOLLOW_UP_STATUS_OPTIONS 
} from '../../data/catalogData';
import { BIDKIN_VILLAGES, TALUKAS, getVillagesByTaluka } from '../../data/villagesData';
import { Filter, RotateCcw, X, Check } from 'lucide-react';

interface CandidateFilterPanelProps {
  filters: CandidateFilterState;
  setFilters: React.Dispatch<React.SetStateAction<CandidateFilterState>>;
  resetFilters: () => void;
  activeFilterCount: number;
}

export const CandidateFilterPanel: React.FC<CandidateFilterPanelProps> = ({
  filters,
  setFilters,
  resetFilters,
  activeFilterCount,
}) => {
  const { language, t } = useLanguage();

  const toggleArrayFilter = (key: 'employmentLevels' | 'selectedSkills' | 'industries', id: string) => {
    setFilters(prev => {
      const arr = prev[key];
      const exists = arr.includes(id);
      return {
        ...prev,
        [key]: exists ? arr.filter(x => x !== id) : [...arr, id],
      };
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-800" />
          <h3 className="font-bold text-sm text-navy-900">{t('filterCandidates')}</h3>
          {activeFilterCount > 0 && (
            <span className="bg-saffron-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-saffron-600 hover:text-saffron-700 font-semibold flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('resetFilters')}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Taluka Filter */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('taluka')}
          </label>
          <select
            value={filters.taluka}
            onChange={e => {
              const newTaluka = e.target.value;
              setFilters(prev => ({ 
                ...prev, 
                taluka: newTaluka, 
                village: '' // reset village if taluka changes
              }));
            }}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium"
          >
            <option value="">{language === 'mr' ? '-- सर्व तालुके --' : '-- All Talukas --'}</option>
            {TALUKAS.map(tItem => (
              <option key={tItem.id} value={language === 'mr' ? tItem.name_mr : tItem.name_en}>
                {language === 'mr' ? tItem.name_mr : tItem.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* Village Filter (Filtered by selected Taluka) */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('village')} {filters.taluka ? `(${filters.taluka})` : ''}
          </label>
          <select
            value={filters.village}
            onChange={e => setFilters(prev => ({ ...prev, village: e.target.value }))}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium"
          >
            <option value="">
              {filters.taluka 
                ? (language === 'mr' ? `-- ${filters.taluka} मधील सर्व गावे --` : `-- All in ${filters.taluka} --`)
                : (language === 'mr' ? '-- सर्व गावे --' : '-- All Villages --')}
            </option>
            {(filters.taluka ? getVillagesByTaluka(filters.taluka) : BIDKIN_VILLAGES).map((v, i) => (
              <option key={i} value={language === 'mr' ? v.name_mr : v.name_en}>
                {language === 'mr' ? v.name_mr : v.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* Qualification Filter */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('highestQualification')}
          </label>
          <select
            value={filters.highestQualification}
            onChange={e => setFilters(prev => ({ ...prev, highestQualification: e.target.value }))}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white"
          >
            <option value="">{language === 'mr' ? '-- सर्व शिक्षण --' : '-- All Qualifications --'}</option>
            {QUALIFICATIONS.map(q => (
              <option key={q.id} value={q.id}>
                {language === 'mr' ? q.name_mr : q.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Category */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('experienceCategory')}
          </label>
          <select
            value={filters.experienceCategory}
            onChange={e => setFilters(prev => ({ ...prev, experienceCategory: e.target.value }))}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white"
          >
            <option value="">{language === 'mr' ? '-- सर्व प्रकार --' : '-- All Categories --'}</option>
            <option value="fresher">{t('fresher')}</option>
            <option value="experienced">{t('experienced')}</option>
            <option value="apprentice">{t('apprentice')}</option>
          </select>
        </div>

        {/* Experience Band */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('totalExperienceBand')}
          </label>
          <select
            value={filters.experienceBand}
            onChange={e => setFilters(prev => ({ ...prev, experienceBand: e.target.value }))}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white"
          >
            <option value="">{language === 'mr' ? '-- सर्व अनुभव --' : '-- All Experience --'}</option>
            {EXPERIENCE_BANDS.map(eb => (
              <option key={eb.id} value={eb.id}>
                {language === 'mr' ? eb.name_mr : eb.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* Expected Salary */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('expectedSalary')}
          </label>
          <select
            value={filters.salaryBand}
            onChange={e => setFilters(prev => ({ ...prev, salaryBand: e.target.value }))}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white"
          >
            <option value="">{language === 'mr' ? '-- सर्व वेतन श्रेणी --' : '-- All Salary Ranges --'}</option>
            {SALARY_BANDS.map(sb => (
              <option key={sb.id} value={sb.id}>
                {language === 'mr' ? sb.name_mr : sb.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* Joining Availability */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('joiningAvailability')}
          </label>
          <select
            value={filters.joiningAvailability}
            onChange={e => setFilters(prev => ({ ...prev, joiningAvailability: e.target.value }))}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white"
          >
            <option value="">{language === 'mr' ? '-- सर्व कालावधी --' : '-- All Availability --'}</option>
            {JOINING_AVAILABILITY.map(ja => (
              <option key={ja.id} value={ja.id}>
                {language === 'mr' ? ja.name_mr : ja.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* Follow-up Status */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase mb-1">
            {t('followUpStatus')}
          </label>
          <select
            value={filters.followUpStatus}
            onChange={e => setFilters(prev => ({ ...prev, followUpStatus: e.target.value }))}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium"
          >
            <option value="">{language === 'mr' ? '-- सर्व स्थिती --' : '-- All Statuses --'}</option>
            {FOLLOW_UP_STATUS_OPTIONS.map(status => (
              <option key={status.id} value={status.id}>
                {language === 'mr' ? status.name_mr : status.name_en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Multi-Select Filters: Skills & Skill Match Mode */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-xs text-slate-800 uppercase flex items-center gap-2">
            <span>{t('stepSkills')} ({filters.selectedSkills.length} selected)</span>
          </label>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-500">{language === 'mr' ? 'कौशल्य जुळवणी:' : 'Skill Matching:'}</span>
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, skillMatchMode: 'ANY' }))}
              className={`px-2 py-0.5 rounded font-medium border ${
                filters.skillMatchMode === 'ANY'
                  ? 'bg-navy-800 text-white border-navy-800'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              ANY ({language === 'mr' ? 'कोणतेही एक' : 'Any'})
            </button>
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, skillMatchMode: 'ALL' }))}
              className={`px-2 py-0.5 rounded font-medium border ${
                filters.skillMatchMode === 'ALL'
                  ? 'bg-navy-800 text-white border-navy-800'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              ALL ({language === 'mr' ? 'सर्व आवश्यक' : 'All'})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-lg border border-slate-200">
          {SKILLS.slice(0, 24).map(s => {
            const isSel = filters.selectedSkills.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleArrayFilter('selectedSkills', s.id)}
                className={`text-[11px] px-2 py-1 rounded transition border flex items-center gap-1 ${
                  isSel
                    ? 'bg-navy-800 text-white border-navy-800 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{language === 'mr' ? s.name_mr : s.name_en}</span>
                {isSel && <Check className="w-3 h-3 text-saffron-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
