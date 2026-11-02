import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Publication } from '../../core/models';

@Component({
  selector: 'app-publications-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pubs-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Publications & Reports</h1>
          <p class="page-subtitle">Manage Annual Impact Reports, peer-reviewed Research Papers, Briefs, and Financial Statements</p>
        </div>
        <button class="btn btn-primary" (click)="openCreateModal()">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Upload Document</span>
        </button>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- Filter Tabs -->
      <div class="card filter-bar">
        <div class="category-pills">
          <button
            *ngFor="let cat of categories"
            type="button"
            class="cat-pill"
            [class.active]="selectedCategory === cat.value"
            (click)="setCategory(cat.value)"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="search-box">
          <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            class="form-input search-input"
            placeholder="Search publication by title or topic..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
          />
        </div>
      </div>

      <!-- Publications Table -->
      <div class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 70px;">Cover</th>
                <th>Publication Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Period / Year</th>
                <th>File Link</th>
                <th style="width: 120px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of publications">
                <td>
                  <div class="cover-thumb-wrap">
                    <img [src]="p.cover_image" [alt]="p.title" class="cover-img" (error)="onCoverError($event)" />
                  </div>
                </td>
                <td>
                  <div class="pub-info">
                    <strong class="pub-title">{{ p.title }}</strong>
                    <span *ngIf="p.description" class="pub-desc">{{ p.description }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge" [ngClass]="{
                    'badge-pink': p.category === 'impact-reports',
                    'badge-purple': p.category === 'research-papers',
                    'badge-blue': p.category === 'research-briefs',
                    'badge-warning': p.category === 'financial-reports',
                    'badge-success': p.category === 'disclosures'
                  }">
                    {{ getCategoryLabel(p.category) }}
                  </span>
                </td>
                <td>
                  <span class="type-pill">{{ p.sub_type || 'PDF Report' }}</span>
                </td>
                <td>
                  <span class="text-xs text-muted">{{ p.date_display || '—' }}</span>
                </td>
                <td>
                  <a *ngIf="p.link_url" [href]="p.link_url" target="_blank" class="download-link" title="Open document">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View</span>
                  </a>
                  <span *ngIf="!p.link_url" class="text-xs text-muted">—</span>
                </td>
                <td style="text-align: right;">
                  <div class="action-buttons">
                    <button class="icon-btn edit" (click)="openEditModal(p)" title="Edit publication">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button class="icon-btn delete" (click)="confirmDelete(p)" title="Delete publication">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr *ngIf="!loading && !publications.length">
                <td colspan="7" class="empty-state">
                  <p>No publications found</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add / Edit Modal -->
      <div *ngIf="isModalOpen" class="modal-backdrop" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ editingId ? 'Edit Publication' : 'Add New Publication' }}</h3>
            <button class="close-btn" (click)="closeModal()">&times;</button>
          </div>

          <form (ngSubmit)="savePublication()">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Document Title *</label>
                <input
                  type="text"
                  class="form-input"
                  name="title"
                  [(ngModel)]="formData.title"
                  required
                  placeholder="e.g. 2025 Annual Impact Report"
                />
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Category *</label>
                  <select class="form-select" name="category" [(ngModel)]="formData.category" required>
                    <option value="impact-reports">Annual Impact Report</option>
                    <option value="research-papers">Research Paper (Peer-Reviewed)</option>
                    <option value="research-briefs">Research Brief / Policy</option>
                    <option value="financial-reports">Audited Financial Statement / Form 990</option>
                    <option value="disclosures">Conflict of Interest & Disclosures</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Document Sub-Type</label>
                  <input
                    type="text"
                    class="form-input"
                    name="sub_type"
                    [(ngModel)]="formData.sub_type"
                    placeholder="e.g. PDF Report, Journal Article, Brief, IRS Form 990"
                  />
                </div>
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Display Period / Year</label>
                  <input
                    type="text"
                    class="form-input"
                    name="date_display"
                    [(ngModel)]="formData.date_display"
                    placeholder="e.g. August 01, 2024 - July 31, 2025"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">PDF or External URL *</label>
                  <input
                    type="text"
                    class="form-input"
                    name="link_url"
                    [(ngModel)]="formData.link_url"
                    placeholder="/annual-impact-report/AIR-2025.pdf or https://..."
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Cover Thumbnail Image URL</label>
                <input
                  type="text"
                  class="form-input"
                  name="cover_image"
                  [(ngModel)]="formData.cover_image"
                  placeholder="/annual-impact-report/thumbnails/... or https://..."
                />
              </div>

              <div class="form-group">
                <label class="form-label">Description / Summary</label>
                <textarea
                  class="form-textarea"
                  rows="3"
                  name="description"
                  [(ngModel)]="formData.description"
                  placeholder="Abstract or key findings summarized in this document..."
                ></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="saving">
                <span *ngIf="saving" class="spinner"></span>
                <span *ngIf="!saving">{{ editingId ? 'Save Changes' : 'Upload Publication' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation -->
      <div *ngIf="itemToDelete" class="modal-backdrop" (click)="itemToDelete = null">
        <div class="modal-content sm-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Confirm Delete</h3>
            <button class="close-btn" (click)="itemToDelete = null">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>"{{ itemToDelete.title }}"</strong>?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="itemToDelete = null">Cancel</button>
            <button type="button" class="btn btn-danger" (click)="deleteConfirmed()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pubs-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); }
    .page-subtitle { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem; }

    .toast-banner { padding: 0.75rem 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; font-weight: 500; }
    .toast-banner.success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: inherit; }

    .filter-bar { padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
    .category-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .cat-pill { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 0.35rem 0.875rem; border-radius: 9999px; font-size: 0.8125rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.15s; }
    .cat-pill:hover { background: #e2e8f0; }
    .cat-pill.active { background: var(--accent-purple); border-color: var(--accent-purple); color: white; }

    .search-box { position: relative; min-width: 280px; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); width: 1rem; height: 1rem; color: #94a3b8; }
    .search-input { padding-left: 2.25rem; font-size: 0.8125rem; }

    .table-card { overflow: hidden; }
    .table-responsive { overflow-x: auto; }

    .cover-thumb-wrap { width: 42px; height: 56px; border-radius: var(--radius-sm); overflow: hidden; background: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; }
    .cover-img { width: 100%; height: 100%; object-fit: cover; }

    .pub-info { display: flex; flex-direction: column; max-width: 380px; }
    .pub-title { font-size: 0.875rem; color: var(--text-main); }
    .pub-desc { font-size: 0.75rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }

    .type-pill { font-size: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.15rem 0.5rem; border-radius: 4px; color: #475569; }

    .download-link { display: inline-flex; align-items: center; gap: 0.25rem; color: var(--secondary-blue); font-size: 0.8125rem; font-weight: 600; text-decoration: none; }
    .download-link:hover { text-decoration: underline; }

    .action-buttons { display: flex; align-items: center; justify-content: flex-end; gap: 0.375rem; }
    .icon-btn { width: 32px; height: 32px; border-radius: var(--radius-sm); border: 1px solid var(--surface-border); background: white; color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
    .icon-btn.edit:hover { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
    .icon-btn.delete:hover { background: #fef2f2; color: #dc2626; border-color: #fecaca; }

    .empty-state { text-align: center; padding: 3rem !important; color: var(--text-muted); }

    .modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--surface-border); display: flex; align-items: center; justify-content: space-between; }
    .modal-header h3 { font-size: 1.125rem; font-weight: 700; color: var(--text-main); }
    .close-btn { background: none; border: none; font-size: 1.5rem; color: var(--text-muted); cursor: pointer; }
    .modal-body { padding: 1.5rem; overflow-y: auto; max-height: calc(85vh - 130px); }
    .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--surface-border); display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; background: #f8fafc; border-radius: 0 0 var(--radius-xl) var(--radius-xl); }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .sm-modal { max-width: 440px; }

    .spinner { width: 1rem; height: 1rem; border: 2px solid rgba(255, 255, 255, 0.4); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class PublicationsListComponent implements OnInit {
  publications: Publication[] = [];
  categories = [
    { label: 'All Publications', value: 'All' },
    { label: 'Impact Reports', value: 'impact-reports' },
    { label: 'Research Papers', value: 'research-papers' },
    { label: 'Research Briefs', value: 'research-briefs' },
    { label: 'Financial Reports', value: 'financial-reports' },
    { label: 'Disclosures', value: 'disclosures' },
  ];
  selectedCategory = 'All';
  searchQuery = '';
  loading = false;
  saving = false;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  isModalOpen = false;
  editingId: number | null = null;
  formData: Partial<Publication> = {
    title: '',
    category: 'impact-reports',
    sub_type: 'PDF Report',
    date_display: '',
    link_url: '',
    cover_image: '',
    description: ''
  };

  itemToDelete: Publication | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPublications();
  }

  loadPublications() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getPublications(this.selectedCategory, this.searchQuery).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.publications = res.publications || [];
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load publications', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.loadPublications();
  }

  onSearch() {
    this.loadPublications();
  }

  getCategoryLabel(cat: string): string {
    switch (cat) {
      case 'impact-reports': return 'Impact Report';
      case 'research-papers': return 'Research Paper';
      case 'research-briefs': return 'Brief';
      case 'financial-reports': return 'Financials';
      case 'disclosures': return 'FCOI';
      default: return cat;
    }
  }

  openCreateModal() {
    this.editingId = null;
    this.formData = {
      title: '',
      category: 'impact-reports',
      sub_type: 'PDF Report',
      date_display: 'Fiscal Year 2025',
      link_url: '/annual-impact-report/Possible_AIR-2025.pdf',
      cover_image: '/annual-impact-report/thumbnails/Possible_AIR-2025.webp',
      description: ''
    };
    this.isModalOpen = true;
  }

  openEditModal(p: Publication) {
    this.editingId = p.id;
    this.formData = { ...p };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingId = null;
  }

  savePublication() {
    if (!this.formData.title || !this.formData.category) {
      this.showToast('Title and category are required', 'error');
      return;
    }

    this.saving = true;

    if (this.editingId) {
      this.apiService.updatePublication(this.editingId, this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Publication updated successfully', 'success');
            this.closeModal();
            this.loadPublications();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to update publication', 'error');
        }
      });
    } else {
      this.apiService.createPublication(this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Publication uploaded successfully', 'success');
            this.closeModal();
            this.loadPublications();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to create publication', 'error');
        }
      });
    }
  }

  confirmDelete(p: Publication) {
    this.itemToDelete = p;
  }

  deleteConfirmed() {
    if (!this.itemToDelete) return;
    this.apiService.deletePublication(this.itemToDelete.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.itemToDelete = null;
          this.showToast('Publication removed successfully', 'success');
          this.loadPublications();
        }
      },
      error: () => {
        this.showToast('Failed to delete publication', 'error');
      }
    });
  }

  onCoverError(e: any) {
    e.target.src = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&h=300&q=80';
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => { this.toastMessage = ''; }, 4000);
  }
}
