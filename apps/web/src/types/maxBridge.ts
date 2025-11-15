export type MaxWebAppUser = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

export type MaxWebAppInitData = {
  query_id?: string;
  auth_date?: number;
  hash?: string;
  start_param?: string;
  user?: MaxWebAppUser;
};

export type MaxRequestContactResult = string | { phone?: string | null } | void;

export interface MaxWebApp {
  initData?: string;
  initDataUnsafe?: MaxWebAppInitData;
  platform?: string;
  version?: string;
  ready?: () => void;
  requestContact?: () => Promise<MaxRequestContactResult>;
}

declare global {
  interface Window {
    WebApp?: MaxWebApp;
  }
}

export {}; 
