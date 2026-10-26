import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchAllCandidates } from '../lib/supabase';
import { CandidateProfile, CandidateFilterState } from '../types/candidate';
import { CandidateFilterPanel } from '../components/admin/CandidateFilterPanel';
import { CandidateTable } from '../components/admin/CandidateTable';
import { CandidateDetailDrawer } from '../components/admin/CandidateDetailDrawer';
import { Search, Filter, RefreshCw, X } from 'lucide-react';

const initialFilters: CandidateFilterState = {
  searchQuery: '',
  village: '',
  taluka: '',
  highestQualification: '',
  experienceCategory: '',
  experienceBand: '',
  employmentLevels: [],
  jobRoles: [],
  selectedSkills: [],
  skillMatchMode: 'ANY',
  industries: [],
  salaryBand: '',
  shiftPreference: '',
  joiningAvailability: '',
  followUpStatus: '',
  willingToCommute: 'all',
};

export const CandidateDirectoryPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<CandidateFilterState>(initialFilters);
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(true);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllCandidates();
      setCandidates(data);

      // Check if URL has ?id= to open specific candidate drawer
      const targetId = searchParams.get('id');
      if (targetId) {
        const found = data.find(c => c.registration_number === targetId || c.id === targetId);
        if (found) setSelectedCandidate(found);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Compute active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.village) count++;
    if (filters.taluka) count++;
    if (filters.highestQualification) count++;
    if (filters.experienceCategory) count++;
    if (filters.experienceBand) count++;
    if (filters.employmentLevels.length > 0) count += filters.employmentLevels.length;
    if (filters.selectedSkills.length > 0) count += filters.selectedSkills.length;
    if (filters.industries.length > 0) count += filters.industries.length;
    if (filters.salaryBand) count++;
    if (filters.joiningAvailability) count++;
    if (filters.followUpStatus) count++;
    return count;
  }, [filters]);

  // Comprehensive Filtering Engine (AND / OR)
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      // 1. Text Search: Name, Mobile, Registration Number
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = candidate.full_name?.toLowerCase().includes(query);
        const matchesMobile = candidate.mobile_number?.includes(query);
        const matchesReg = candidate.registration_number?.toLowerCase().includes(query);
        const matchesVillage = candidate.village?.toLowerCase().includes(query);
        if (!matchesName && !matchesMobile && !matchesReg && !matchesVillage) {
          return false;
        }
      }

      // 2. Village
      if (filters.village && !candidate.village?.toLowerCase().includes(filters.village.toLowerCase())) {
        return false;
      }

      // 3. Taluka
      if (filters.taluka && !candidate.taluka?.toLowerCase().includes(filters.taluka.toLowerCase())) {
        return false;
      }

      // 4. Highest Qualification
      if (filters.highestQualification && candidate.highest_qualification_id !== filters.highestQualification) {
        return false;
      }

      // 5. Experience Category
      if (filters.experienceCategory && candidate.experience_category !== filters.experienceCategory) {
        return false;
      }

      // 6. Experience Band
      if (filters.experienceBand && candidate.total_experience_band !== filters.experienceBand) {
        return false;
      }

      // 7. Employment Levels (Candidate must match at least one selected level)
      if (filters.employmentLevels.length > 0) {
        const candLevels = candidate.employment_levels || [];
        const hasMatch = filters.employmentLevels.some(l => candLevels.includes(l));
        if (!hasMatch) return false;
      }

      // 8. Skills: MATCH ANY vs MATCH ALL
      if (filters.selectedSkills.length > 0) {
        const candSkills = candidate.skills || [];
        if (filters.skillMatchMode === 'ALL') {
          const hasAll = filters.selectedSkills.every(s => candSkills.includes(s));
          if (!hasAll) return false;
        } else {
          const hasAny = filters.selectedSkills.some(s => candSkills.includes(s));
          if (!hasAny) return false;
        }
      }

      // 9. Industries
      if (filters.industries.length > 0) {
        const candInds = candidate.industries || [];
        const hasMatch = filters.industries.some(i => candInds.includes(i));
        if (!hasMatch) return false;
      }

      // 10. Salary Band
      if (filters.salaryBand && candidate.expected_salary_band_id !== filters.salaryBand) {
        return false;
      }

      // 11. Joining Availability
      if (filters.joiningAvailability && candidate.joining_availability_id !== filters.joiningAvailability) {
        return false;
      }

      // 12. Follow-up Status
      if (filters.followUpStatus && candidate.follow_up_status !== filters.followUpStatus) {
        return false;
      }

      return true;
    });
  }, [candidates, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {t('candidateDirectory')}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {language === 'mr' ? 'उमेदवारांची शोध प्रणाली व फिल्टर पॅनेल' : 'Multi-condition candidate search & qualification filtering'}
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder={t('searchCandidatesPlaceholder')}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-navy-600 bg-white"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
              showFilterPanel
                ? 'bg-navy-800 text-white border-navy-800'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t('filterCandidates')}</span>
          </button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      {showFilterPanel && (
        <CandidateFilterPanel
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          activeFilterCount={activeFilterCount}
        />
      )}

      {/* Candidate Data Table */}
      <CandidateTable
        candidates={filteredCandidates}
        isLoading={isLoading}
        onRefresh={loadData}
        onSelectCandidate={candidate => setSelectedCandidate(candidate)}
      />

      {/* Detail Drawer */}
      {selectedCandidate && (
        <CandidateDetailDrawer
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onCandidateUpdated={() => {
            loadData();
          }}
        />
      )}
    </div>
  );
};
