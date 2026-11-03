import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ContactInquiry } from '../../core/models';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contacts-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Website Messages & Inquiries</h1>
          <p class="page-subtitle">Review and manage communications sent from the public Contact Us form</p>
        </div>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- Filter Bar -->
      <div class="card filter-bar">
        <div class="status-pills">
          <button
            *ngFor="let s of statuses"
            type="button"
            class="status-pill"
            [class.active]="selectedStatus === s.value"
            (click)="setStatus(s.value)"
          >
            {{ s.label }}
          </button>
        </div>
      </div>

      <!-- Inquiries Table -->
      <div class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Target Office</th>
                <th>Received</th>
                <th>Status</th>
                <th style="width: 100px; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of inquiries" [class.unread]="item.status === 'NEW'">
                <td>
                  <div class="sender-info">
                    <strong class="sender-name">{{ item.name }}</strong>
                    <span class="sender-email">{{ item.email }}</span>
                  </div>
                </td>
                <td>
                  <div class="msg-snippet">
                    <strong>{{ item.subject || 'Website Inquiry' }}</strong>
                    <span class="text-xs text-muted">{{ item.message }}</span>
                  </div>
                </td>
                <td>
                  <span class="office-pill">{{ item.office_entity || 'Sambhav (Possible)' }}</span>
                </td>
                <td>
                  <span class="text-xs text-muted">{{ item.created_at | date:'medium' }}</span>
                </td>
                <td>
                  <span class="badge" [ngClass]="{
                    'badge-danger': item.status === 'NEW',
                    'badge-warning': item.status === 'READ',
                    'badge-success': item.status === 'REPLIED',
                    'badge-purple': item.status === 'ARCHIVED'
                  }">
                    {{ item.status }}
                  </span>
                </td>
                <td style="text-align: right;">
                  <button class="btn btn-sm btn-secondary" (click)="openDetailModal(item)">
                    View Message
                  </button>
                </td>
              </tr>

              <tr *ngIf="!loading && !inquiries.length">
                <td colspan="6" class="empty-state">
                  <p>No inquiries found</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Message Detail Modal -->
      <div *ngIf="activeInquiry" class="modal-backdrop" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Inquiry Details</h3>
            <button class="close-btn" (click)="closeModal()">&times;</button>
          </div>

          <div class="modal-body space-y-4">
            <div class="inquiry-meta-box">
              <div class="meta-row">
                <span class="meta-title">From:</span>
                <strong>{{ activeInquiry.name }}</strong> &lt;{{ activeInquiry.email }}&gt;
              </div>
              <div class="meta-row">
                <span class="meta-title">Office:</span>
                <span>{{ activeInquiry.office_entity }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-title">Received:</span>
                <span>{{ activeInquiry.created_at | date:'fullDate' }} at {{ activeInquiry.created_at | date:'shortTime' }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-title">Subject:</span>
                <span class="font-semibold">{{ activeInquiry.subject || 'General Inquiry' }}</span>
              </div>
            </div>

            <div class="message-content-box">
              <h4>Message Text:</h4>
              <p class="message-text">{{ activeInquiry.message }}</p>
            </div>

            <div class="admin-controls-box">
              <div class="form-group">
                <label class="form-label">Inquiry Status</label>
                <select class="form-select" [(ngModel)]="activeInquiry.status">
                  <option value="NEW">NEW</option>
                  <option value="READ">READ</option>
                  <option value="REPLIED">REPLIED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Internal Administrator Notes</label>
                <textarea
                  class="form-textarea"
                  rows="3"
                  [(ngModel)]="activeInquiry.admin_notes"
                  placeholder="Record internal notes, staff assigned, or follow-up phone call dates..."
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer justify-between">
            <button type="button" class="btn btn-danger btn-sm" (click)="deleteInquiry(activeInquiry)">
              Delete Inquiry
            </button>
            <div class="flex gap-2">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
              <button type="button" class="btn btn-primary" (click)="saveInquiryChanges()">
                Save Status & Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contacts-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; align-items: center; justify-content: space-between; }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); }
    .page-subtitle { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem; }

    .toast-banner { padding: 0.75rem 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; font-weight: 500; }
    .toast-banner.success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: inherit; }

    .filter-bar { padding: 1rem 1.25rem; }
    .status-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .status-pill { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 0.35rem 0.875rem; border-radius: 9999px; font-size: 0.8125rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.15s; }
    .status-pill:hover { background: #e2e8f0; }
    .status-pill.active { background: var(--text-main); border-color: var(--text-main); color: white; }

    .table-card { overflow: hidden; }
    .table-responsive { overflow-x: auto; }

    tr.unread td { background-color: #fffdfd; font-weight: 500; }

    .sender-info { display: flex; flex-direction: column; }
    .sender-name { font-size: 0.875rem; color: var(--text-main); }
    .sender-email { font-size: 0.75rem; color: var(--text-muted); }

    .msg-snippet { display: flex; flex-direction: column; max-width: 380px; }
    .msg-snippet span { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }

    .office-pill { font-size: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px; color: #475569; }

    .empty-state { text-align: center; padding: 3rem !important; color: var(--text-muted); }

    .modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--surface-border); display: flex; align-items: center; justify-content: space-between; }
    .modal-header h3 { font-size: 1.125rem; font-weight: 700; color: var(--text-main); }
    .close-btn { background: none; border: none; font-size: 1.5rem; color: var(--text-muted); cursor: pointer; }
    .modal-body { padding: 1.5rem; overflow-y: auto; max-height: calc(85vh - 130px); }
    .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--surface-border); display: flex; align-items: center; background: #f8fafc; border-radius: 0 0 var(--radius-xl) var(--radius-xl); }

    .inquiry-meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; }
    .meta-row { display: flex; gap: 0.5rem; }
    .meta-title { color: var(--text-muted); width: 70px; font-weight: 600; }

    .message-content-box { background: white; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 1rem; }
    .message-content-box h4 { font-size: 0.8125rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; }
    .message-text { font-size: 0.9375rem; color: var(--text-main); line-height: 1.6; white-space: pre-line; }

    .admin-controls-box { border-top: 1px dashed #cbd5e1; pt: 1rem; }
  `]
})
export class ContactsListComponent implements OnInit {
  inquiries: ContactInquiry[] = [];
  statuses = [
    { label: 'All Messages', value: 'ALL' },
    { label: 'New', value: 'NEW' },
    { label: 'Read', value: 'READ' },
    { label: 'Replied', value: 'REPLIED' },
    { label: 'Archived', value: 'ARCHIVED' },
  ];
  selectedStatus = 'ALL';
  loading = false;
  activeInquiry: ContactInquiry | null = null;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadInquiries();
  }

  loadInquiries() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getInquiries(this.selectedStatus).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.inquiries = res.inquiries || [];
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load inquiries', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  setStatus(status: string) {
    this.selectedStatus = status;
    this.loadInquiries();
  }

  openDetailModal(item: ContactInquiry) {
    this.activeInquiry = { ...item };
    if (this.activeInquiry.status === 'NEW') {
      // Auto-transition to READ
      this.apiService.updateInquiry(this.activeInquiry.id, { status: 'READ' }).subscribe({
        next: () => {
          if (this.activeInquiry) this.activeInquiry.status = 'READ';
          item.status = 'READ';
        }
      });
    }
  }

  closeModal() {
    this.activeInquiry = null;
  }

  saveInquiryChanges() {
    if (!this.activeInquiry) return;
    this.apiService.updateInquiry(this.activeInquiry.id, {
      status: this.activeInquiry.status,
      admin_notes: this.activeInquiry.admin_notes
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('Inquiry status updated', 'success');
          this.closeModal();
          this.loadInquiries();
        }
      },
      error: () => {
        this.showToast('Failed to update inquiry', 'error');
      }
    });
  }

  deleteInquiry(item: ContactInquiry) {
    if (!confirm(`Are you sure you want to delete message from ${item.name}?`)) return;
    this.apiService.deleteInquiry(item.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('Inquiry deleted successfully', 'success');
          this.closeModal();
          this.loadInquiries();
        }
      },
      error: () => {
        this.showToast('Failed to delete inquiry', 'error');
      }
    });
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => { this.toastMessage = ''; }, 4000);
  }
}
