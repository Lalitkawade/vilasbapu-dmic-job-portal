import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchAllCandidates } from '../lib/supabase';
import { CandidateProfile } from '../types/candidate';
import { 
  QUALIFICATIONS, 
  EMPLOYMENT_LEVELS, 
  SKILLS, 
  INDUSTRIES, 
  SALARY_BANDS, 
  JOINING_AVAILABILITY, 
  EXPERIENCE_BANDS,
  getItemLabel 
} from '../data/catalogData';
import { exportCandidatesToCsv } from '../lib/exportUtils';
import { AnalyticsCharts } from '../components/admin/AnalyticsCharts';
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  Users, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Clock, 
  Wrench,
  CheckCircle2
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllCandidates().then(data => {
      setCandidates(data);
      setIsLoading(false);
    });
  }, []);

  const handleExportFiltered = (filterFn: (c: CandidateProfile) => boolean, title: string) => {
    const subset = candidates.filter(filterFn);
    exportCandidatesToCsv(subset, `${title}-${new Date().toISOString().slice(0,10)}.csv`, language);
  };

  const reportPresets = [
    {
      title_mr: 'सर्व अधिकृत उमेदवार निर्यात',
      title_en: 'Export All Authorized Candidates',
      desc_mr: 'पोर्टलवरील सर्व नोंदणीकृत उमेदवारांची संपूर्ण यादी CSV/Excel मध्ये डाऊनलोड करा.',
      desc_en: 'Complete download of all registered candidates in UTF-8 Unicode CSV.',
      icon: Users,
      count: candidates.length,
      action: () => exportCandidatesToCsv(candidates, `all-dmic-candidates-${new Date().toISOString().slice(0,10)}.csv`, language),
      color: 'bg-navy-800 text-white',
    },
    {
      title_mr: 'त्वरित उपलब्ध उमेदवार (Immediate Availability)',
      title_en: 'Immediately Available Candidates',
      desc_mr: 'ज्या उमेदवारांनी आजच किंवा त्वरित रुजू होण्याची तयारी दर्शविली आहे.',
      desc_en: 'Candidates available to join immediately or within 7 days.',
      icon: Clock,
      count: candidates.filter(c => c.joining_availability_id === 'immediately' || c.joining_availability_id === 'within_7_days').length,
      action: () => handleExportFiltered(
        c => c.joining_availability_id === 'immediately' || c.joining_availability_id === 'within_7_days',
        'immediate-candidates'
      ),
      color: 'bg-blue-600 text-white',
    },
    {
      title_mr: 'तांत्रिक व आयटीआय / डिप्लोमा उमेदवार',
      title_en: 'Technical, ITI & Diploma Candidates',
      desc_mr: 'आयटीआय, डिप्लोमा, फिटर, इलेक्ट्रिशियन व मेकॅनिकल उमेदवारांची स्वतंत्र यादी.',
      desc_en: 'Candidates holding ITI, Diploma, Fitter, Electrician, or CNC certifications.',
      icon: Wrench,
      count: candidates.filter(c => c.highest_qualification_id === 'iti' || c.highest_qualification_id === 'diploma_polytechnic').length,
      action: () => handleExportFiltered(
        c => c.highest_qualification_id === 'iti' || c.highest_qualification_id === 'diploma_polytechnic',
        'technical-iti-candidates'
      ),
      color: 'bg-emerald-600 text-white',
    },
    {
      title_mr: 'अभियांत्रिकी व स्पेशालिस्ट उमेदवार (BE / BTech)',
      title_en: 'Engineering & Specialists Report',
      desc_mr: 'मेकॅनिकल, इलेक्ट्रिकल, ऑटोमेशन व इतर बी.ई./बी.टेक इंजिनिअर उमेदवारांची यादी.',
      desc_en: 'Graduate engineers and specialized degree holders.',
      icon: GraduationCap,
      count: candidates.filter(c => c.highest_qualification_id === 'be_btech').length,
      action: () => handleExportFiltered(c => c.highest_qualification_id === 'be_btech', 'engineering-candidates'),
      color: 'bg-purple-600 text-white',
    },
    {
      title_mr: 'अनुभवी कामगार व तंत्रज्ञ (Experienced Staff)',
      title_en: 'Experienced Candidates (1+ Years)',
      desc_mr: 'किमान १ ते ५+ वर्षांचा प्रत्यक्ष औद्योगिक कामाचा अनुभव असणारे उमेदवार.',
      desc_en: 'Candidates with verified past industrial experience.',
      icon: Briefcase,
      count: candidates.filter(c => c.experience_category === 'experienced' && c.total_experience_band !== 'no_experience').length,
      action: () => handleExportFiltered(
        c => c.experience_category === 'experienced' && c.total_experience_band !== 'no_experience',
        'experienced-candidates'
      ),
      color: 'bg-saffron-600 text-white',
    },
    {
      title_mr: 'बिडकीन व पैठण स्थानिक उमेदवार',
      title_en: 'Bidkin & Paithan Local Residents',
      desc_mr: 'स्थानिक गावचे रहिवासी असलेले व रोज ये-जा करण्याची तयारी असणारे उमेदवार.',
      desc_en: 'Constituency residents willing to commute daily to Bidkin Industrial Area.',
      icon: MapPin,
      count: candidates.filter(c => c.willing_to_commute === true).length,
      action: () => handleExportFiltered(c => c.willing_to_commute === true, 'local-commuters-bidkin'),
      color: 'bg-teal-600 text-white',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          {language === 'mr' ? 'उमेदवार अहवाल व एक्सेल / सीएसव्ही निर्यात' : 'Candidate Reports & Unicode Data Export'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {language === 'mr' ? 'कंपनी समन्वय आणि भरती मोहिमेसाठी तयार केलेले पूर्वनिर्धारित अहवाल' : 'Ready-to-export reports formatted for spreadsheet analysis with full Devanagari Unicode support.'}
        </p>
      </div>

      {/* Preset Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportPresets.map((preset, idx) => {
          const Icon = preset.icon;
          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-lg ${preset.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-full">
                    {preset.count} {language === 'mr' ? 'उमेदवार' : 'Records'}
                  </span>
                </div>
                <h3 className="font-bold text-base text-navy-900">
                  {language === 'mr' ? preset.title_mr : preset.title_en}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'mr' ? preset.desc_mr : preset.desc_en}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={preset.action}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-navy-800 border border-slate-300 font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'CSV मध्ये डाऊनलोड करा' : 'Download CSV (Excel)'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        <h2 className="text-lg font-bold text-navy-900">
          {language === 'mr' ? 'उमेदवार माहितीचे आलेखी विश्लेषण' : 'Graphical Data Breakdown'}
        </h2>
        <AnalyticsCharts candidates={candidates} />
      </div>

    </div>
  );
};
