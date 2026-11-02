import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Donation } from '../../core/models';

@Component({
  selector: 'app-donations-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="donations-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Donations & Pledges</h1>
          <p class="page-subtitle">Track supporter pledges and donations across healthcare campaigns</p>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div class="metric-row">
        <div class="card metric-card">
          <span class="metric-label">Total Amount Raised</span>
          <div class="metric-val text-success">
            $ {{ totalRaised | number:'1.2-2' }}
          </div>
          <span class="metric-sub">Across all healthcare campaigns</span>
        </div>

        <div class="card metric-card">
          <span class="metric-label">Completed Transactions</span>
          <div class="metric-val">
            {{ donations.length }}
          </div>
          <span class="metric-sub">Active supporter contributions</span>
        </div>
      </div>

      <div class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Campaign</th>
                <th>Frequency</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let d of donations">
                <td>
                  <div class="donor-cell">
                    <strong>{{ d.donor_name }}</strong>
                    <span class="text-xs text-muted">{{ d.donor_email }}</span>
                  </div>
                </td>
                <td>
                  <span class="font-medium text-sm">{{ d.campaign }}</span>
                </td>
                <td>
                  <span class="badge" [ngClass]="d.donation_type === 'MONTHLY' ? 'badge-purple' : 'badge-blue'">
                    {{ d.donation_type }}
                  </span>
                </td>
                <td>
                  <strong class="amount-val">{{ d.currency }} {{ d.amount | number:'1.2-2' }}</strong>
                </td>
                <td>
                  <code class="txn-code">{{ d.transaction_id || '—' }}</code>
                </td>
                <td>
                  <span class="badge badge-success">{{ d.status }}</span>
                </td>
                <td>
                  <span class="text-xs text-muted">{{ d.created_at | date:'mediumDate' }}</span>
                </td>
              </tr>

              <tr *ngIf="!loading && !donations.length">
                <td colspan="7" class="empty-state">
                  <p>No donations records found</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .donations-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; align-items: center; justify-content: space-between; }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); }
    .page-subtitle { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem; }

    .metric-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
    .metric-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; }
    .metric-label { font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); }
    .metric-val { font-size: 2rem; font-weight: 800; font-family: 'Outfit', sans-serif; color: var(--text-main); }
    .metric-sub { font-size: 0.75rem; color: #64748b; }

    .table-card { overflow: hidden; }
    .table-responsive { overflow-x: auto; }

    .donor-cell { display: flex; flex-direction: column; }
    .amount-val { font-family: 'Outfit', sans-serif; color: #047857; font-size: 0.9375rem; }
    .txn-code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.75rem; color: #334155; }
    .empty-state { text-align: center; padding: 3rem !important; color: var(--text-muted); }
  `]
})
export class DonationsListComponent implements OnInit {
  donations: Donation[] = [];
  loading = false;

  get totalRaised(): number {
    return this.donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  }

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getDonations().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.donations = res.donations || [];
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
