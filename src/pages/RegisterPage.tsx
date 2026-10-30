import React from 'react';
import { RegistrationWizard } from '../components/registration/RegistrationWizard';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-100 min-h-screen py-10 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-4xl mx-auto px-4 mb-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/90 shadow-2xs backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-saffron-600" />
            <span className="text-xs font-bold text-saffron-700 uppercase tracking-widest">
              {language === 'mr' ? 'अधिकृत उमेदवारी नोंदणी' : 'Official Candidate Registration'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 tracking-tight">
            {language === 'mr' ? 'डीएमआयसी बिडकीन रोजगार नोंदणी अर्ज' : 'DMIC Bidkin Employment Registration Form'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            {language === 'mr'
              ? 'कृपया सर्व माहिती अचूक भरा. आवश्यक त्या ठिकाणी एकापेक्षा जास्त पर्याय निवडता येतील.'
              : 'Please enter accurate information. Multi-select options are available for skills and roles.'}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <RegistrationWizard />
      </div>
    </div>
  );
};

