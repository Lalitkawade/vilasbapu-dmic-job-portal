import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error || 'Login failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-navy-900 text-white p-6 sm:p-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-navy-800 text-saffron-400 flex items-center justify-center mx-auto border border-navy-700 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">{t('adminLoginTitle')}</h1>
          <p className="text-xs text-slate-400">{t('adminLoginSubtitle')}</p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                {t('emailLabel')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="administrator@constituency.gov.in"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                {t('passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy-800 hover:bg-navy-700 active:scale-98 text-white font-semibold py-2.5 rounded-lg transition shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('loggingIn')}</span>
                </>
              ) : (
                <>
                  <span>{t('loginButton')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice for Authorized Personnel */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'mr' 
                ? 'हे पोर्टल केवळ अधिकृत कार्यालयीन कर्मचाऱ्यांसाठी सुरक्षित आहे.' 
                : 'Access is restricted to authorized constituency office personnel.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
