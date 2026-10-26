import React, { useState, useMemo } from 'react';
import { CandidateProfile } from '../../types/candidate';
import { useLanguage } from '../../context/LanguageContext';
import { 
  QUALIFICATIONS, 
  EMPLOYMENT_LEVELS, 
  JOB_ROLES, 
  SKILLS, 
  INDUSTRIES, 
  SALARY_BANDS, 
  JOINING_AVAILABILITY, 
  EXPERIENCE_BANDS,
  FOLLOW_UP_STATUS_OPTIONS,
  getItemLabel,
  getItemsLabels
} from '../../data/catalogData';
import { 
  Copy, 
  Check, 
  Eye, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Columns, 
  ChevronLeft, 
  ChevronRight,
  FileSpreadsheet,
  RefreshCw,
  Search
} from 'lucide-react';
import { exportCandidatesToCsv } from '../../lib/exportUtils';

interface CandidateTableProps {
  candidates: CandidateProfile[];
  isLoading: boolean;
  onRefresh: () => void;
  onSelectCandidate: (candidate: CandidateProfile) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  isLoading,
  onRefresh,
  onSelectCandidate,
}) => {
  const { language, t } = useLanguage();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof CandidateProfile>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  // Column visibility state
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    reg_id: true,
    date: true,
    name: true,
    mobile: true,
    village: true,
    taluka: false,
    education: true,
    levels: true,
    skills: true,
    experience: true,
    salary: true,
    availability: false,
    status: true,
    actions: true,
  });

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSort = (field: keyof CandidateProfile) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sorted candidates
  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      let valA = a[sortField] ?? '';
      let valB = b[sortField] ?? '';

      if (sortField === 'created_at') {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
      }

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [candidates, sortField, sortDirection]);

  // Paginated candidates
  const totalPages = Math.ceil(sortedCandidates.length / pageSize) || 1;
  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedCandidates.slice(start, start + pageSize);
  }, [sortedCandidates, currentPage]);

  const toggleColumn = (key: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-navy-900">
            {language === 'mr' ? 'उमेदवार यादी' : 'Candidate Records'}
          </span>
          <span className="text-xs bg-navy-100 text-navy-800 font-bold px-2.5 py-0.5 rounded-full">
            {candidates.length} {language === 'mr' ? 'उमेदवार' : 'Total'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <button
            onClick={onRefresh}
            className="p-1.5 text-slate-600 hover:text-navy-900 hover:bg-slate-200 rounded-lg transition"
            title="Refresh Table"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {/* Column Visibility Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowColumnsMenu(!showColumnsMenu)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg shadow-2xs"
            >
              <Columns className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'mr' ? 'कॉलम निवडा' : 'Columns'}</span>
            </button>

            {showColumnsMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-30 text-xs space-y-1.5">
                {Object.entries(visibleColumns).map(([colKey, isVis]) => (
                  <label key={colKey} className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVis}
                      onChange={() => toggleColumn(colKey as any)}
                      className="rounded text-navy-800 w-3.5 h-3.5"
                    />
                    <span className="capitalize">{colKey.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Quick Export Button */}
          <button
            onClick={() => exportCandidatesToCsv(candidates, `dmic-candidates-${new Date().toISOString().slice(0,10)}.csv`, language)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('exportToCsv')}</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              {visibleColumns.reg_id && (
                <th className="py-3 px-3.5 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSort('registration_number')}>
                  <div className="flex items-center gap-1">
                    <span>{language === 'mr' ? 'नोंदणी क्र.' : 'Reg ID'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}

              {visibleColumns.date && (
                <th className="py-3 px-3 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSort('created_at')}>
                  <div className="flex items-center gap-1">
                    <span>{language === 'mr' ? 'तारीख' : 'Date'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}

              {visibleColumns.name && (
                <th className="py-3 px-3.5 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSort('full_name')}>
                  <div className="flex items-center gap-1">
                    <span>{t('fullName')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}

              {visibleColumns.mobile && (
                <th className="py-3 px-3 whitespace-nowrap">
                  <span>{t('mobileNumber')}</span>
                </th>
              )}

              {visibleColumns.village && (
                <th className="py-3 px-3 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSort('village')}>
                  <div className="flex items-center gap-1">
                    <span>{t('village')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}

              {visibleColumns.taluka && (
                <th className="py-3 px-3 whitespace-nowrap">
                  <span>{t('taluka')}</span>
                </th>
              )}

              {visibleColumns.education && (
                <th className="py-3 px-3 whitespace-nowrap">
                  <span>{t('highestQualification')}</span>
                </th>
              )}

              {visibleColumns.levels && (
                <th className="py-3 px-3 whitespace-nowrap min-w-[140px]">
                  <span>{t('stepLevel')}</span>
                </th>
              )}

              {visibleColumns.skills && (
                <th className="py-3 px-3 whitespace-nowrap min-w-[150px]">
                  <span>{t('stepSkills')}</span>
                </th>
              )}

              {visibleColumns.experience && (
                <th className="py-3 px-3 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSort('total_experience_band')}>
                  <div className="flex items-center gap-1">
                    <span>{t('stepExperience')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}

              {visibleColumns.salary && (
                <th className="py-3 px-3 whitespace-nowrap">
                  <span>{t('expectedSalary')}</span>
                </th>
              )}

              {visibleColumns.availability && (
                <th className="py-3 px-3 whitespace-nowrap">
                  <span>{t('joiningAvailability')}</span>
                </th>
              )}

              {visibleColumns.status && (
                <th className="py-3 px-3 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSort('follow_up_status')}>
                  <div className="flex items-center gap-1">
                    <span>{t('followUpStatus')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}

              {visibleColumns.actions && (
                <th className="py-3 px-3 text-right whitespace-nowrap">
                  <span>{language === 'mr' ? 'क्रिया' : 'Action'}</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {paginatedCandidates.length === 0 ? (
              <tr>
                <td colSpan={14} className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto space-y-2">
                    <Search className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium">{t('noCandidatesFound')}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedCandidates.map(c => {
                const statusObj = FOLLOW_UP_STATUS_OPTIONS.find(s => s.id === c.follow_up_status);
                const qualLabel = getItemLabel(QUALIFICATIONS, c.highest_qualification_id, language);
                const expLabel = getItemLabel(EXPERIENCE_BANDS, c.total_experience_band, language);
                const salaryLabel = getItemLabel(SALARY_BANDS, c.expected_salary_band_id, language);
                const levelsLabels = getItemsLabels(EMPLOYMENT_LEVELS, c.employment_levels, language);
                const skillsLabels = [
                  ...getItemsLabels(SKILLS, c.skills, language),
                  ...(c.other_skills || [])
                ];

                return (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCandidate(c)}
                    className="hover:bg-slate-50 cursor-pointer transition"
                  >
                    {/* Reg ID with Copy */}
                    {visibleColumns.reg_id && (
                      <td className="py-3 px-3.5 whitespace-nowrap font-mono font-bold text-navy-800">
                        <div className="flex items-center gap-1.5">
                          <span>{c.registration_number}</span>
                          <button
                            onClick={e => handleCopyId(c.registration_number, e)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition"
                            title="Copy ID"
                          >
                            {copiedId === c.registration_number ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>
                    )}

                    {/* Registration Date */}
                    {visibleColumns.date && (
                      <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                    )}

                    {/* Candidate Name */}
                    {visibleColumns.name && (
                      <td className="py-3 px-3.5 whitespace-nowrap font-semibold text-slate-900">
                        {c.full_name}
                      </td>
                    )}

                    {/* Mobile Number */}
                    {visibleColumns.mobile && (
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                        {c.mobile_number}
                      </td>
                    )}

                    {/* Village */}
                    {visibleColumns.village && (
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-medium">
                        {c.village}
                      </td>
                    )}

                    {/* Taluka */}
                    {visibleColumns.taluka && (
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                        {c.taluka}
                      </td>
                    )}

                    {/* Qualification */}
                    {visibleColumns.education && (
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="font-medium text-navy-800">{qualLabel}</span>
                        {c.qualification_specialization && (
                          <span className="text-[10px] text-slate-500 block">{c.qualification_specialization}</span>
                        )}
                      </td>
                    )}

                    {/* Levels */}
                    {visibleColumns.levels && (
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {levelsLabels.slice(0, 2).map((l, i) => (
                            <span key={i} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                              {l}
                            </span>
                          ))}
                          {levelsLabels.length > 2 && (
                            <span className="text-[10px] text-slate-500 font-semibold">+{levelsLabels.length - 2}</span>
                          )}
                        </div>
                      </td>
                    )}

                    {/* Skills */}
                    {visibleColumns.skills && (
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {skillsLabels.slice(0, 2).map((s, i) => (
                            <span key={i} className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                              {s}
                            </span>
                          ))}
                          {skillsLabels.length > 2 && (
                            <span className="text-[10px] text-slate-500 font-semibold">+{skillsLabels.length - 2}</span>
                          )}
                        </div>
                      </td>
                    )}

                    {/* Experience */}
                    {visibleColumns.experience && (
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                        <span>{expLabel}</span>
                        <span className="text-[10px] text-slate-400 block capitalize">{c.experience_category}</span>
                      </td>
                    )}

                    {/* Expected Salary */}
                    {visibleColumns.salary && (
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                        {salaryLabel}
                      </td>
                    )}

                    {/* Availability */}
                    {visibleColumns.availability && (
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                        {getItemLabel(JOINING_AVAILABILITY, c.joining_availability_id, language)}
                      </td>
                    )}

                    {/* Follow-up Status */}
                    {visibleColumns.status && (
                      <td className="py-3 px-3 whitespace-nowrap">
                        {statusObj ? (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${statusObj.color}`}>
                            {language === 'mr' ? statusObj.name_mr : statusObj.name_en}
                          </span>
                        ) : (
                          c.follow_up_status
                        )}
                      </td>
                    )}

                    {/* Action */}
                    {visibleColumns.actions && (
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onSelectCandidate(c);
                          }}
                          className="bg-navy-50 hover:bg-navy-100 text-navy-800 text-[11px] font-semibold px-2.5 py-1 rounded border border-navy-200 transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{t('viewDetails')}</span>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-slate-50/50">
        <div>
          <span>
            {language === 'mr' ? 'दर्शवित आहे:' : 'Showing:'}{' '}
            <strong>
              {sortedCandidates.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{' '}
              {Math.min(currentPage * pageSize, sortedCandidates.length)}
            </strong>{' '}
            {language === 'mr' ? 'एकूण' : 'of'} <strong>{sortedCandidates.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            {language === 'mr' ? 'पृष्ठ' : 'Page'} {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
