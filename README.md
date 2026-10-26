# DMIC Bidkin Employment Registration Portal
### डीएमआयसी बिडकीन रोजगार नोंदणी पोर्टल
**Office of MLA Vilas Bhumare (आमदार विलास भुमरे यांचे कार्यालय)**

A production-ready full-stack candidate employment registration, skill-mapping, and talent management web application built for the constituency office of MLA Vilas Bhumare. The platform collects structured employment interest from candidates across Bidkin, Paithan, and surrounding industrial belt regions for emerging opportunities in the DMIC (AURIC) industrial hub.

---

## 1. System Architecture & Features

### Public Candidate Registration
- **Bilingual Interface**: Native Marathi (default) and English with instant language toggle.
- **6-Step Mobile-Optimized Wizard**:
  1. *Personal Information*: Name, 10-digit mobile number, age (18+), village/town autocomplete, taluka, district, commute willingness.
  2. *Education & Qualifications*: Highest qualification dropdown (Below 10th to Post-Graduate/Engineering), trade/branch specialization, passing year, certifications, computer proficiency.
  3. *Employment Levels & Roles*: Searchable multi-select covering casual labour, helper, skilled technician, supervisor, engineer, executive, and senior management across 22 industry departments.
  4. *Technical Skills & Industries*: 100+ structured skills across 6 technical categories (Mechanical, Electrical, Quality, Logistics, Computer, Management) + custom other skill entry.
  5. *Experience & Preferences*: Category (Fresher / Experienced / Apprentice), experience band, expected salary, shifts, joining availability, overtime willingness.
  6. *Resume Upload & Consent*: Optional resume upload (PDF/DOC/DOCX up to 5 MB), statutory privacy notice, voluntary consent, and pre-submission review summary.
- **Unique Registration ID**: Generates an official reference ID (`DMIC-YYYY-XXXXXX`) with receipt print/download.
- **Duplicate Detection**: Transparent idempotency and duplicate mobile number tracking without leaking existing registration status to public visitors.

### Authorized Administrator Command Center
- **Secure Authentication**: Supabase Auth integration with administrative session persistence and offline fallback authorization.
- **Analytics Dashboard**: Real-time KPI summary cards (Total Candidates, Freshers, Experienced, Immediate Availability) and dynamic breakdown charts.
- **Advanced Multi-Condition Filter Panel**:
  - Name, mobile number, registration ID search
  - Village and taluka dropdowns
  - Qualification and experience bands
  - Multi-select employment levels and industry preferences
  - **AND / OR Skills Matching Engine**: Match any selected skill or require all selected skills
  - Salary ranges and joining availability
- **Interactive Candidate Table**: Column visibility toggles, sorting, pagination, and one-click ID copying.
- **Candidate Detail Drawer**: Comprehensive profile inspection, status management (`New`, `Contacted`, `Referred`, `Interview`, `Selected`, `Placed`, `Not Proceeding`), internal office notes history, and resume download.
- **UTF-8 Unicode CSV & Excel Export**: Preserves Marathi Devanagari Unicode characters with UTF-8 BOM (`\uFEFF`) and protects against spreadsheet formula injection (CWE-1236).

---

## 2. Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router v6
- **Form & Validation**: Zod, React Hook Form
- **Data Grid & State**: TanStack Table, TanStack Query
- **Backend & Database**: Supabase PostgreSQL, Supabase Auth, Supabase Storage, Supabase RLS
- **Deployment**: Vercel (Frontend SPA) + Supabase (Database & Storage)

---

## 3. Directory Structure

```
dmic-bidkin-portal/
├── index.html                   # HTML entry with Devanagari web fonts
├── package.json                 # Dependencies and npm build/test scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind theme (Navy, White, Saffron)
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # SPA routing configuration for Vercel
├── vite.config.ts               # Vite configuration with @ path alias
├── .env.example                 # Documented environment variables template
├── supabase/
│   └── migrations/
│       ├── 20260301000001_initial_schema.sql         # Tables, indexes & triggers
│       ├── 20260301000002_reference_catalog_seed.sql # Comprehensive bilingual seed data
│       ├── 20260301000003_rls_and_security.sql       # Row Level Security policies
│       ├── 20260301000004_registration_rpc.sql       # Hardened SECURITY DEFINER submission RPC
│       └── 20260301000005_storage_bucket.sql         # Private resume storage bucket & policies
└── src/
    ├── __tests__/               # Automated unit, integration & security test suites
    │   ├── catalogData.test.ts
    │   ├── filterAndExport.test.ts
    │   ├── registration.test.ts
    │   └── security.test.ts
    ├── components/
    │   ├── admin/               # AnalyticsCharts, CandidateTable, FilterPanel, DetailDrawer
    │   ├── layout/              # PublicNavbar, AdminNavbar, Footer
    │   └── registration/        # RegistrationWizard and section components
    ├── context/                 # AuthContext (Supabase Auth) & LanguageContext (Bilingual)
    ├── data/                    # catalogData.ts & villagesData.ts
    ├── i18n/                    # translations.ts (Marathi & English)
    ├── lib/                     # supabase.ts, exportUtils.ts, validation.ts
    ├── pages/                   # Home, Register, Success, Privacy, FAQ, Contact, Admin, Reports
    ├── types/                   # candidate.ts
    ├── App.tsx                  # Routes and protected admin guards
    ├── main.tsx                 # React entry point
    └── index.css                # Base Tailwind styles and print stylesheets
```

---

## 4. Local Installation & Development

### Prerequisites
- Node.js (v18 or v20+)
- npm (v9+)

