import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, EyeOff, UserCheck, FileText, Mail, MapPin } from 'lucide-react';

export const PrivacyNoticePage: React.FC = () => {
  const { language } = useLanguage();

  const officeName = language === 'mr'
    ? (import.meta.env.VITE_OFFICE_NAME_MR || 'आमदार विलास भुमरे यांचे कार्यालय')
    : (import.meta.env.VITE_OFFICE_NAME_EN || 'MLA Vilas Bhumare Office');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* Title */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-600 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'mr' ? 'डेटा संरक्षण व गोपनीयता' : 'Data Protection & Privacy'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-navy-900">
          {language === 'mr' ? 'गोपनीयता धोरण आणि डेटा संरक्षण सूचना' : 'Privacy Notice and Data Governance Policy'}
        </h1>
        <p className="text-xs text-slate-500">
          {language === 'mr' ? 'आवृत्ती १.० (अद्यतन: मार्च २०२६)' : 'Version 1.0 (Updated: March 2026)'}
        </p>
      </div>

      {/* Main Privacy Content */}
      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">

        {/* Core Consent Statement */}
        <div className="p-5 bg-navy-50/70 border border-navy-200 rounded-xl space-y-2">
          <h2 className="font-bold text-navy-900 text-base">
            {language === 'mr' ? '१. अधिकृत संमती विधान (Core Consent Statement)' : '1. Core Voluntary Consent Statement'}
          </h2>
          <p className="italic text-slate-800">
            {language === 'mr' ? (
              `"मी स्वेच्छेने माझी माहिती रोजगार-इच्छा नोंदणी आणि संबंधित रोजगार साहाय्यासाठी प्रदान करत आहे. अधिकृत कार्यालयीन प्रतिनिधींनी माझ्या माहितीवर प्रक्रिया करण्यास आणि संबंधित रोजगाराच्या संधींविषयी माझ्याशी संपर्क साधण्यास मी संमती देतो. मला पूर्ण जाणीव आहे की ही नोंदणी म्हणजे मुलाखत, नोकरी किंवा नियुक्तीची कोणतीही हमी नाही. माझी वैयक्तिक माहिती केवळ अधिकृत कर्मचाऱ्यांकडूनच पाहिली जाईल, आवश्यक कालावधीसाठीच ठेवली जाईल आणि ती सार्वजनिक केली जाणार नाही. मी माझ्या माहितीबद्दल विचारणा करण्यासाठी किंवा दुरुस्ती/हटवण्याची विनंती करण्यासाठी नियुक्त कार्यालयाशी संपर्क साधू शकतो."`
            ) : (
              `"I voluntarily provide my information for employment-interest registration and related employment assistance. I consent to the authorized office processing my information for candidate management and contacting me regarding relevant employment opportunities. I understand that registration does not guarantee an interview, job offer, or placement. My personal information should be accessed only by authorized personnel, retained only as necessary, and not made publicly available. I may contact the designated office contact to ask about my information or request correction or deletion, subject to applicable legal obligations."`
            )}
          </p>
        </div>

        {/* Section 2: Purpose */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-saffron-500" />
            <span>{language === 'mr' ? '२. माहिती गोळा करण्याचा उद्देश (Purpose of Collection)' : '2. Purpose of Data Collection'}</span>
          </h2>
          <p>
            {language === 'mr'
              ? 'हे पोर्टल डीएमआयसी बिडकीन आणि छत्रपती संभाजीनगर परिसरातील औद्योगिक प्रकल्पांच्या पार्श्वभूमीवर स्थानिक उमेदवारांचे कौशल्य मॅपिंग करण्यासाठी तयार केले गेले आहे. संकलित माहितीचा वापर खालील उद्दिष्टांसाठी केला जातो:'
              : 'This portal is designed to catalogue and map local candidates in the Bidkin and surrounding constituency region for upcoming industrial opportunities. Data is utilized strictly for:'}
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li>{language === 'mr' ? 'उमेदवारांची कौशल्ये व शैक्षणिक पात्रतेनुसार योग्य रोजगार प्रवर्गात वर्गीकरण करणे.' : 'Categorizing candidate qualifications, technical skills, and employment level preferences.'}</li>
            <li>{language === 'mr' ? 'भावी औद्योगिक भरती मोहिमांमध्ये संबंधित उमेदवारांना माहिती देणे.' : 'Communicating verified updates regarding local recruitment drives and matching vacancies.'}</li>
            <li>{language === 'mr' ? 'मतदारसंघातील कौशल्य विकासासाठी आवश्यक असणाऱ्या प्रशिक्षण योजनांचे नियोजन करणे.' : 'Assessing constituency-level skill gaps to organize relevant vocational training initiatives.'}</li>
          </ul>
        </div>

        {/* Section 3: Data Security */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-saffron-500" />
            <span>{language === 'mr' ? '३. माहितीचे संरक्षण आणि सुरक्षा उपाय' : '3. Technical Data Security Safeguards'}</span>
          </h2>
          <p>
            {language === 'mr'
              ? 'आम्ही उमेदवारांच्या गोपनीयतेचा आदर करतो. यासाठी पुढील तांत्रिक सुरक्षा उपाययोजना अंमलात आणण्यात आल्या आहेत:'
              : 'We implement modern architectural safeguards to protect candidate records:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
              <h4 className="font-bold text-navy-800 text-xs">
                {language === 'mr' ? 'रो-लेव्हल सिक्युरिटी (Row Level Security)' : 'Row Level Security (RLS)'}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'mr'
                  ? 'सर्व डेटाबेस टेबल्सवर कडक RLS धोरणे लागू आहेत. सर्वसामान्य वापरकर्त्यांना उमेदवारांची माहिती वाचण्याची परवानगी नाही.'
                  : 'Candidate records cannot be read by public visitors. Strict RLS ensures only authenticated office administrators have access.'}
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
              <h4 className="font-bold text-navy-800 text-xs">
                {language === 'mr' ? 'गोपनीय रेझ्युमे स्टोरेज (Private Resumes)' : 'Private Resume Storage'}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'mr'
                  ? 'उमेदवारांनी अपलोड केलेले रेझ्युमे खाजगी सुरक्षित बकेटमध्ये साठवले जातात आणि त्यांची थेट सार्वजनिक लिंक उपलब्ध नसते.'
                  : 'Uploaded resumes are stored in private storage buckets without public URLs, accessible only to authenticated office staff.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: What We Do NOT Collect */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-saffron-500" />
            <span>{language === 'mr' ? '४. आम्ही काय गोळा करत नाही? (Minimization)' : '4. Uncollected Sensitive Data'}</span>
          </h2>
          <p className="text-xs sm:text-sm">
            {language === 'mr'
              ? 'उमेदवारांच्या सुरक्षेसाठी आम्ही आधार कार्ड नंबर, बँक खात्याचे तपशील, पासवर्ड, जात किंवा इतर अनावश्यक खाजगी माहिती विचारत नाही.'
              : 'To adhere strictly to data minimization principles, we do NOT collect Aadhaar numbers, bank account credentials, passwords, or unrelated private financial data.'}
          </p>
        </div>

        {/* Section 5: Rights & Contact */}
        <div className="p-5 bg-slate-100 rounded-xl space-y-3">
          <h3 className="font-bold text-navy-900 text-sm">
            {language === 'mr' ? '५. उमेदवारांचे हक्क व संपर्क' : '5. Candidate Rights and Contact Information'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'mr'
              ? 'कोणत्याही उमेदवाराला आपली नोंदवलेली माहिती दुरुस्त करायची असल्यास किंवा पोर्टलवरून हटवायची असल्यास, आपण अधिकृत कार्यालयाशी संपर्क साधू शकता:'
              : 'Any candidate wishing to review, correct, or request deletion of their submitted employment-interest registration may contact the constituency office:'}
          </p>
          <div className="text-xs text-slate-800 font-semibold space-y-1">
            <p>Email: </p>
            <p>Phone: +91 240 2345678</p>
            <p>Office: {officeName}, Bidkin - Paithan Road, Chhatrapati Sambhajinagar</p>
          </div>
        </div>

      </div>
    </div>
  );
};
