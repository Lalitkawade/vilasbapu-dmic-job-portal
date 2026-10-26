import { describe, it, expect } from 'vitest';
import { 
  QUALIFICATIONS, 
  EMPLOYMENT_LEVELS, 
  JOB_DEPARTMENTS, 
  JOB_ROLES, 
  SKILLS, 
  INDUSTRIES,
  getItemLabel,
  getItemsLabels
} from '../data/catalogData';

describe('Reference Catalogues & Bilingual Support', () => {
  it('covers all employment levels from Casual Labour to Senior Management', () => {
    const levelIds = EMPLOYMENT_LEVELS.map(l => l.id);
    // Casual
    expect(levelIds).toContain('casual_labour');
    expect(levelIds).toContain('helper');
    expect(levelIds).toContain('unskilled_worker');
    // Skilled
    expect(levelIds).toContain('operator');
    expect(levelIds).toContain('technician');
    expect(levelIds).toContain('fitter');
    expect(levelIds).toContain('electrician');
    // Supervisory
    expect(levelIds).toContain('supervisor');
    expect(levelIds).toContain('shift_incharge');
    // Engineering
    expect(levelIds).toContain('engineer');
    expect(levelIds).toContain('mechanical_engineer');
    // Executive
    expect(levelIds).toContain('data_entry_operator');
    expect(levelIds).toContain('office_assistant');
    // Management
    expect(levelIds).toContain('manager');
    expect(levelIds).toContain('general_manager');
  });

  it('contains exactly 22 structured job departments', () => {
    expect(JOB_DEPARTMENTS.length).toBe(22);
  });

  it('provides bilingual Marathi and English names for all qualifications', () => {
    QUALIFICATIONS.forEach(q => {
      expect(q.name_en.length).toBeGreaterThan(0);
      expect(q.name_mr.length).toBeGreaterThan(0);
    });
  });

  it('correctly retrieves Marathi and English labels using getItemLabel helper', () => {
    const labelMr = getItemLabel(QUALIFICATIONS, 'iti', 'mr');
    const labelEn = getItemLabel(QUALIFICATIONS, 'iti', 'en');

    expect(labelMr).toContain('आयटीआय');
    expect(labelEn).toContain('ITI');
  });

  it('covers skills across all required technical categories', () => {
    const categories = new Set(SKILLS.map(s => s.category));
    expect(categories.has('mechanical')).toBe(true);
    expect(categories.has('electrical')).toBe(true);
    expect(categories.has('quality')).toBe(true);
    expect(categories.has('logistics')).toBe(true);
    expect(categories.has('computer')).toBe(true);
    expect(categories.has('management')).toBe(true);
  });
});
