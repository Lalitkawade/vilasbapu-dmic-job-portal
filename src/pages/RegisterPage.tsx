import React from 'react';
import { RegistrationWizard } from '../components/registration/RegistrationWizard';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-widest flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अधिकृत उमेदवारी नोंदणी' : 'Official Candidate Registration'}</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            {language === 'mr' ? 'डीएमआयसी बिडकीन रोजगार नोंदणी अर्ज' : 'DMIC Bidkin Employment Registration Form'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            {language === 'mr'
              ? 'कृपया सर्व माहिती अचूक भरा. आवश्यक त्या ठिकाणी एकापेक्षा जास्त पर्याय निवडता येतील.'
              : 'Please enter accurate information. Multi-select options are available for skills and roles.'}
          </p>
        </div>
      </div>

      <RegistrationWizard />
    </div>
  );
};
