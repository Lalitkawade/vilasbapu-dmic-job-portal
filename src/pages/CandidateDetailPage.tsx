import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchAllCandidates } from '../lib/supabase';
import { CandidateProfile } from '../types/candidate';
import { CandidateDetailDrawer } from '../components/admin/CandidateDetailDrawer';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCandidates().then(data => {
      const found = data.find(c => c.id === id || c.registration_number === id);
      setCandidate(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy-800" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">
          {language === 'mr' ? 'उमेदवार सापडला नाही' : 'Candidate Record Not Found'}
        </h2>
        <Link to="/admin/candidates" className="text-xs text-navy-800 font-semibold underline">
          {language === 'mr' ? '← उमेदवार यादीकडे परत जा' : '← Back to Candidate Directory'}
        </Link>
      </div>
    );
  }

  return (
    <CandidateDetailDrawer
      candidate={candidate}
      onClose={() => navigate('/admin/candidates')}
      onCandidateUpdated={() => {
        fetchAllCandidates().then(data => {
          const found = data.find(c => c.id === id || c.registration_number === id);
          setCandidate(found || null);
        });
      }}
    />
  );
};
