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

  it('ensures resume storage bucket is strictly private with 5 MB limit', () => {
    const storageFile = path.join(migrationsDir, '20260301000005_storage_bucket.sql');
    expect(fs.existsSync(storageFile)).toBe(true);
    const content = fs.readFileSync(storageFile, 'utf8');

    expect(content).toContain('candidate-resumes');
    expect(content).toContain('false, -- STRICTLY PRIVATE BUCKET');
    expect(content).toContain('5242880, -- 5 MB max limit');
    expect(content).toContain('Allow authenticated admins to read resumes');
  });
});
