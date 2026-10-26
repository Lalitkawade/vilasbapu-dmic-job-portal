import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q_mr: 'हे पोर्टल काय आहे आणि याचा मुख्य हेतू काय?',
      q_en: 'What is this portal and what is its primary purpose?',
      a_mr: 'हे पोर्टल आमदार विलास भुमरे यांच्या कार्यालयाचा एक अधिकृत उपक्रम आहे. बिडकीन आणि परिसरातील उमेदवारांची शैक्षणिक पात्रता, तांत्रिक कौशल्ये आणि नोकरीच्या पसंतीची माहिती एकाच ठिकाणी संकलित करून, डीएमआयसी परिसरातील भावी औद्योगिक संधींशी स्थानिक उमेदवारांची सांगड घालणे हा यामागचा मुख्य उद्देश आहे.',
      a_en: 'This portal is an official candidate-mapping initiative by the office of MLA Vilas Bhumare. Its purpose is to collect structured skills and employment preferences from candidates across Bidkin and surrounding constituency areas to coordinate with emerging industrial opportunities in the DMIC region.'
    },
    {
      q_mr: 'या नोंदणीमुळे नोकरीची हमी मिळते का?',
      q_en: 'Does registration guarantee job placement or an interview?',
      a_mr: 'नाही. ही केवळ उमेदवारांच्या कौशल्यांची व नोकरीच्या इच्छेची नोंदणी (Expression of Interest) आहे. यामुळे कोणत्याही प्रकारची नोकरीची थेट हमी किंवा नियुक्तीपत्र मिळत नाही. कंपन्यांच्या पात्रतेनुसार संधी निर्माण झाल्यास कार्यालयाकडून उमेदवारांशी संपर्क साधला जाईल.',
      a_en: 'No. This is strictly an employment-interest registration platform to catalogue candidate skills. Registration does not constitute a job contract, guaranteed interview, or immediate placement.'
    },
    {
      q_mr: 'कोणत्या पदांसाठी उमेदवार नोंदणी करू शकतात?',
      q_en: 'Who is eligible to register on this portal?',
      a_mr: 'हे पोर्टल सर्व प्रवर्गातील उमेदवारांसाठी खुले आहे: रोजंदारी कामगार, हेल्पर, ऑपरेटर, फिटर, वेल्डर, आयटीआय उत्तीर्ण, डिप्लोमाधारक, पदवीधर, इंजिनिअर, सुपरवायझर तसेच व्यवस्थापकीय पदांपर्यंतचे सर्व उमेदवार नोंदणी करू शकतात.',
      a_en: 'Candidates across all skill levels can register: from casual workers, helpers, and operators to ITI technicians, diploma holders, graduates, engineers, shift in-charges, and management professionals.'
    },
    {
      q_mr: 'नोंदणीसाठी काही शुल्क (फी) आहे का?',
      q_en: 'Is there any fee or charge for registration?',
      a_mr: 'नाही! ही नोंदणी पूर्णपणे मोफत आहे. कोणत्याही एजंटला किंवा व्यक्तीला पैसे देऊ नका.',
      a_en: 'No! Registration is completely free of charge. Do not pay any money or fee to any third-party or agent.'
    },
    {
      q_mr: 'ईमेल आयडी असणे अनिवार्य आहे का?',
      q_en: 'Is an email address mandatory for registration?',
      a_mr: 'नाही. ग्रामीण भागातील अनेक उमेदवारांकडे ईमेल नसल्याने ईमेल अनिवार्य ठेवलेला नाही. केवळ आपला चालू असलेला १०-अंकी मोबाईल नंबर पुरेसा आहे.',
      a_en: 'No. An email address is not required. A valid, working 10-digit Indian mobile number is sufficient to register.'
    },
    {
      q_mr: 'बायोडेटा (Resume) नसल्यास नोंदणी करता येईल का?',
      q_en: 'Can I register without uploading a resume / biodata?',
      a_mr: 'होय, नक्कीच! रेझ्युमे अपलोड करणे पूर्णपणे ऐच्छिक आहे. आपल्याकडे तयार फाईल असल्यास जोडू शकता, नसल्यास तो रकाना रिकामा ठेवून नोंदणी पूर्ण करू शकता.',
      a_en: 'Yes. Resume upload is completely optional. If you have a prepared PDF or Word resume you may upload it; otherwise, you can register without one.'
    },
    {
      q_mr: 'नोंदणी केल्यानंतर पुढील प्रक्रिया काय असेल?',
      q_en: 'What happens after I submit my registration?',
      a_mr: 'नोंदणी सबमिट करताच आपल्याला एक युनिक संदर्भ क्रमांक (उदा. DMIC-2026-XXXXXX) मिळेल. हा क्रमांक जपून ठेवावा. जेव्हा डीएमआयसी कंपन्यांमध्ये आपल्या पात्रतेनुसार जागा उपलब्ध होतील, तेव्हा कार्यालयाकडून आपल्याला मोबाईलवर संपर्क केला जाईल.',
      a_en: 'Upon submission, you will receive a unique Registration Reference ID (e.g. DMIC-2026-XXXXXX). Save this reference. As industrial vacancies aligning with your skills arise, representatives will reach out directly.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-600 uppercase tracking-widest">
          <HelpCircle className="w-4 h-4" />
          <span>{language === 'mr' ? 'उमेदवारांच्या शंका व उत्तरे' : 'Frequently Asked Questions'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          {language === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          {language === 'mr' 
            ? 'डीएमआयसी बिडकीन रोजगार नोंदणी प्रक्रियेशी संबंधित महत्त्वाच्या प्रश्नांची उत्तरे.'
            : 'Clear answers regarding the DMIC Bidkin candidate mapping initiative.'}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const qText = language === 'mr' ? faq.q_mr : faq.q_en;
          const aText = language === 'mr' ? faq.a_mr : faq.a_en;

          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 hover:bg-slate-50 transition"
              >
                <span className="font-bold text-sm sm:text-base text-navy-900 leading-snug">
                  {qText}
                </span>
                <span className="text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-saffron-500" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {aText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
