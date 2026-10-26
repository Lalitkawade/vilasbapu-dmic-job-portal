import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  Home, 
  AlertCircle, 
  Phone, 
  MapPin, 
  User, 
  ShieldCheck 
} from 'lucide-react';

export const RegistrationSuccessPage: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const state = location.state as {
    registration_number?: string;
    candidate_name?: string;
    mobile_number?: string;
    village?: string;
    is_duplicate?: boolean;
  } | undefined;

  const [copied, setCopied] = useState(false);

  // If accessed directly without state, redirect to home
  if (!state?.registration_number) {
    return <Navigate to="/" replace />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(state.registration_number || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
        
        {/* Success Header */}
        <div className="bg-emerald-600 text-white p-6 sm:p-8 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('regSuccessTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-sm mx-auto">
            {t('regSuccessSubtitle')}
          </p>
        </div>

        {/* Reference Number Card */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-5 bg-navy-50/70 border-2 border-dashed border-navy-300 rounded-xl text-center space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t('regNumberLabel')}
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-wider block">
              {state.registration_number}
            </span>
            <div className="pt-2 flex justify-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-navy-800 px-3 py-1.5 rounded-lg shadow-2xs transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('copied') : t('copyRegNumber')}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-navy-800 px-3 py-1.5 rounded-lg shadow-2xs transition no-print"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>{t('printReceipt')}</span>
              </button>
            </div>
          </div>

          {/* Candidate Summary Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">{t('fullName')}:</span>
              <span className="font-bold text-slate-900">{state.candidate_name}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">{t('mobileNumber')}:</span>
              <span className="font-bold text-slate-900">{state.mobile_number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">{t('village')}:</span>
              <span className="font-bold text-slate-900">{state.village}</span>
            </div>
          </div>

          {/* Important Notice */}
          <div className="p-4 bg-amber-50/80 border-l-4 border-saffron-500 rounded-r-lg space-y-1.5 text-xs">
            <h3 className="font-bold text-navy-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-saffron-600 shrink-0" />
              <span>{t('importantNoticeHeading')}</span>
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {t('importantNoticeBody')}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 text-center no-print">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-navy-800 hover:text-navy-900 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-lg transition"
            >
              <Home className="w-4 h-4" />
              <span>{t('homeReturn')}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
