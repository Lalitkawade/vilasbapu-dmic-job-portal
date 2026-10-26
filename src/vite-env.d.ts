/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_OFFICE_NAME_MR: string;
  readonly VITE_OFFICE_NAME_EN: string;
  readonly VITE_PORTAL_TITLE_MR: string;
  readonly VITE_PORTAL_TITLE_EN: string;
  readonly VITE_DISTRICT_DEFAULT: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_OFFICE_ADDRESS_MR: string;
  readonly VITE_OFFICE_ADDRESS_EN: string;
  readonly VITE_RESUME_MAX_SIZE_BYTES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
