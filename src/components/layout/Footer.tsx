import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const officeName = language === 'mr'
    ? (import.meta.env.VITE_OFFICE_NAME_MR || 'आमदार विलास भुमरे यांचे कार्यालय')
    : (import.meta.env.VITE_OFFICE_NAME_EN || 'MLA Vilas Bhumare Office');

  const officeAddress = language === 'mr'
    ? (import.meta.env.VITE_OFFICE_ADDRESS_MR || 'बिडकीन जनसंपर्क कार्यालय, पैठण रोड, छत्रपती संभाजीनगर, महाराष्ट्र ४३११०५')
    : (import.meta.env.VITE_OFFICE_ADDRESS_EN || 'Bidkin Public Liaison Office, Paithan Road, Chhatrapati Sambhajinagar, Maharashtra 431105');

  const phone = import.meta.env.VITE_CONTACT_PHONE || '+91 240 2345678';
  const email = import.meta.env.VITE_CONTACT_EMAIL || '';

  return (
    <footer className="bg-navy-950 text-slate-300 text-sm mt-auto border-t border-navy-900">
      {/* Important Disclaimer Banner */}
      <div className="bg-navy-900/60 border-b border-navy-800 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-start gap-2.5 text-xs text-slate-300">
          <AlertCircle className="w-4 h-4 text-saffron-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'mr' ? (
              <span>
                <strong>अधिकृत सूचना:</strong> हे पोर्टल बिडकीन व पैठण परिसरातील उमेदवारांच्या कौशल्यांची व रोजगाराच्या पसंतीची माहिती संकलित करण्यासाठी आमदार विलास भुमरे यांच्या कार्यालयाचा एक उपक्रम आहे. ही केवळ रोजगार-इच्छुक उमेदवारांची माहिती संकलन प्रणाली असून, यामुळे थेट नोकरीची किंवा नियुक्तीची कोणतीही हमी दिली जात नाही.
              </span>
            ) : (
              <span>
                <strong>Official Notice:</strong> This portal is an employment-interest registration initiative by the office of MLA Vilas Bhumare to collect structured candidate data across the Bidkin and surrounding constituency areas. Registration expresses candidate interest and does not constitute a guaranteed job offer or direct recruitment contract.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1: Initiative info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-saffron-400/80 shadow-xs flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="/dmic-logo.png" 
                alt="DMIC Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/DMIC Logo.png';
                }}
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-saffron-400 block leading-tight">
                {language === 'mr' ? 'विलास संदिपान भुमरे यांच्या संकल्पनेतून' : 'Conceived by Vilas Sandipan Bhumare'}
              </span>
              <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{officeName}</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            {language === 'mr'
              ? 'बिडकीन औद्योगिक क्षेत्रातील (DMIC AURIC) भावी औद्योगिक संधींसाठी स्थानिक युवकांच्या कौशल्यांची नोंदणी व साहाय्य.'
              : 'Skill mapping and candidate interest collection for emerging industrial opportunities in the DMIC Bidkin AURIC belt.'}
          </p>
          <div className="text-xs text-slate-400">
            <span>© {new Date().getFullYear()} {officeName}. All rights reserved.</span>
          </div>
        </div>

        {/* Col 2: Office Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider text-saffron-400">
            {language === 'mr' ? 'कार्यालयीन संपर्क' : 'Constituency Office Contact'}
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-saffron-400 shrink-0 mt-0.5" />
              <span>{officeAddress}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-saffron-400 shrink-0" />
              <span>{phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-saffron-400 shrink-0" />
              <span>{email}</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Useful Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider text-saffron-400">
            {language === 'mr' ? 'महत्त्वाचे दुवे' : 'Important Links'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/register" className="hover:text-white transition flex items-center gap-1.5">
                <span className="text-saffron-500">›</span>
                <span>{t('navRegister')}</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition flex items-center gap-1.5">
                <span className="text-saffron-500">›</span>
                <span>{t('navPrivacy')}</span>
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition flex items-center gap-1.5">
                <span className="text-saffron-500">›</span>
                <span>{t('navFaq')}</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition flex items-center gap-1.5">
                <span className="text-saffron-500">›</span>
                <span>{t('navContact')}</span>
              </Link>
            </li>
            <li className="pt-2 border-t border-navy-900">
              <Link to="/admin/login" className="text-slate-400 hover:text-slate-200 transition flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-saffron-400" />
                <span>{t('navAdmin')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Developer Attribution */}
      <div className="border-t border-navy-900 bg-navy-950 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {officeName}. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-300 flex items-center gap-1.5 font-normal transition-all duration-200 group cursor-default">
            <span className="text-slate-300 group-hover:text-slate-100 transition-colors">Design & Develop by</span>
            <span className="text-white font-semibold tracking-wide group-hover:text-saffron-300 transition-colors drop-shadow-xs">
              Lalit Kawade
            </span>
            <span className="text-slate-400 group-hover:text-slate-200 transition-colors">•</span>
            <a 
              href="tel:9270138287" 
              className="text-slate-200 font-semibold group-hover:text-saffron-400 transition-colors hover:underline tracking-wider"
              title="Contact: 9270138287"
            >
              9270138287
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
