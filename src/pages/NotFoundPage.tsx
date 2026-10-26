import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-saffron-50 text-saffron-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-slate-800">
          {language === 'mr' ? 'पृष्ठ सापडले नाही' : 'Page Not Found'}
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {language === 'mr'
            ? 'आपण शोधत असलेले पृष्ठ अस्तित्वात नाही किंवा ते हलवण्यात आले आहे.'
            : 'The requested web address does not exist or has been relocated.'}
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठावर जा' : 'Return to Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
