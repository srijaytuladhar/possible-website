import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DashboardStats,
  Article,
  TeamMember,
  Publication,
  SolutionProject,
  ContactInquiry,
  NewsletterSubscriber,
  Donation,
  SiteSettings
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

  deleteSolution(id: number): Observable<{ success: boolean; id: number }> {
    return this.http.delete<{ success: boolean; id: number }>(`${this.baseUrl}/solutions/${id}`);
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
}
