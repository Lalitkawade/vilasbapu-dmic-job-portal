import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Security & Row Level Security (RLS) Assertions', () => {
  const migrationsDir = path.resolve(__dirname, '../../supabase/migrations');

  it('ensures frontend source code does not contain service-role secrets', () => {
    const srcDir = path.resolve(__dirname, '..');
    const files = fs.readdirSync(srcDir, { recursive: true }) as string[];

    for (const file of files) {
      if (file.includes('__tests__') || file.endsWith('.d.ts')) continue;
      const fullPath = path.join(srcDir, file);
      if (fs.statSync(fullPath).isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        expect(content).not.toContain('SUPABASE_SERVICE_ROLE_KEY');
        expect(content).not.toContain('service_role');
      }
    }
  });

  it('ensures RLS policies strictly deny anonymous SELECT on candidate_profiles', () => {
    const rlsFile = path.join(migrationsDir, '20260301000003_rls_and_security.sql');
    expect(fs.existsSync(rlsFile)).toBe(true);
    const content = fs.readFileSync(rlsFile, 'utf8');

    // RLS enabled
    expect(content).toContain('ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;');
    // Candidate profiles only readable by authenticated
    expect(content).toContain('CREATE POLICY "Admins can view all candidate profiles" ON public.candidate_profiles');
    expect(content).toContain('FOR SELECT TO authenticated USING (true);');
    // Ensure no anonymous SELECT policy exists on candidate_profiles
    expect(content).not.toContain('ON public.candidate_profiles\n    FOR SELECT TO anon');
  });

  it('ensures registration RPC function uses elevated privileges securely (SECURITY DEFINER + search_path)', () => {
    const rpcFile = path.join(migrationsDir, '20260301000004_registration_rpc.sql');
    expect(fs.existsSync(rpcFile)).toBe(true);
    const content = fs.readFileSync(rpcFile, 'utf8');

    expect(content).toContain('SECURITY DEFINER');
    expect(content).toContain('SET search_path = public, pg_temp');
  });

  it('ensures resume storage bucket is strictly private with 1 MB limit', () => {
    const storageFile = path.join(migrationsDir, '20260301000005_storage_bucket.sql');
    expect(fs.existsSync(storageFile)).toBe(true);
    const content = fs.readFileSync(storageFile, 'utf8');

    expect(content).toContain('candidate-resumes');
    expect(content).toContain('false, -- STRICTLY PRIVATE BUCKET');
    expect(content).toContain('1048576, -- 1 MB max limit');
    expect(content).toContain('Allow authenticated admins to read resumes');
  });

  it('ensures demo credentials (admin@bidkin-portal.gov.in and Admin@12345) are completely removed from all source files and docs', () => {
    const rootDir = path.resolve(__dirname, '../..');
    const checkFiles = [
      path.join(rootDir, 'src/pages/AdminLoginPage.tsx'),
      path.join(rootDir, 'src/context/AuthContext.tsx'),
      path.join(rootDir, 'src/lib/supabase.ts'),
      path.join(rootDir, 'README.md'),
    ];

    for (const filePath of checkFiles) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        expect(content).not.toContain('admin@bidkin-portal.gov.in');
        expect(content).not.toContain('Admin@12345');
        expect(content).not.toContain('fillDemoAdmin');
      }
    }
  });

  it('ensures AuthContext does not have hardcoded password bypasses', () => {
    const authFile = path.join(__dirname, '../context/AuthContext.tsx');
    const content = fs.readFileSync(authFile, 'utf8');

    expect(content).not.toMatch(/password\s*===/);
    expect(content).not.toContain('admin-constituency-office');
  });

  it('ensures single administrator role and no multi-role privilege escalation', () => {
    const authFile = path.join(__dirname, '../context/AuthContext.tsx');
    const content = fs.readFileSync(authFile, 'utf8');

    expect(content).toContain("role: 'admin'");
    expect(content).not.toContain('super_admin');
    expect(content).not.toContain('data_entry');
  });

  it('ensures production sourcemaps are disabled in vite.config.ts to prevent source disclosure', () => {
    const viteConfig = path.resolve(__dirname, '../../vite.config.ts');
    const content = fs.readFileSync(viteConfig, 'utf8');

    expect(content).toContain('sourcemap: false');
  });

  it('ensures data minimization: no Aadhaar, PAN, or financial numbers are requested in validation schemas', () => {
    const validationFile = path.join(__dirname, '../lib/validation.ts');
    const content = fs.readFileSync(validationFile, 'utf8').toLowerCase();

    expect(content).not.toContain('aadhaar');
    expect(content).not.toContain('pan_card');
    expect(content).not.toContain('bank_account');
    expect(content).not.toContain('ifsc');
  });
});
