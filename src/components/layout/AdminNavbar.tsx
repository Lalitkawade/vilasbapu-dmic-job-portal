import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, Users, FileSpreadsheet, LogOut, Globe, Shield } from 'lucide-react';

export const AdminNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: t('navDashboard'), path: '/admin/dashboard', icon: LayoutDashboard },
    { name: t('navCandidates'), path: '/admin/candidates', icon: Users },
    { name: t('navReports'), path: '/admin/reports', icon: FileSpreadsheet },
  ];

  return (
    <header className="bg-navy-900 text-white border-b border-navy-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Portal Info */}
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
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
                <span className="font-bold text-base tracking-wide flex items-center gap-2">
                  DMIC Portal
                  <span className="text-[10px] bg-saffron-500/20 text-saffron-300 border border-saffron-500/30 font-semibold px-2 py-0.5 rounded-full uppercase">
                    Admin
                  </span>
                </span>
                <p className="text-xs text-slate-400">
                  {language === 'mr' ? 'कार्यालयीन नियंत्रण कक्ष' : 'Office Command Center'}
                </p>
              </div>
            </Link>

            {/* Navigation tabs */}
            <nav className="hidden md:flex items-center gap-1 ml-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                      active
                        ? 'bg-navy-800 text-saffron-400 border border-navy-700'
                        : 'text-slate-300 hover:text-white hover:bg-navy-850'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs bg-navy-800 hover:bg-navy-700 text-slate-200 px-2.5 py-1.5 rounded border border-navy-700 transition"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-saffron-400" />
              <span>{language === 'mr' ? 'English' : 'मराठी'}</span>
            </button>

            {/* Admin identity display */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-slate-200 font-medium truncate max-w-[150px]">
                {user?.email}
              </span>
              <span className="text-[10px] text-emerald-400">● Authenticated</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-md text-xs font-semibold border border-red-500/30 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-navy-800 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1 rounded ${
                  active ? 'text-saffron-400 font-bold' : 'text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
