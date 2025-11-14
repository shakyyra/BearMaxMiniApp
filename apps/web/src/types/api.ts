export interface City {
  id: number;
  name: string;
}

export interface EducationLevel {
  id: number;
  name: string;
}

export interface FundRecipient {
  slug: string;
  name: string;
}

export interface FundItem {
  slug: string;
  name: string;
  url: string;
  is_expert: boolean;
  active_projects: number;
  help_money: string;
  cities: string[];
  main_city: string;
  image: string;
  recipients: FundRecipient[];
}

export interface FundsQuery {
  city: string;
  recipient: string;
  page: number;
  page_size: number;
}

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface FundsResponse {
  query: FundsQuery;
  pagination: Pagination;
  items: FundItem[];
}

export interface FundDonateResponse {
  slug: string;
  donate_url: string;
}

export interface MasterclassRequestPayload {
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  phone: string;
  email: string;
  city_id: number;
  education_id: number;
  description: string;
  account_id: number;
}

export interface MentorshipRequestPayload {
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  phone: string;
  email: string;
  account_id: number;
  city_id?: number | null;
  education_id?: number | null;
  description?: string | null;
  max_account_url?: string | null;
}

export interface ApiErrorShape {
  status?: string;
  message?: string;
  detail?: string;
}
