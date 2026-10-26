import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { AdminNavbar } from './components/layout/AdminNavbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { RegistrationSuccessPage } from './pages/RegistrationSuccessPage';
import { PrivacyNoticePage } from './pages/PrivacyNoticePage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CandidateDirectoryPage } from './pages/CandidateDirectoryPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Admin Route Guard
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-navy-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

// Layout Controller: Switches between Public Navbar and Admin Navbar
const LayoutController: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {isAdminRoute ? <AdminNavbar /> : <PublicNavbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <LayoutController>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/success" element={<RegistrationSuccessPage />} />
              <Route path="/privacy" element={<PrivacyNoticePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/candidates"
                element={
                  <ProtectedAdminRoute>
                    <CandidateDirectoryPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/candidates/:id"
                element={
                  <ProtectedAdminRoute>
                    <CandidateDetailPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedAdminRoute>
                    <ReportsPage />
                  </ProtectedAdminRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </LayoutController>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
