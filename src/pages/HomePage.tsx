import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Briefcase, 
  UserCheck, 
  Building2, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  MapPin,
  Cpu,
  Factory,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();

  const officeName = language === 'mr' 
    ? (import.meta.env.VITE_OFFICE_NAME_MR || 'आमदार विलास भुमरे यांचे कार्यालय')
    : (import.meta.env.VITE_OFFICE_NAME_EN || 'MLA Vilas Bhumare Office');

  // Industrial partners and major companies in DMIC AURIC (Bidkin & Shendra)
  const industrialPartners = [
    { name: 'टाटा मोटर्स', name_en: 'Tata Motors', sector: 'Automobile & EV' },
    { name: 'स्कोडा फोक्सवॅगन', name_en: 'Škoda Auto VW', sector: 'Automotive Mfg' },
    { name: 'बजाज ऑटो', name_en: 'Bajaj Auto', sector: 'Auto Assembly' },
    { name: 'पर्किन्स इंडिया', name_en: 'Perkins Engines', sector: 'Diesel Engines' },
    { name: 'कॉस्मो फर्स्ट', name_en: 'Cosmo First', sector: 'Specialty Films' },
    { name: 'धूत ट्रान्समिशन', name_en: 'Dhoot Transmission', sector: 'Wiring Harness' },
    { name: 'व्हॅरॉक इंजिनिअरिंग', name_en: 'Varroc Engineering', sector: 'Auto Lighting' },
    { name: 'एंड्युरन्स टेक्नॉलॉजीज', name_en: 'Endurance Tech', sector: 'Die Casting' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION (High-Conversion Split Layout inspired by modern Job Portals)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-[#070e1c] text-white pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-8 border-b border-navy-800/80 min-h-[580px] lg:min-h-[660px] flex items-center justify-center">
        
        {/* Full Hero Background Image (Factory Team in High Resolution) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/factory-team-hero.jpg" 
            alt="DMIC Industrial Manufacturing & Engineering Team" 
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.1]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/factory-team-hero.jpg';
            }}
          />
          {/* Centered cinematic dark gradient overlay for optimal focus & contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050c1a]/85 via-[#071328]/70 to-[#050c1a]/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,19,40,0.45)_0%,rgba(5,12,26,0.88)_100%)]"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto relative z-10 w-full text-center space-y-6 sm:space-y-8">
          
          {/* Vision Eyebrow Badge at Center */}
          <div className="inline-flex items-center gap-2.5 bg-navy-950/80 border border-saffron-500/40 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-saffron-300 shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-saffron-400 animate-ping"></span>
            <span>{language === 'mr' ? 'विलास संदिपान भुमरे यांच्या संकल्पनेतून' : 'Conceived under the Vision of Vilas Sandipan Bhumare'}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-200 font-medium">{officeName}</span>
          </div>

          {/* Main Headline at Center */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md">
              {language === 'mr' ? (
                <>
                  आपल्या कौशल्यांना <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-saffron-400 via-amber-300 to-saffron-500 bg-clip-text text-transparent">
                    रोजगाराची खरी संधी
                  </span>
                </>
              ) : (
                <>
                  Unlock Career Opportunities in <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-saffron-400 via-amber-300 to-saffron-500 bg-clip-text text-transparent">
                    DMIC Bidkin Belt
                  </span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Registration Button Directly Below at Center */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-saffron-500 via-saffron-600 to-amber-500 hover:from-saffron-600 hover:to-amber-600 active:scale-95 text-white font-extrabold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-4.5 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-saffron-500/35 transition-all transform hover:-translate-y-0.5"
            >
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t('registerNow')}</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </div>

          {/* Trust Badges / Scope Notice Pills Centered */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-300 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-navy-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-navy-700/80 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'mr' ? 'रोजंदारी व हेल्पर पासून इंजिनिअर व व्यवस्थापक' : 'Casual Labour to Senior Engineers'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-navy-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-navy-700/80 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'mr' ? '२२+ उद्योग विभाग व तांत्रिक कौशल्ये' : '22+ Industrial Sectors'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-navy-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-navy-700/80 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'mr' ? 'पूर्णतः मोफत व सुरक्षित नोंदणी' : '100% Free & Transparent'}</span>
            </span>
          </div>

        </div>

        {/* Developer Attribution at bottom corner */}
        <div className="absolute bottom-2 right-3 sm:right-6 z-10 transition-all duration-200 group cursor-default">
          <div className="text-[10px] sm:text-[11px] text-slate-300 flex items-center gap-1.5 font-normal tracking-wide bg-navy-950/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
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
      </section>


      {/* =========================================================================
          AURIC INDUSTRIAL LEADERS & PARTNERS STRIP (Inspired by Image 1 Client Bar)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-saffron-500"></span>
              <h3 className="text-xs sm:text-sm font-bold text-navy-950 uppercase tracking-wider">
                {language === 'mr' 
                  ? 'AURIC बिडकीन व शेंद्रा क्षेत्रातील आघाडीचे उद्योग व क्षेत्रे' 
                  : 'Major Industrial Sectors in DMIC AURIC Bidkin & Shendra'}
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {language === 'mr' ? '२२+ औद्योगिक क्षेत्रे समाविष्ट' : '22+ Industrial Sectors'}
            </span>
          </div>

          {/* Partner Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {industrialPartners.map((partner, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 hover:bg-navy-900 hover:text-white p-2.5 rounded-xl border border-slate-200/60 transition-all duration-300 text-center group flex flex-col justify-center items-center cursor-default"
              >
                <span className="text-xs font-bold text-navy-900 group-hover:text-white transition-colors truncate w-full">
                  {language === 'mr' ? partner.name : partner.name_en}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-saffron-300 transition-colors truncate w-full">
                  {partner.sector}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          OBJECTIVES & SCOPE (Soft Neomorphic Glassmorphism inspired by Image 2)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-bold uppercase tracking-wider border border-navy-100">
            <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
            <span>{language === 'mr' ? 'उपक्रमाची उद्दिष्टे' : 'Key Objectives'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            {language === 'mr' ? 'या नोंदणी उपक्रमाचा मुख्य उद्देश' : 'Objectives of Candidate Mapping'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {language === 'mr'
              ? 'बिडकीन औद्योगिक क्षेत्रातील (AURIC) भविष्यातील रोजगाराच्या संधी स्थानिक तरुणांपर्यंत पोहोचवणे.'
              : 'Empowering local constituency candidates by cataloguing technical and vocational skills for emerging industries.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Inclusive Levels */}
          <div className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-saffron-500/20 group-hover:scale-105 transition-transform">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-navy-950 group-hover:text-saffron-600 transition-colors">
                {language === 'mr' ? '१. सर्वसमावेशक संधी' : '1. Inclusive Across All Levels'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'mr'
                  ? 'रोजंदारी कामगार, हेल्पर, ऑपरेटर, फिटर, वेल्डर यांच्यापासून ते मेकॅनिकल, इलेक्ट्रिकल इंजिनिअर, सुपरवायझर व मॅनेजर पदांपर्यंत सर्वांसाठी एकाच ठिकाणी नोंदणी.'
                  : 'Catering to casual labourers, machine operators, electricians, ITI trades, senior engineers, and department managers alike.'}
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-saffron-600">
              <span>{language === 'mr' ? 'सर्व शैक्षणिक पातळ्यांसाठी' : 'All Qualification Levels'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Skill Profiling */}
          <div className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-navy-800 to-navy-900 text-white flex items-center justify-center shadow-md shadow-navy-900/20 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6 text-saffron-400" />
              </div>
              <h3 className="font-bold text-lg text-navy-950 group-hover:text-navy-700 transition-colors">
                {language === 'mr' ? '२. अचूक कौशल्य मॅपिंग' : '2. Structured Skill Profiling'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'mr'
                  ? 'CNC, VMC, टॅली, वेल्डिंग, ऑटोमेशन, फोर्कलिफ्ट, गुणवत्ता तपासणी अशा १००+ कौशल्यांची नोंदणी जेणेकरून कंपनीच्या गरजेनुसार अचूक उमेदवार संपर्क साधता येईल.'
                  : 'Categorizing over 100+ technical, mechanical, electrical, and computer proficiencies for precision employer coordination.'}
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-navy-800">
              <span>{language === 'mr' ? '१००+ तांत्रिक कौशल्ये' : '100+ Technical Skills'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Privacy & Security */}
          <div className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-navy-950 group-hover:text-emerald-700 transition-colors">
                {language === 'mr' ? '३. डेटा सुरक्षितता व पारदर्शकता' : '3. Strict Privacy & Security'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'mr'
                  ? 'उमेदवारांचा डेटा गोपनीय ठेवला जातो. आधार नंबर, बँक माहिती यांसारखी अनावश्यक माहिती मागितली जात नाही आणि डेटा अनधिकृतपणे सार्वजनिक केला जात नाही.'
                  : 'Strict privacy controls. No unnecessary sensitive data like Aadhaar or bank details is collected. Resumes are stored privately.'}
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>{language === 'mr' ? '१००% सुरक्षित व गोपनीय' : 'Private & Protected'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          HOW IT WORKS (Step Progression Cards inspired by Image 1 & Image 2)
         ========================================================================= */}
      <section className="bg-gradient-to-b from-slate-100/70 via-white to-slate-100/70 py-16 sm:py-24 px-4 sm:px-8 border-y border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-50 text-saffron-700 text-xs font-bold uppercase tracking-wider border border-saffron-200">
              <span>{language === 'mr' ? 'सुलभ नोंदणी पद्धत' : 'Simple Registration Process'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              {language === 'mr' ? '३ सोप्या पायऱ्यांमध्ये नोंदणी करा' : 'Register in 3 Straightforward Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-elevated transition-all duration-300 space-y-4 relative group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-saffron-500/25 group-hover:scale-105 transition-transform">
                १
              </div>
              <h3 className="font-bold text-base text-navy-950">
                {language === 'mr' ? 'वैयक्तिक व शैक्षणिक माहिती भरा' : 'Fill Personal & Education Details'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {language === 'mr'
                  ? 'आपले नाव, मोबाईल नंबर, गाव, सर्वोच्च शिक्षण व ट्रेड निवडा.'
                  : 'Enter your basic contact info, constituency village, and highest qualification.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-elevated transition-all duration-300 space-y-4 relative group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-800 to-navy-950 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-navy-900/25 group-hover:scale-105 transition-transform">
                २
              </div>
              <h3 className="font-bold text-base text-navy-950">
                {language === 'mr' ? 'कौशल्ये व आवडीची पदे निवडा' : 'Select Skills & Preferred Job Roles'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {language === 'mr'
                  ? 'आपल्याकडे असणारी कौशल्ये, अनुभव आणि कामाचे आवडीचे क्षेत्र निवडा.'
                  : 'Select your technical skills, work experience band, and preferred industries.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-elevated transition-all duration-300 space-y-4 relative group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-emerald-600/25 group-hover:scale-105 transition-transform">
                ३
              </div>
              <h3 className="font-bold text-base text-navy-950">
                {language === 'mr' ? 'नोंदणी क्रमांक मिळवा' : 'Receive Unique Registration Reference'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {language === 'mr'
                  ? 'नोंदणी सबमिट करताच आपल्याला DMIC संदर्भ क्रमांक मिळेल.'
                  : 'Get an instant registration reference number to track your submission.'}
              </p>
            </div>

          </div>

          <div className="text-center pt-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-navy-900/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>{t('registerNow')}</span>
              <ArrowRight className="w-4 h-4 text-saffron-400" />
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================================================
          IMPORTANT TRANSPARENCY NOTICE
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-7 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/50 border border-amber-200/80 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-saffron-500/15 text-saffron-700 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-navy-950">
              {language === 'mr' ? 'पारदर्शकता आणि महत्त्वाचा खुलासा' : 'Transparency & Public Clarification'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
            {language === 'mr'
              ? 'हे पोर्टल आमदार विलास भुमरे यांच्या कार्यालयातर्फे बिडकीन व परिसरातील होतकरू उमेदवारांची रोजगार-इच्छा नोंदणी संकलित करण्यासाठी चालवले जात आहे. हा सरकारी मालकीचा उपक्रम किंवा थेट नोकरीचा करार नाही. औद्योगिक विकासानुसार कंपन्यांना गरजेनुसार स्थानिक कुशल उमेदवारांची माहिती उपलब्ध करून देण्यास साहाय्य करणे हा यामागचा प्रामाणिक उद्देश आहे.'
              : 'This portal is run by the office of MLA Vilas Bhumare to map talent and employment preferences across Bidkin and surrounding constituency areas. It does not represent an unsupported claim of government ownership nor does it offer guaranteed employment contracts.'}
          </p>
        </div>
      </section>

    </div>
  );
};
