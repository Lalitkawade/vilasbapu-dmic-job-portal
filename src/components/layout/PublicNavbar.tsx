import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Menu, 
  X, 
  Globe, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Home, 
  FileText, 
  HelpCircle, 
  PhoneCall, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const officeName = language === 'mr' 
    ? (import.meta.env.VITE_OFFICE_NAME_MR || 'आमदार विलास भुमरे यांचे कार्यालय')
    : (import.meta.env.VITE_OFFICE_NAME_EN || 'MLA Vilas Bhumare Office');

  const visionTagline = language === 'mr'
    ? 'विलास संदिपान भुमरे यांच्या संकल्पनेतून'
    : 'Conceived under the Vision of Vilas Sandipan Bhumare';

  const portalTitle = language === 'mr'
    ? (import.meta.env.VITE_PORTAL_TITLE_MR || 'डीएमआयसी बिडकीन रोजगार नोंदणी पोर्टल')
    : (import.meta.env.VITE_PORTAL_TITLE_EN || 'DMIC Bidkin Employment Registration Portal');

  const phone = import.meta.env.VITE_CONTACT_PHONE || '+91 240 2345678';

  const navLinks = [
    { name: t('navHome'), path: '/', icon: Home },
    { name: t('navRegister'), path: '/register', icon: UserCheck },
    { name: t('navPrivacy'), path: '/privacy', icon: FileText },
    { name: t('navFaq'), path: '/faq', icon: HelpCircle },
    { name: t('navContact'), path: '/contact', icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Top Gradient Accent Stripe */}
      <div className="h-[3px] bg-gradient-to-r from-navy-800 via-saffron-500 to-amber-400 w-full"></div>

      {/* Top Utility Ribbon with Vision Attribution & Switchers */}
      <div className="bg-navy-950 text-white py-1.5 px-3 sm:px-8 text-xs font-medium border-b border-navy-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          
          {/* Left: Prominent Vision Credit */}
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 bg-saffron-500/20 text-saffron-300 border border-saffron-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shrink-0 shadow-2xs">
              <Sparkles className="w-3 h-3 text-saffron-400 shrink-0 animate-pulse" />
              <span>{visionTagline}</span>
            </span>
            <span className="hidden lg:inline text-slate-400 text-xs">|</span>
            <span className="hidden lg:inline text-slate-300 text-xs truncate">{officeName}</span>
          </div>

          {/* Right: Quick Controls (Language, Phone, Admin) */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Phone helpline for quick contact */}
            <a
              href={`tel:${phone}`}
              className="hidden md:flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition"
              title="Constituency Helpline"
            >
              <Phone className="w-3 h-3 text-saffron-400" />
              <span>{phone}</span>
            </a>

            <span className="hidden md:inline text-slate-700">|</span>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 active:scale-95 text-slate-100 px-2.5 py-1 rounded-md border border-navy-700 text-[11px] font-semibold transition shadow-xs"
              title="Change Language / भाषा बदला"
              id="lang-toggle-btn"
            >
              <Globe className="w-3.5 h-3.5 text-saffron-400 shrink-0" />
              <span className="font-bold">{language === 'mr' ? 'English' : 'मराठी'}</span>
            </button>

            {/* Admin Portal Link */}
            <Link
              to="/admin/login"
              className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px] py-1 px-1.5 rounded hover:bg-navy-800/80 transition"
              title="Admin Login"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-saffron-400" />
              <span className="hidden sm:inline">{t('navAdmin')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex justify-between items-center gap-3">
        
        {/* Brand & Title Group */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
          {/* Logo Badge */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white flex flex-col items-center justify-center font-extrabold shadow-md border border-navy-700 group-hover:border-saffron-500/60 transition-all shrink-0">
            <span className="text-saffron-400 text-sm sm:text-base leading-none">D</span>
            <span className="text-[9px] sm:text-[10px] tracking-wider text-slate-300 leading-tight">MIC</span>
          </div>

          {/* Titles */}
          <div className="min-w-0">
            {/* Vision Tag on Header */}
            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-saffron-600 uppercase tracking-wide truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 shrink-0"></span>
              <span className="truncate">{visionTagline}</span>
            </div>

            {/* Main Portal Headline */}
            <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-navy-950 leading-tight truncate">
              {portalTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
              {language === 'mr' ? 'बिडकीन व पैठण मतदारसंघ रोजगार उपक्रम' : 'Bidkin & Paithan Employment Initiative'}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs xl:text-sm font-semibold transition px-3 py-2 rounded-lg flex items-center gap-1.5 ${
                isActive(link.path)
                  ? 'text-saffron-700 bg-saffron-50 font-bold border border-saffron-200/80 shadow-2xs'
                  : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              <span>{link.name}</span>
            </Link>
          ))}

          {/* Primary Registration CTA */}
          <Link
            to="/register"
            className="ml-2 bg-gradient-to-r from-saffron-500 via-saffron-600 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs xl:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-saffron-500/25 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <UserCheck className="w-4 h-4 text-white" />
            <span>{t('registerNow')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Mobile Header Actions */}
        <div className="lg:hidden flex items-center gap-1.5 shrink-0">
          {/* Quick Register CTA on Mobile Header */}
          <Link
            to="/register"
            className="bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1 sm:hidden"
          >
            <span>{language === 'mr' ? 'नोंदणी' : 'Register'}</span>
          </Link>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-navy-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-navy-600 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-saffron-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Vision Banner Card */}
          <div className="p-3 bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-xl border border-navy-700 shadow-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-saffron-400">
              <Sparkles className="w-4 h-4 text-saffron-400 shrink-0 animate-pulse" />
              <span>{visionTagline}</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {officeName} — बिडकीन व पैठण मतदारसंघ
            </p>
          </div>

          {/* Navigation Links with Icons */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    active
                      ? 'bg-saffron-50 text-saffron-700 font-bold border border-saffron-200'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-navy-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${active ? 'bg-saffron-100 text-saffron-700' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${active ? 'text-saffron-600' : 'text-slate-400'}`} />
                </Link>
              );
            })}

            {/* Mobile Admin Link */}
            <Link
              to="/admin/login"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-navy-900 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>{t('navAdmin')}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Call to Action Button in Mobile Drawer */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              to="/register"
              className="w-full text-center bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('registerNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Helpline quick dial button on mobile */}
            <a
              href={`tel:${phone}`}
              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-saffron-600" />
              <span>{language === 'mr' ? 'हेल्पलाईन:' : 'Helpline:'} {phone}</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
};