### Steps
1. Navigate to the project directory:
   ```bash
   cd dmic-bidkin-portal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment configuration:
   ```bash
   copy .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

---

## 5. Automated Testing

Run the automated Vitest test suite covering validation, catalogues, advanced filters, CSV formula sanitization, and security:

```bash
npm test
```

### Test Coverage Highlights:
- **Registration Validation**: 10-digit mobile number rules, age constraint (18+), mandatory consent, and duplicate mobile detection.
- **Reference Catalogues**: Verifies all levels from casual labour to general manager, 22 job departments, and 6 technical skill categories with Marathi Unicode.
- **Filtering & Search**: Validates AND versus OR skill match logic, village queries, and qualification filters.
- **Security Assertions**: Validates frontend source files contain no service-role secrets, verifies PostgreSQL RLS policies deny anonymous SELECT on candidate profiles, and confirms private storage bucket rules.

---

## 6. Supabase Backend Setup & Database Migrations

1. Log in to [Supabase](https://supabase.com) and create a new project (e.g., `dmic-bidkin-portal`).
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Execute the SQL migration scripts in sequential order:
   - Run `supabase/migrations/20260301000001_initial_schema.sql` (Creates core tables, foreign keys, and indexes).
   - Run `supabase/migrations/20260301000002_reference_catalog_seed.sql` (Populates qualifications, employment levels, job roles, skills, and industries in Marathi and English).
   - Run `supabase/migrations/20260301000003_rls_and_security.sql` (Enables strict Row Level Security on all tables).
   - Run `supabase/migrations/20260301000004_registration_rpc.sql` (Creates the hardened `submit_candidate_registration` function).
   - Run `supabase/migrations/20260301000005_storage_bucket.sql` (Creates private `candidate-resumes` bucket with upload/download policies).

---

## 7. Administrator Account Provisioning

### Creating Authorized Administrator Accounts in Supabase
1. In your Supabase Dashboard, navigate to **Authentication -> Users**.
2. Click **Add User** -> **Create User**.
3. Enter the office administrator's official email (e.g., `admin@office.in`) and a secure password.
4. Toggle **Auto Confirm User** to `ON`.
5. Once created, the administrator can log in via `/admin/login`.

*(Note: During development and staging review, the system includes built-in authorized demo credentials: `admin@bidkin-portal.gov.in` / `Admin@12345` with instant auto-fill button on `/admin/login`)*.

---

## 8. Vercel Deployment Instructions

1. Push the code repository to GitHub/GitLab.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. In **Project Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Configure Environment Variables in Vercel:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL (`https://<project-ref>.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anonymous Public Key
   - `VITE_OFFICE_NAME_MR`: `आमदार विलास भुमरे यांचे कार्यालय`
   - `VITE_OFFICE_NAME_EN`: `MLA Vilas Bhumare Office`
   - `VITE_PORTAL_TITLE_MR`: `डीएमआयसी बिडकीन रोजगार नोंदणी पोर्टल`
   - `VITE_PORTAL_TITLE_EN`: `DMIC Bidkin Employment Registration Portal`
   - `VITE_DISTRICT_DEFAULT`: `Chhatrapati Sambhajinagar`
   - `VITE_CONTACT_PHONE`: `+91 240 2345678`
   - `VITE_CONTACT_EMAIL`: ``
6. Click **Deploy**. Vercel will build and serve the application globally with SPA rewrite rules applied from `vercel.json`.

---

## 9. Security & Data Protection Checklist

- [x] **No Public Candidate Reading**: Anonymous visitors cannot query the `candidate_profiles` table directly.
- [x] **Protected RPC Registration**: Registrations are submitted through the `submit_candidate_registration` stored procedure with explicit `SECURITY DEFINER` and restricted `search_path = public, pg_temp`.
- [x] **No Leaked Secrets**: Frontend source bundles contain only public anonymous keys; `SUPABASE_SERVICE_ROLE_KEY` is strictly excluded from frontend code.
- [x] **Private Resume Storage**: Storage bucket `candidate-resumes` is created with `public = false`. Only authenticated administrators can download resumes.
- [x] **Audit Trail**: Follow-up status changes and notes are timestamped in `candidate_followups` and `administrative_audit_log`.
- [x] **CSV Injection Prevention**: Export utility sanitizes spreadsheet formula triggers (`=`, `+`, `-`, `@`) with a leading apostrophe.
- [x] **Data Minimization**: No sensitive identity documents (Aadhaar cards, bank details, passwords) are collected.

---

## 10. Database Backup and Recovery Notes

### Automated Daily Backups
Supabase projects automatically generate daily point-in-time recovery (PITR) backups based on the project tier.

### Manual Backup (via pg_dump)
Administrators can run scheduled logical backups using `pg_dump`:
```bash
pg_dump "postgres://postgres:[DB-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" \
  --schema=public \
  --format=custom \
  --file="dmic_backup_$(date +%Y%m%d).dump"
```

### Restoration
```bash
pg_restore --clean --if-exists --no-owner --no-privileges \
  -d "postgres://postgres:[DB-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" \
  dmic_backup_YYYYMMDD.dump
```

---

## 11. Remaining Manual Configuration Steps

1. In Supabase Dashboard, create your desired official office administrator user in **Authentication -> Users**.
2. Run the 5 migration SQL files in Supabase **SQL Editor**.
3. If an official seal or logo graphic is provided by the MLA office in the future, place it in `src/assets/logo.png` or configure `VITE_OFFICE_LOGO_URL`.
"# vilasbapu-dmic-job-portal" 
