import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { NewsletterSubscriber } from '../../core/models';

@Component({
  selector: 'app-subscribers-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="subscribers-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Newsletter Subscribers</h1>
          <p class="page-subtitle">Subscribers registered via website footer and news articles</p>
        </div>
        <button class="btn btn-secondary" (click)="exportCSV()">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export CSV</span>
        </button>
      </div>

      <div class="card filter-bar">
        <div class="sub-counter">
          <span>Total Active Subscribers:</span>
          <strong>{{ subscribers.length }}</strong>
        </div>

        <div class="search-box">
          <input
            type="text"
            class="form-input search-input"
            placeholder="Search email..."
            [(ngModel)]="searchQuery"
          />
        </div>
      </div>

      <div class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Subscriber Email</th>
                <th>Sign-up Source</th>
                <th>Subscription Date</th>
                <th style="width: 80px; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let s of filteredSubscribers">
                <td>
                  <strong class="text-sm">{{ s.email }}</strong>
                </td>
                <td>
                  <span class="source-tag">{{ s.source || 'Website Footer' }}</span>
                </td>
                <td>
                  <span class="text-xs text-muted">{{ s.subscribed_at | date:'medium' }}</span>
                </td>
                <td style="text-align: right;">
                  <button class="icon-btn delete" (click)="removeSubscriber(s)" title="Remove subscriber">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr *ngIf="!loading && !filteredSubscribers.length">
                <td colspan="4" class="empty-state">
                  <p>No subscribers found</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .subscribers-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; align-items: center; justify-content: space-between; }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); }
    .page-subtitle { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem; }

    .filter-bar { padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .sub-counter { font-size: 0.875rem; color: #475569; display: flex; align-items: center; gap: 0.5rem; }
    .sub-counter strong { font-size: 1.125rem; color: var(--primary-pink); }

    .search-box { min-width: 260px; }
    .search-input { font-size: 0.8125rem; }

    .table-card { overflow: hidden; }
    .table-responsive { overflow-x: auto; }

    .source-tag { font-size: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px; color: #64748b; }

    .icon-btn.delete:hover { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
    .empty-state { text-align: center; padding: 3rem !important; color: var(--text-muted); }
  `]
})
export class SubscribersListComponent implements OnInit {
  subscribers: NewsletterSubscriber[] = [];
  searchQuery = '';
  loading = false;

  get filteredSubscribers() {
    if (!this.searchQuery) return this.subscribers;
    const q = this.searchQuery.toLowerCase();
    return this.subscribers.filter(s => s.email.toLowerCase().includes(q));
  }

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSubscribers();
  }

  loadSubscribers() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getSubscribers().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.subscribers = res.subscribers || [];
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  removeSubscriber(s: NewsletterSubscriber) {
    if (!confirm(`Remove ${s.email} from newsletter list?`)) return;
    this.apiService.deleteSubscriber(s.id).subscribe({
      next: () => {
        this.subscribers = this.subscribers.filter(item => item.id !== s.id);
      }
    });
  }

  exportCSV() {
    if (!this.subscribers.length) return;
    const rows = [
      ['Email', 'Source', 'Subscribed At'],
      ...this.subscribers.map(s => [s.email, s.source, s.subscribed_at])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `possible-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
