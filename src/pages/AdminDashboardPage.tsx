import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchAllCandidates } from '../lib/supabase';
import { CandidateProfile } from '../types/candidate';
import { 
  Users, 
  Sparkles, 
  Briefcase, 
  Clock, 
  FileSpreadsheet, 
  GraduationCap, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { AnalyticsCharts } from '../components/admin/AnalyticsCharts';

export const AdminDashboardPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadCandidates = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllCandidates();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  // Compute metrics from genuine database records
  const totalCount = candidates.length;
  const freshersCount = candidates.filter(c => c.experience_category === 'fresher').length;
  const experiencedCount = candidates.filter(c => c.experience_category === 'experienced' || c.experience_category === 'apprentice').length;
  const immediateCount = candidates.filter(c => c.joining_availability_id === 'immediately').length;
  const willingCommuteCount = candidates.filter(c => c.willing_to_commute === true).length;

  const recentCandidates = candidates.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome & Actions Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {language === 'mr' ? 'प्रशासकीय नियंत्रण कक्ष (Dashboard)' : 'Administrative Dashboard'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {language === 'mr' ? 'डीएमआयसी बिडकीन रोजगार नोंदणी पोर्टल विश्लेषण' : 'Real-time candidate statistics & constituency talent insights'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadCandidates}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{language === 'mr' ? 'ताजे करा' : 'Refresh'}</span>
          </button>

          <Link
            to="/admin/candidates"
            className="flex items-center gap-1.5 text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            <Users className="w-3.5 h-3.5 text-saffron-400" />
            <span>{t('candidateDirectory')}</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Candidates */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t('totalCandidates')}
            </span>
            <span className="text-3xl font-extrabold text-navy-900 mt-1 block">
              {totalCount}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{language === 'mr' ? 'थेट डेटाबेसमधून मोजणी' : 'Calculated from DB'}</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center">
            <Users className="w-6 h-6 text-navy-700" />
          </div>
        </div>

        {/* Freshers */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t('freshersCount')}
            </span>
            <span className="text-3xl font-extrabold text-navy-900 mt-1 block">
              {freshersCount}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              {totalCount > 0 ? Math.round((freshersCount / totalCount) * 100) : 0}% {language === 'mr' ? 'एकूण पैकी' : 'of total'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-saffron-50 text-saffron-800 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-saffron-600" />
          </div>
        </div>

        {/* Experienced */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t('experiencedCount')}
            </span>
            <span className="text-3xl font-extrabold text-navy-900 mt-1 block">
              {experiencedCount}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              {totalCount > 0 ? Math.round((experiencedCount / totalCount) * 100) : 0}% {language === 'mr' ? 'एकूण पैकी' : 'of total'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Immediate Available */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t('immediateAvailable')}
            </span>
            <span className="text-3xl font-extrabold text-navy-900 mt-1 block">
              {immediateCount}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              {language === 'mr' ? 'आजच रुजू होऊ शकतात' : 'Ready to join immediately'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Component */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-navy-900">
            {language === 'mr' ? 'तपशीलवार उमेदवार विश्लेषण' : 'Constituency Analytics & Distributions'}
          </h2>
          <Link to="/admin/reports" className="text-xs font-semibold text-navy-800 hover:underline flex items-center gap-1">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अहवाल पहा' : 'View Full Reports'}</span>
          </Link>
        </div>
        <AnalyticsCharts candidates={candidates} />
      </div>

      {/* Recently Registered Candidates Quick List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-bold text-base text-navy-900">
            {language === 'mr' ? 'नुकतीच झालेली नोंदणी (Recent Candidates)' : 'Recently Registered Candidates'}
          </h2>
          <Link
            to="/admin/candidates"
            className="text-xs font-semibold text-saffron-600 hover:text-saffron-700 flex items-center gap-1"
          >
            <span>{language === 'mr' ? 'सर्व पहा' : 'View All'}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentCandidates.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            {language === 'mr' ? 'अद्याप नोंदणी झालेली नाही.' : 'No candidate registrations yet.'}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentCandidates.map(c => (
              <div key={c.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{c.full_name}</span>
                  <div className="flex items-center gap-3 text-slate-500 mt-0.5">
                    <span className="font-mono text-navy-800 font-semibold">{c.registration_number}</span>
                    <span>•</span>
                    <span>{c.village}, {c.taluka}</span>
                    <span>•</span>
                    <span>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium text-[11px] capitalize">
                    {c.experience_category}
                  </span>
                  <Link
                    to={`/admin/candidates?id=${c.registration_number}`}
                    className="text-xs font-semibold text-navy-800 hover:text-navy-900 underline"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
