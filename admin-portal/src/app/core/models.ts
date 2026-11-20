export interface AdminUser {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'CONTENT_MANAGER' | 'READ_ONLY' | string;
  is_active?: boolean;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Collaborator {
  id: number;
  name: string;
  organization?: string;
  category: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface WorkWithUsItem {
  id: number;
  section_type: 'job_posting' | 'traineeship' | 'value_card' | 'quote' | 'hero' | string;
  title: string;
  subtitle?: string;
  department?: string;
  location?: string;
  employment_type?: string;
  description: string;
  requirements?: string;
  link_url?: string;
  image_url?: string;
  deadline?: string;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface HomepageSectionItem {
  title: string;
  desc?: string;
  link?: string;
  icon?: string;
  theme?: string;
}

export interface HomepageSection {
  id: number;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string;
  badge?: string;
  image_url?: string;
  link_text?: string;
  link_url?: string;
  items?: HomepageSectionItem[];
  sort_order: number;
  is_published: boolean;
  updated_at?: string;
}

export interface RoleInfo {
  key: string;
  name: string;
  description: string;
  permissions: any;
}

export interface AuditLog {
  id: number;
  user_id?: number;
  username?: string;
  action: string;
  module: string;
  record_id?: string;
  details?: any;
  ip_address?: string;
  created_at: string;
}


export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: AdminUser;
  error?: string;
}

export interface DashboardStats {
  articles: { total: number; published: number };
  team: { total: number; usBoard: number; nepalBoard: number; staff: number; advisors: number };
  publications: { total: number; impactReports: number; researchPapers: number; researchBriefs: number; financialReports: number };
  solutions: { total: number; scale: number; test: number; innovate: number; pipeline: number };
  collaborators?: { total: number; active: number } | null;
  workWithUs?: { total: number; published: number } | null;
  users?: { total: number; active: number } | null;
  contacts?: { total: number; newCount: number } | null;
  subscribers?: { total: number } | null;
  donations?: { totalCount: number; totalAmount: number } | null;
  recentContacts?: ContactInquiry[];
  recentArticles: Article[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  desc_text: string;
  content: string;
  image_url: string;
  author: string;
  read_time: string;
  published_date: string;
  is_published: boolean;
  views_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'us_board' | 'nepal_board' | 'team_member' | 'advisor';
  image: string;
  bio: string;
  linkedin?: string;
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Publication {
  id: number;
  title: string;
  category: 'impact-reports' | 'research-papers' | 'research-briefs' | 'financial-reports' | 'disclosures';
  sub_type: string;
  description?: string;
  date_display?: string;
  link_url?: string;
  pdf_filename?: string;
  cover_image?: string;
  featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SolutionProject {
  id: number;
  slug: string;
  stage_id: string;
  sub_section_id?: string;
  sub_section_title?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  description: string;
  image_url?: string;
  link_text?: string;
  link_url?: string;
  publications_json?: any[];
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  office_entity?: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  source: string;
  is_active: boolean;
  subscribed_at: string;
}

export interface Donation {
  id: number;
  donor_name: string;
  donor_email: string;
  amount: number;
  currency: string;
  donation_type: string;
  campaign: string;
  status: string;
  transaction_id?: string;
  message?: string;
  created_at: string;
}

export interface SiteSettings {
  contact_nepal_office?: {
    entity: string;
    address: string;
    phone: string;
    phoneRaw: string;
    hours: string;
    email: string;
  };
  contact_us_office?: {
    entity: string;
    address: string;
    email: string;
  };
  social_links?: {
    twitter: string;
    linkedin: string;
    facebook: string;
  };
}
