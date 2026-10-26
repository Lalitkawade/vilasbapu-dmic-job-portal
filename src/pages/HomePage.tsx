import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Briefcase, 
  UserCheck, 
  FileCheck2, 
  Building2, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  Cpu,
  Factory
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();

  const officeName = language === 'mr' 
    ? (import.meta.env.VITE_OFFICE_NAME_MR || 'आमदार विलास भुमरे यांचे कार्यालय')
    : (import.meta.env.VITE_OFFICE_NAME_EN || 'MLA Vilas Bhumare Office');

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-white py-16 sm:py-24 px-4 sm:px-8 border-b border-navy-700">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f4732a_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-navy-800/90 border border-saffron-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-saffron-300 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-saffron-400 animate-pulse" />
            <span>{language === 'mr' ? 'विलास संदिपान भुमरे यांच्या संकल्पनेतून' : 'Conceived under the Vision of Vilas Sandipan Bhumare'}</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-200 font-medium">{officeName}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t('heroHeadline')}
          </h1>

          {/* English Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-saffron-500/30 transition flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <UserCheck className="w-5 h-5" />
              <span>{t('registerNow')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/faq"
              className="bg-navy-700/60 hover:bg-navy-700 text-slate-200 border border-slate-600 font-semibold text-base px-6 py-3.5 rounded-xl transition flex items-center gap-2"
            >
              <HelpCircle className="w-5 h-5 text-saffron-400" />
              <span>{t('knowMore')}</span>
            </Link>
          </div>

          {/* Scope notice pills */}
          <div className="pt-8 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-navy-800/80 px-3 py-1 rounded-full border border-navy-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'mr' ? 'रोजंदारी व हेल्पर पासून इंजिनिअर व व्यवस्थापक' : 'Casual Labour to Senior Engineers'}
            </span>
            <span className="flex items-center gap-1.5 bg-navy-800/80 px-3 py-1 rounded-full border border-navy-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'mr' ? '२२+ उद्योग विभाग व तांत्रिक कौशल्ये' : '22+ Industrial Sectors'}
            </span>
            <span className="flex items-center gap-1.5 bg-navy-800/80 px-3 py-1 rounded-full border border-navy-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'mr' ? 'पूर्णतः मोफत व सुरक्षित नोंदणी' : '100% Free & Transparent'}
            </span>
          </div>
        </div>

        {/* Subtle, unhighlighted developer attribution at side corner of hero */}
        <div className="absolute bottom-2 right-3 sm:right-6 z-10 opacity-50 hover:opacity-90 transition-opacity">
          <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5 font-normal tracking-wide">
            <span>Design & Develop by</span>
            <span className="text-slate-300 font-medium">Lalit Kawade</span>
            <span className="text-slate-600">•</span>
            <a 
              href="tel:9270138287" 
              className="text-slate-400 hover:text-slate-200 transition"
              title="Contact: 9270138287"
            >
              9270138287
            </a>
          </div>
        </div>
      </section>

      {/* OBJECTIVES & SCOPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
            {language === 'mr' ? 'या नोंदणी उपक्रमाचा मुख्य उद्देश' : 'Objectives of Candidate Mapping'}
          </h2>
          <p className="text-sm text-slate-600">
            {language === 'mr'
              ? 'बिडकीन औद्योगिक क्षेत्रातील (AURIC) भविष्यातील रोजगाराच्या संधी स्थानिक तरुणांपर्यंत पोहोचवणे.'
              : 'Empowering local constituency candidates by cataloguing technical and vocational skills for emerging industries.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated transition space-y-3">
            <div className="w-12 h-12 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center">
              <Factory className="w-6 h-6 text-saffron-500" />
            </div>
            <h3 className="font-bold text-base text-navy-900">
              {language === 'mr' ? '१. सर्वसमावेशक संधी' : '1. Inclusive Across All Levels'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'रोजंदारी कामगार, हेल्पर, ऑपरेटर, फिटर, वेल्डर यांच्यापासून ते मेकॅनिकल, इलेक्ट्रिकल इंजिनिअर, सुपरवायझर व मॅनेजर पदांपर्यंत सर्वांसाठी एकाच ठिकाणी नोंदणी.'
                : 'Catering to casual labourers, machine operators, electricians, ITI trades, senior engineers, and department managers alike.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated transition space-y-3">
            <div className="w-12 h-12 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-saffron-500" />
            </div>
            <h3 className="font-bold text-base text-navy-900">
              {language === 'mr' ? '२. अचूक कौशल्य मॅपिंग' : '2. Structured Skill Profiling'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'CNC, VMC, टॅली, वेल्डिंग, ऑटोमेशन, फोर्कलिफ्ट, गुणवत्ता तपासणी अशा १००+ कौशल्यांची नोंदणी जेणेकरून कंपनीच्या गरजेनुसार अचूक उमेदवार संपर्क साधता येईल.'
                : 'Categorizing over 100+ technical, mechanical, electrical, and computer proficiencies for precision employer coordination.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated transition space-y-3">
            <div className="w-12 h-12 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-saffron-500" />
            </div>
            <h3 className="font-bold text-base text-navy-900">
              {language === 'mr' ? '३. डेटा सुरक्षितता व पारदर्शकता' : '3. Strict Privacy & Security'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'उमेदवारांचा डेटा गोपनीय ठेवला जातो. आधार नंबर, बँक माहिती यांसारखी अनावश्यक माहिती मागितली जात नाही आणि डेटा अनधिकृतपणे सार्वजनिक केला जात नाही.'
                : 'Strict privacy controls. No unnecessary sensitive data like Aadhaar or bank details is collected. Resumes are stored privately.'}
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-saffron-600 uppercase tracking-widest">
              {language === 'mr' ? 'सुलभ नोंदणी पद्धत' : 'Simple Registration Process'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              {language === 'mr' ? '३ सोप्या पायऱ्यांमध्ये नोंदणी करा' : 'Register in 3 Straightforward Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-saffron-500 text-white font-bold flex items-center justify-center mx-auto text-sm">
                १
              </div>
              <h3 className="font-bold text-sm text-navy-900">
                {language === 'mr' ? 'वैयक्तिक व शैक्षणिक माहिती भरा' : 'Fill Personal & Education Details'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'mr'
                  ? 'आपले नाव, मोबाईल नंबर, गाव, सर्वोच्च शिक्षण व ट्रेड निवडा.'
                  : 'Enter your basic contact info, constituency village, and highest qualification.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-navy-800 text-white font-bold flex items-center justify-center mx-auto text-sm">
                २
              </div>
              <h3 className="font-bold text-sm text-navy-900">
                {language === 'mr' ? 'कौशल्ये व आवडीची पदे निवडा' : 'Select Skills & Preferred Job Roles'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'mr'
                  ? 'आपल्याकडे असणारी कौशल्ये, अनुभव आणि कामाचे आवडीचे क्षेत्र निवडा.'
                  : 'Select your technical skills, work experience band, and preferred industries.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                ३
              </div>
              <h3 className="font-bold text-sm text-navy-900">
                {language === 'mr' ? 'नोंदणी क्रमांक मिळवा' : 'Receive Unique Registration Reference'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'mr'
                  ? 'नोंदणी सबमिट करताच आपल्याला DMIC संदर्भ क्रमांक मिळेल.'
                  : 'Get an instant registration reference number to track your submission.'}
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow transition"
            >
              <span>{t('registerNow')}</span>
              <ArrowRight className="w-4 h-4 text-saffron-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* IMPORTANT TRANSPARENCY NOTICE */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-6 bg-amber-50 border-l-4 border-saffron-500 rounded-r-xl space-y-2">
          <h4 className="font-bold text-sm text-navy-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-saffron-600" />
            <span>{language === 'mr' ? 'पारदर्शकता आणि महत्त्वाचा खुलासा' : 'Transparency & Public Clarification'}</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            {language === 'mr'
              ? 'हे पोर्टल आमदार विलास भुमरे यांच्या कार्यालयातर्फे बिडकीन व परिसरातील होतकरू उमेदवारांची रोजगार-इच्छा नोंदणी संकलित करण्यासाठी चालवले जात आहे. हा सरकारी मालकीचा उपक्रम किंवा थेट नोकरीचा करार नाही. औद्योगिक विकासानुसार कंपन्यांना गरजेनुसार स्थानिक कुशल उमेदवारांची माहिती उपलब्ध करून देण्यास साहाय्य करणे हा यामागचा प्रामाणिक उद्देश आहे.'
              : 'This portal is run by the office of MLA Vilas Bhumare to map talent and employment preferences across Bidkin and surrounding constituency areas. It does not represent an unsupported claim of government ownership nor does it offer guaranteed employment contracts.'}
          </p>
        </div>
      </section>

    </div>
  );
};
