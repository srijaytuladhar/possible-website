import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { DashboardStats } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <!-- Welcome Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Executive Dashboard</h1>
          <p class="page-subtitle">Real-time overview of Possible Health website metrics and database records</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-secondary" (click)="loadStats()" [disabled]="loading">
            <svg class="w-4 h-4" [class.animate-spin]="loading" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh Data</span>
          </button>
          <a routerLink="/news" class="btn btn-primary">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Article</span>
          </a>
        </div>
      </div>

      <!-- KPI Metrics Grid -->
      <div class="kpi-grid">
        <!-- Card 1: News Articles -->
        <div class="kpi-card card">
          <div class="kpi-top">
            <span class="kpi-label">News & Articles</span>
            <span class="kpi-icon-box pink">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </span>
          </div>
          <div class="kpi-value">{{ stats?.articles?.total || 0 }}</div>
          <div class="kpi-meta">
            <span class="text-success font-semibold">{{ stats?.articles?.published || 0 }} Live</span>
            <span class="dot">•</span>
            <a routerLink="/news" class="meta-link">Manage Articles &rarr;</a>
          </div>
        </div>

        <!-- Card 2: Team Members -->
        <div class="kpi-card card">
          <div class="kpi-top">
            <span class="kpi-label">Team Members</span>
            <span class="kpi-icon-box blue">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div class="kpi-value">{{ stats?.team?.total || 0 }}</div>
          <div class="kpi-meta">
            <span>{{ stats?.team?.nepalBoard || 0 }} NP Board, {{ stats?.team?.usBoard || 0 }} US Board</span>
            <span class="dot">•</span>
            <a routerLink="/team" class="meta-link">View Team &rarr;</a>
          </div>
        </div>

        <!-- Card 3: Publications -->
        <div class="kpi-card card">
          <div class="kpi-top">
            <span class="kpi-label">Publications</span>
            <span class="kpi-icon-box purple">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
          </div>
          <div class="kpi-value">{{ stats?.publications?.total || 0 }}</div>
          <div class="kpi-meta">
            <span>{{ stats?.publications?.impactReports || 0 }} Impact Reports, {{ stats?.publications?.researchPapers || 0 }} Papers</span>
            <span class="dot">•</span>
            <a routerLink="/publications" class="meta-link">View All &rarr;</a>
          </div>
        </div>

        <!-- Card 4: Inquiries & Messages -->
        <div class="kpi-card card">
          <div class="kpi-top">
            <span class="kpi-label">Contact Messages</span>
            <span class="kpi-icon-box amber">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          <div class="kpi-value">{{ stats?.contacts?.total || 0 }}</div>
          <div class="kpi-meta">
            <span class="text-danger font-semibold">{{ stats?.contacts?.newCount || 0 }} New inquiries</span>
            <span class="dot">•</span>
            <a routerLink="/contacts" class="meta-link">Review &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="section-container">
        <h2 class="section-title">Quick Administration Actions</h2>
        <div class="actions-grid">
          <a routerLink="/news" class="action-card card">
            <div class="action-icon pink">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3>Publish News Post</h3>
              <p>Add field updates, press announcements or research notes</p>
            </div>
          </a>

          <a routerLink="/team" class="action-card card">
            <div class="action-icon blue">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3>Add Team Member</h3>
              <p>Add leadership, board members or research advisors</p>
            </div>
          </a>

          <a routerLink="/publications" class="action-card card">
            <div class="action-icon purple">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3>Upload Publication</h3>
              <p>Manage impact reports, research briefs & financial PDFs</p>
            </div>
          </a>

          <a routerLink="/contacts" class="action-card card">
            <div class="action-icon amber">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3>View Inquiries</h3>
              <p>Respond to partner queries and website contact messages</p>
            </div>
          </a>
        </div>
      </div>

      <!-- Two-Column Recent Activity Section -->
      <div class="activity-columns">
        <!-- Recent Inquiries Table -->
        <div class="card activity-card">
          <div class="card-title-bar">
            <h3>Recent Inquiries</h3>
            <a routerLink="/contacts" class="btn btn-sm btn-secondary">View All</a>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of stats?.recentContacts">
                  <td>
                    <div class="sender-cell">
                      <strong>{{ item.name }}</strong>
                      <span class="sender-email">{{ item.email }}</span>
                    </div>
                  </td>
                  <td>{{ item.subject || 'Website Inquiry' }}</td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'badge-danger': item.status === 'NEW',
                      'badge-warning': item.status === 'READ',
                      'badge-success': item.status === 'REPLIED'
                    }">{{ item.status }}</span>
                  </td>
                  <td class="text-muted text-xs">{{ item.created_at | date:'shortDate' }}</td>
                </tr>
                <tr *ngIf="!stats?.recentContacts?.length">
                  <td colspan="4" class="empty-cell">No inquiries yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Articles Table -->
        <div class="card activity-card">
          <div class="card-title-bar">
            <h3>Recent Articles</h3>
            <a routerLink="/news" class="btn btn-sm btn-secondary">Manage</a>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let a of stats?.recentArticles">
                  <td>
                    <strong class="line-clamp-1">{{ a.title }}</strong>
                  </td>
                  <td>
                    <span class="badge badge-pink">{{ a.category }}</span>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="a.is_published ? 'badge-success' : 'badge-warning'">
                      {{ a.is_published ? 'Live' : 'Draft' }}
                    </span>
                  </td>
                  <td class="text-muted text-xs">{{ a.published_date | date:'shortDate' }}</td>
                </tr>
                <tr *ngIf="!stats?.recentArticles?.length">
                  <td colspan="4" class="empty-cell">No articles available.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .page-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .page-subtitle {
      color: var(--text-muted);
      font-size: 0.9375rem;
      margin-top: 0.25rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
    }

    .kpi-card {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .kpi-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .kpi-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .kpi-icon-box {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .kpi-icon-box.pink { background: var(--primary-pink-light); color: var(--primary-pink); }
    .kpi-icon-box.blue { background: var(--secondary-blue-light); color: var(--secondary-blue); }
    .kpi-icon-box.purple { background: var(--accent-purple-light); color: var(--accent-purple); }
    .kpi-icon-box.amber { background: var(--warning-bg); color: var(--warning); }

    .kpi-value {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
      line-height: 1.1;
      margin-bottom: 0.75rem;
    }

    .kpi-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .dot { color: #cbd5e1; }

    .meta-link {
      color: var(--primary-pink);
      text-decoration: none;
      font-weight: 600;
      margin-left: auto;
    }

    .meta-link:hover { text-decoration: underline; }

    .section-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 1rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
    }

    .action-card {
      padding: 1.25rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
    }

    .action-card:hover {
      transform: translateY(-2px);
      border-color: #cbd5e1;
    }

    .action-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .action-icon.pink { background: var(--primary-pink-light); color: var(--primary-pink); }
    .action-icon.blue { background: var(--secondary-blue-light); color: var(--secondary-blue); }
    .action-icon.purple { background: var(--accent-purple-light); color: var(--accent-purple); }
    .action-icon.amber { background: var(--warning-bg); color: var(--warning); }

    .action-card h3 {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.25rem;
    }

    .action-card p {
      font-size: 0.8125rem;
      color: var(--text-muted);
      line-height: 1.4;
    }

    .activity-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 1.5rem;
    }

    .activity-card {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
    }

    .card-title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .card-title-bar h3 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .table-responsive {
      overflow-x: auto;
    }

    .sender-cell {
      display: flex;
      flex-direction: column;
    }

    .sender-email {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .empty-cell {
      text-align: center;
      color: var(--text-muted);
      padding: 2rem !important;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = false;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getStats().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.stats) {
          this.stats = res.stats;
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
