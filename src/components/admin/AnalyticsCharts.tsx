import React from 'react';
import { CandidateProfile } from '../../types/candidate';
import { useLanguage } from '../../context/LanguageContext';
import { 
  QUALIFICATIONS, 
  EMPLOYMENT_LEVELS, 
  SKILLS, 
  INDUSTRIES, 
  JOINING_AVAILABILITY, 
  EXPERIENCE_BANDS,
  getItemLabel 
} from '../../data/catalogData';
import { BarChart3, Users, Briefcase, GraduationCap, MapPin, Wrench } from 'lucide-react';

interface AnalyticsChartsProps {
  candidates: CandidateProfile[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ candidates }) => {
  const { language } = useLanguage();
  const total = candidates.length || 1;

  // 1. Group by Highest Qualification
  const qualCounts: Record<string, number> = {};
  candidates.forEach(c => {
    const q = c.highest_qualification_id || 'other_qual';
    qualCounts[q] = (qualCounts[q] || 0) + 1;
  });
  const topQuals = Object.entries(qualCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // 2. Group by Employment Level
  const levelCounts: Record<string, number> = {};
  candidates.forEach(c => {
    (c.employment_levels || []).forEach(l => {
      levelCounts[l] = (levelCounts[l] || 0) + 1;
    });
  });
  const topLevels = Object.entries(levelCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // 3. Group by Top Villages
  const villageCounts: Record<string, number> = {};
  candidates.forEach(c => {
    const v = c.village || 'Other';
    villageCounts[v] = (villageCounts[v] || 0) + 1;
  });
  const topVillages = Object.entries(villageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // 4. Group by Skills
  const skillCounts: Record<string, number> = {};
  candidates.forEach(c => {
    (c.skills || []).forEach(s => {
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    });
  });
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // 5. Group by Joining Availability
  const availCounts: Record<string, number> = {};
  candidates.forEach(c => {
    const a = c.joining_availability_id || 'immediately';
    availCounts[a] = (availCounts[a] || 0) + 1;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Chart 1: Qualifications Distribution */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2 mb-4">
          <GraduationCap className="w-4 h-4 text-saffron-500" />
          <span>{language === 'mr' ? 'उमेदवार शिक्षणानुसार' : 'Candidates by Qualification'}</span>
        </h3>
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {topQuals.map(([qId, count]) => {
            const label = getItemLabel(QUALIFICATIONS, qId, language);
            const pct = Math.round((count / total) * 100);
            return (
              <div key={qId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">{label}</span>
                  <span className="font-bold text-navy-900">{count} ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-navy-700 rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 2: Top Skills */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2 mb-4">
          <Wrench className="w-4 h-4 text-saffron-500" />
          <span>{language === 'mr' ? 'प्रमुख तांत्रिक कौशल्ये' : 'Top Technical Skills'}</span>
        </h3>
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {topSkills.map(([sId, count]) => {
            const label = getItemLabel(SKILLS, sId, language);
            const pct = Math.round((count / total) * 100);
            return (
              <div key={sId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">{label}</span>
                  <span className="font-bold text-emerald-800">{count} ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 3: Village-wise Distribution */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-saffron-500" />
          <span>{language === 'mr' ? 'गावनिहाय उमेदवार' : 'Candidates by Village'}</span>
        </h3>
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {topVillages.map(([vName, count]) => {
            const pct = Math.round((count / total) * 100);
            return (
              <div key={vName} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">{vName}</span>
                  <span className="font-bold text-saffron-700">{count} ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-saffron-500 rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 4: Top Employment Levels */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2 mb-4">
          <Briefcase className="w-4 h-4 text-saffron-500" />
          <span>{language === 'mr' ? 'नोकरीची पातळी पसंती' : 'Preferred Employment Levels'}</span>
        </h3>
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {topLevels.map(([lId, count]) => {
            const label = getItemLabel(EMPLOYMENT_LEVELS, lId, language);
            const pct = Math.round((count / total) * 100);
            return (
              <div key={lId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">{label}</span>
                  <span className="font-bold text-navy-900">{count} ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-navy-600 rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 5: Immediate Availability */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:col-span-2">
        <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-saffron-500" />
          <span>{language === 'mr' ? 'रुजू होण्याची उपलब्धता' : 'Joining Availability Breakdown'}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {JOINING_AVAILABILITY.map(ja => {
            const count = availCounts[ja.id] || 0;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={ja.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <span className="text-xl font-bold text-navy-900 block">{count}</span>
                <span className="text-xs text-slate-600 font-medium block truncate">
                  {language === 'mr' ? ja.name_mr : ja.name_en}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{pct}% of total</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
