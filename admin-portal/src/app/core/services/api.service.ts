import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AdminUser,
  DashboardStats,
  Article,
  TeamMember,
  Publication,
  SolutionProject,
  ContactInquiry,
  NewsletterSubscriber,
  Donation,
  SiteSettings,
  Collaborator,
  WorkWithUsItem,
  HomepageSection,
  RoleInfo,
  AuditLog
} from '../models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Dashboard Stats
  getStats(): Observable<{ success: boolean; stats: DashboardStats }> {
    return this.http.get<{ success: boolean; stats: DashboardStats }>(`${this.baseUrl}/stats`);
  }

  // --- NEWS ARTICLES CRUD ---
  getArticles(category?: string, search?: string, all = true): Observable<{ success: boolean; articles: Article[] }> {
    let params = new HttpParams().set('all', all ? 'true' : 'false');
    if (category && category !== 'All') params = params.set('category', category);
    if (search) params = params.set('search', search);
    return this.http.get<{ success: boolean; articles: Article[] }>(`${this.baseUrl}/news`, { params });
  }

  getArticle(id: number | string): Observable<{ success: boolean; article: Article }> {
    return this.http.get<{ success: boolean; article: Article }>(`${this.baseUrl}/news/${id}`);
  }

  createArticle(article: Partial<Article>): Observable<{ success: boolean; article: Article }> {
    return this.http.post<{ success: boolean; article: Article }>(`${this.baseUrl}/news`, article);
  }

  updateArticle(id: number | string, article: Partial<Article>): Observable<{ success: boolean; article: Article }> {
    return this.http.put<{ success: boolean; article: Article }>(`${this.baseUrl}/news/${id}`, article);
  }

  deleteArticle(id: number | string): Observable<{ success: boolean; id: number }> {
    return this.http.delete<{ success: boolean; id: number }>(`${this.baseUrl}/news/${id}`);
  }

  // --- ARTICLE CATEGORIES CRUD ---
  getArticleCategories(): Observable<{ success: boolean; categories: { id: number; name: string; description?: string }[] }> {
    return this.http.get<{ success: boolean; categories: { id: number; name: string; description?: string }[] }>(`${this.baseUrl}/news/categories`);
  }

  createArticleCategory(name: string, description?: string): Observable<{ success: boolean; message: string; category: any }> {
    return this.http.post<{ success: boolean; message: string; category: any }>(`${this.baseUrl}/news/categories`, { name, description });
  }

  updateArticleCategory(id: number, name: string, description?: string): Observable<{ success: boolean; message: string; category: any }> {
    return this.http.put<{ success: boolean; message: string; category: any }>(`${this.baseUrl}/news/categories`, { id, name, description });
  }

  deleteArticleCategory(id: number): Observable<{ success: boolean; message: string; id: number }> {
    return this.http.delete<{ success: boolean; message: string; id: number }>(`${this.baseUrl}/news/categories?id=${id}`);
  }

  // --- TEAM MEMBERS CRUD ---
  getTeamMembers(category?: string, search?: string, all = true): Observable<{ success: boolean; team: TeamMember[] }> {
    let params = new HttpParams().set('all', all ? 'true' : 'false');
    if (category && category !== 'All') params = params.set('category', category);
    if (search) params = params.set('search', search);
    return this.http.get<{ success: boolean; team: TeamMember[] }>(`${this.baseUrl}/team`, { params });
  }

  getTeamMember(id: string): Observable<{ success: boolean; member: TeamMember }> {
    return this.http.get<{ success: boolean; member: TeamMember }>(`${this.baseUrl}/team/${id}`);
  }

  createTeamMember(member: Partial<TeamMember>): Observable<{ success: boolean; member: TeamMember }> {
    return this.http.post<{ success: boolean; member: TeamMember }>(`${this.baseUrl}/team`, member);
  }

  updateTeamMember(id: string, member: Partial<TeamMember>): Observable<{ success: boolean; member: TeamMember }> {
    return this.http.put<{ success: boolean; member: TeamMember }>(`${this.baseUrl}/team/${id}`, member);
  }

  deleteTeamMember(id: string): Observable<{ success: boolean; id: string }> {
    return this.http.delete<{ success: boolean; id: string }>(`${this.baseUrl}/team/${id}`);
  }

  reorderTeamMembers(items: { id: string; sort_order: number }[]): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/team/reorder`, { items });
  }

  // --- PUBLICATIONS CRUD ---
  getPublications(category?: string, search?: string): Observable<{ success: boolean; publications: Publication[] }> {
    let params = new HttpParams();
    if (category && category !== 'All') params = params.set('category', category);
    if (search) params = params.set('search', search);
    return this.http.get<{ success: boolean; publications: Publication[] }>(`${this.baseUrl}/publications`, { params });
  }

  createPublication(pub: Partial<Publication>): Observable<{ success: boolean; publication: Publication }> {
    return this.http.post<{ success: boolean; publication: Publication }>(`${this.baseUrl}/publications`, pub);
  }

  updatePublication(id: number, pub: Partial<Publication>): Observable<{ success: boolean; publication: Publication }> {
    return this.http.put<{ success: boolean; publication: Publication }>(`${this.baseUrl}/publications/${id}`, pub);
  }

  deletePublication(id: number): Observable<{ success: boolean; id: number }> {
    return this.http.delete<{ success: boolean; id: number }>(`${this.baseUrl}/publications/${id}`);
  }

  // --- SOLUTIONS CRUD ---
  getSolutions(stage?: string): Observable<{ success: boolean; solutions: SolutionProject[] }> {
    let params = new HttpParams();
    if (stage && stage !== 'all') params = params.set('stage', stage);
    return this.http.get<{ success: boolean; solutions: SolutionProject[] }>(`${this.baseUrl}/solutions`, { params });
  }

  createSolution(sol: Partial<SolutionProject>): Observable<{ success: boolean; solution: SolutionProject }> {
    return this.http.post<{ success: boolean; solution: SolutionProject }>(`${this.baseUrl}/solutions`, sol);
  }

  updateSolution(id: number, sol: Partial<SolutionProject>): Observable<{ success: boolean; solution: SolutionProject }> {
    return this.http.put<{ success: boolean; solution: SolutionProject }>(`${this.baseUrl}/solutions/${id}`, sol);
  }

  deleteSolution(id: number | string): Observable<{ success: boolean; id: number }> {
    return this.http.delete<{ success: boolean; id: number }>(`${this.baseUrl}/solutions/${id}`);
  }

  // --- SOLUTIONS CATEGORIES CRUD ---
  getSolutionCategories(): Observable<{ success: boolean; categories: { id: number; slug: string; name: string; description?: string }[] }> {
    return this.http.get<{ success: boolean; categories: { id: number; slug: string; name: string; description?: string }[] }>(`${this.baseUrl}/solutions/categories`);
  }

  createSolutionCategory(name: string, slug?: string, description?: string): Observable<{ success: boolean; message: string; category: any }> {
    return this.http.post<{ success: boolean; message: string; category: any }>(`${this.baseUrl}/solutions/categories`, { name, slug, description });
  }

  updateSolutionCategory(id: number, name: string, slug?: string, description?: string): Observable<{ success: boolean; message: string; category: any }> {
    return this.http.put<{ success: boolean; message: string; category: any }>(`${this.baseUrl}/solutions/categories`, { id, name, slug, description });
  }

  deleteSolutionCategory(id: number): Observable<{ success: boolean; message: string; id: number }> {
    return this.http.delete<{ success: boolean; message: string; id: number }>(`${this.baseUrl}/solutions/categories?id=${id}`);
  }

  // --- CONTACT INQUIRIES ---
  getInquiries(status?: string): Observable<{ success: boolean; inquiries: ContactInquiry[] }> {
    let params = new HttpParams();
    if (status && status !== 'ALL') params = params.set('status', status);
    return this.http.get<{ success: boolean; inquiries: ContactInquiry[] }>(`${this.baseUrl}/contacts`, { params });
  }

  updateInquiry(id: number, data: { status?: string; admin_notes?: string }): Observable<{ success: boolean; inquiry: ContactInquiry }> {
    return this.http.put<{ success: boolean; inquiry: ContactInquiry }>(`${this.baseUrl}/contacts/${id}`, data);
  }

  deleteInquiry(id: number): Observable<{ success: boolean; id: number }> {
    return this.http.delete<{ success: boolean; id: number }>(`${this.baseUrl}/contacts/${id}`);
  }

  // --- NEWSLETTER SUBSCRIBERS ---
  getSubscribers(): Observable<{ success: boolean; subscribers: NewsletterSubscriber[] }> {
    return this.http.get<{ success: boolean; subscribers: NewsletterSubscriber[] }>(`${this.baseUrl}/newsletter`);
  }

  deleteSubscriber(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/newsletter?id=${id}`);
  }

  // --- DONATIONS ---
  getDonations(): Observable<{ success: boolean; donations: Donation[] }> {
    return this.http.get<{ success: boolean; donations: Donation[] }>(`${this.baseUrl}/donations`);
  }

  // --- SETTINGS ---
  getSettings(): Observable<{ success: boolean; settings: SiteSettings }> {
    return this.http.get<{ success: boolean; settings: SiteSettings }>(`${this.baseUrl}/settings`);
  }

  updateSetting(key: string, value: any): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.baseUrl}/settings`, { key, value });
  }

  // --- COLLABORATORS CRUD ---
  getCollaborators(category?: string, search?: string, all = true): Observable<{ success: boolean; collaborators: Collaborator[]; total: number }> {
    let params = new HttpParams().set('all', all ? 'true' : 'false');
    if (category && category !== 'All') params = params.set('category', category);
    if (search) params = params.set('search', search);
    return this.http.get<{ success: boolean; collaborators: Collaborator[]; total: number }>(`${this.baseUrl}/collaborators`, { params });
  }

  getCollaborator(id: number): Observable<{ success: boolean; collaborator: Collaborator }> {
    return this.http.get<{ success: boolean; collaborator: Collaborator }>(`${this.baseUrl}/collaborators/${id}`);
  }

  createCollaborator(data: Partial<Collaborator>): Observable<{ success: boolean; message: string; collaborator: Collaborator }> {
    return this.http.post<{ success: boolean; message: string; collaborator: Collaborator }>(`${this.baseUrl}/collaborators`, data);
  }

  updateCollaborator(id: number, data: Partial<Collaborator>): Observable<{ success: boolean; message: string; collaborator: Collaborator }> {
    return this.http.put<{ success: boolean; message: string; collaborator: Collaborator }>(`${this.baseUrl}/collaborators/${id}`, data);
  }

  deleteCollaborator(id: number): Observable<{ success: boolean; message: string; id: number }> {
    return this.http.delete<{ success: boolean; message: string; id: number }>(`${this.baseUrl}/collaborators/${id}`);
  }

  reorderCollaborators(items: { id: number; sort_order: number }[]): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/collaborators/reorder`, { items });
  }

  // --- WORK WITH US CRUD ---
  getWorkWithUsItems(sectionType?: string, search?: string, all = true): Observable<{ success: boolean; items: WorkWithUsItem[]; total: number }> {
    let params = new HttpParams().set('all', all ? 'true' : 'false');
    if (sectionType && sectionType !== 'all') params = params.set('section_type', sectionType);
    if (search) params = params.set('search', search);
    return this.http.get<{ success: boolean; items: WorkWithUsItem[]; total: number }>(`${this.baseUrl}/work-with-us`, { params });
  }

  getWorkWithUsItem(id: number): Observable<{ success: boolean; item: WorkWithUsItem }> {
    return this.http.get<{ success: boolean; item: WorkWithUsItem }>(`${this.baseUrl}/work-with-us/${id}`);
  }

  createWorkWithUsItem(data: Partial<WorkWithUsItem>): Observable<{ success: boolean; message: string; item: WorkWithUsItem }> {
    return this.http.post<{ success: boolean; message: string; item: WorkWithUsItem }>(`${this.baseUrl}/work-with-us`, data);
  }

  updateWorkWithUsItem(id: number, data: Partial<WorkWithUsItem>): Observable<{ success: boolean; message: string; item: WorkWithUsItem }> {
    return this.http.put<{ success: boolean; message: string; item: WorkWithUsItem }>(`${this.baseUrl}/work-with-us/${id}`, data);
  }

  deleteWorkWithUsItem(id: number): Observable<{ success: boolean; message: string; id: number }> {
    return this.http.delete<{ success: boolean; message: string; id: number }>(`${this.baseUrl}/work-with-us/${id}`);
  }

  reorderWorkWithUsItems(items: { id: number; sort_order: number }[]): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/work-with-us/reorder`, { items });
  }

  // --- HOMEPAGE CONTENT MANAGEMENT ---
  getHomepageSections(all = true): Observable<{ success: boolean; sections: HomepageSection[]; sectionsMap: Record<string, HomepageSection> }> {
    const params = new HttpParams().set('all', all ? 'true' : 'false');
    return this.http.get<{ success: boolean; sections: HomepageSection[]; sectionsMap: Record<string, HomepageSection> }>(`${this.baseUrl}/homepage`, { params });
  }

  updateHomepageSection(section: Partial<HomepageSection>): Observable<{ success: boolean; message: string; section: HomepageSection }> {
    return this.http.put<{ success: boolean; message: string; section: HomepageSection }>(`${this.baseUrl}/homepage`, section);
  }

  // --- USER MANAGEMENT (RBAC) ---
  getUsers(role?: string, status?: string, search?: string): Observable<{ success: boolean; users: AdminUser[]; total: number }> {
    let params = new HttpParams();
    if (role && role !== 'ALL') params = params.set('role', role);
    if (status && status !== 'ALL') params = params.set('status', status);
    if (search) params = params.set('search', search);
    return this.http.get<{ success: boolean; users: AdminUser[]; total: number }>(`${this.baseUrl}/users`, { params });
  }

  getUser(id: number): Observable<{ success: boolean; user: AdminUser }> {
    return this.http.get<{ success: boolean; user: AdminUser }>(`${this.baseUrl}/users/${id}`);
  }

  createUser(data: {
    username: string;
    full_name: string;
    email: string;
    phone?: string;
    role: string;
    password: string;
    is_active?: boolean;
  }): Observable<{ success: boolean; message: string; user: AdminUser }> {
    return this.http.post<{ success: boolean; message: string; user: AdminUser }>(`${this.baseUrl}/users`, data);
  }

  updateUser(id: number, data: Partial<AdminUser>): Observable<{ success: boolean; message: string; user: AdminUser }> {
    return this.http.put<{ success: boolean; message: string; user: AdminUser }>(`${this.baseUrl}/users/${id}`, data);
  }

  deleteUser(id: number): Observable<{ success: boolean; message: string; id: number }> {
    return this.http.delete<{ success: boolean; message: string; id: number }>(`${this.baseUrl}/users/${id}`);
  }

  resetUserPassword(id: number, new_password: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/users/${id}/reset-password`, { new_password });
  }

  getRoles(): Observable<{ success: boolean; roles: RoleInfo[] }> {
    return this.http.get<{ success: boolean; roles: RoleInfo[] }>(`${this.baseUrl}/users/roles`);
  }

  getAuditLogs(): Observable<{ success: boolean; logs: AuditLog[] }> {
    return this.http.get<{ success: boolean; logs: AuditLog[] }>(`${this.baseUrl}/audit-logs`);
  }

  // --- FILE UPLOAD ---
  uploadFile(file: File): Observable<{ success: boolean; url: string; filename: string; size: number; mimeType: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ success: boolean; url: string; filename: string; size: number; mimeType: string }>(`${this.baseUrl}/upload`, formData);
  }
}

