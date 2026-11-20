import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Collaborator } from '../../core/models';

@Component({
  selector: 'app-collaborators-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="collab-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Collaborators & Partners Directory</h1>
          <p class="page-subtitle">Manage public institutional, academic, government, and community collaborators displayed on the website.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" (click)="openCreateModal()" [disabled]="isReadOnly">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Collaborator</span>
          </button>
        </div>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- Filter & Search Bar -->
      <div class="card filter-bar">
        <div class="category-pills">
          <button
            *ngFor="let cat of categories"
            type="button"
            class="cat-pill"
            [class.active]="selectedCategory === cat"
            (click)="setCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>

        <div class="search-box">
          <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            class="form-input search-input"
            placeholder="Search collaborator or organization..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state card">
        <div class="spinner"></div>
        <p>Loading collaborators directory...</p>
      </div>

      <!-- Collaborators Table -->
      <div *ngIf="!loading" class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 50px; text-align: center;">Order</th>
                <th style="width: 60px;">Logo</th>
                <th>Collaborator / Partner Name</th>
                <th>Category</th>
                <th>Website URL</th>
                <th>Public Status</th>
                <th style="width: 140px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of collaborators; let i = index">
                <td style="text-align: center;">
                  <div class="order-controls">
                    <button
                      class="order-arrow"
                      (click)="moveOrder(i, -1)"
                      [disabled]="isReadOnly || i === 0"
                      title="Move Up"
                    >▲</button>
                    <span class="order-num">{{ c.sort_order }}</span>
                    <button
                      class="order-arrow"
                      (click)="moveOrder(i, 1)"
                      [disabled]="isReadOnly || i === collaborators.length - 1"
                      title="Move Down"
                    >▼</button>
                  </div>
                </td>
                <td>
                  <div class="logo-preview-box">
                    <img
                      *ngIf="c.logo_url"
                      [src]="c.logo_url"
                      [alt]="c.name"
                      class="collab-logo-thumb"
                      (error)="onLogoError($event)"
                    />
                    <div *ngIf="!c.logo_url" class="logo-fallback-badge">
                      {{ getInitials(c.name) }}
                    </div>
                  </div>
                </td>
                <td>
                  <div class="name-block">
                    <span class="collab-name">{{ c.name }}</span>
                    <span *ngIf="c.organization && c.organization !== c.name" class="collab-org">
                      {{ c.organization }}
                    </span>
                    <p *ngIf="c.description" class="collab-desc">{{ c.description }}</p>
                  </div>
                </td>
                <td>
                  <span class="category-badge">{{ c.category }}</span>
                </td>
                <td>
                  <a
                    *ngIf="c.website_url"
                    [href]="c.website_url"
                    target="_blank"
                    class="link-preview"
                    title="Open website"
                  >
                    <span>Visit Link</span>
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <span *ngIf="!c.website_url" class="text-muted text-sm">-</span>
                </td>
                <td>
                  <button
                    type="button"
                    class="status-toggle-btn"
                    [class.active]="c.is_active"
                    (click)="toggleStatus(c)"
                    [disabled]="isReadOnly"
                    title="Click to toggle public visibility"
                  >
                    <span class="status-dot"></span>
                    <span>{{ c.is_active ? 'Visible on Website' : 'Hidden / Inactive' }}</span>
                  </button>
                </td>
                <td style="text-align: right;">
                  <div class="row-actions">
                    <button class="icon-btn preview-btn" (click)="previewCollaborator(c)" title="Preview card">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button class="icon-btn edit-btn" (click)="openEditModal(c)" title="Edit collaborator" [disabled]="isReadOnly">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button class="icon-btn delete-btn" (click)="confirmDelete(c)" title="Delete" [disabled]="isReadOnly">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr *ngIf="collaborators.length === 0">
                <td colspan="7" class="empty-cell">
                  <div class="empty-state">
                    <p class="empty-title">No collaborators found</p>
                    <p class="empty-desc">Adjust your filters or add a new collaborator.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- CREATE / EDIT MODAL -->
      <div *ngIf="isModalOpen" class="modal-backdrop" (click)="closeModal()">
        <div class="modal-card" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">{{ editingId ? 'Edit Collaborator' : 'Add New Collaborator' }}</h2>
            <button class="modal-close" (click)="closeModal()">&times;</button>
          </div>

          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Collaborator / Partner Name <span class="required">*</span></label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.name"
                  placeholder="e.g. World Health Organization (WHO)"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Organization</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.organization"
                  placeholder="e.g. MoHFS, GoN"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Category <span class="required">*</span></label>
                <select class="form-input form-select" [(ngModel)]="formData.category">
                  <option *ngFor="let cat of formCategories" [value]="cat">{{ cat }}</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Website URL</label>
                <input
                  type="url"
                  class="form-input"
                  [(ngModel)]="formData.website_url"
                  placeholder="https://example.org"
                />
              </div>

              <!-- Logo Upload & URL -->
              <div class="form-group full-width">
                <label class="form-label">Logo / Image</label>
                <div class="image-upload-row">
                  <input
                    type="text"
                    class="form-input flex-1"
                    [(ngModel)]="formData.logo_url"
                    placeholder="Enter image URL or choose file to upload..."
                  />
                  <label class="btn btn-secondary file-upload-label">
                    <span>Upload File</span>
                    <input type="file" accept="image/*" (change)="onFileSelected($event)" style="display: none;" />
                  </label>
                </div>
                <div *ngIf="uploadingFile" class="uploading-indicator">
                  <span class="spinner-small"></span>
                  <span>Uploading image...</span>
                </div>
                <div *ngIf="formData.logo_url" class="logo-preview-inline">
                  <span class="preview-label">Preview:</span>
                  <img [src]="formData.logo_url" alt="Logo preview" class="logo-inline-img" (error)="onLogoError($event)" />
                </div>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Short Description / Partnership Role</label>
                <textarea
                  rows="3"
                  class="form-input"
                  [(ngModel)]="formData.description"
                  placeholder="Describe joint initiatives, technical collaboration, or institutional support..."
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Display Order</label>
                <input
                  type="number"
                  class="form-input"
                  [(ngModel)]="formData.sort_order"
                  placeholder="0"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Public Display Status</label>
                <label class="form-checkbox-label" style="margin-top: 0.5rem;">
                  <input type="checkbox" [(ngModel)]="formData.is_active" />
                  <span>Visible on Public Website</span>
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button class="btn btn-primary" (click)="saveCollaborator()" [disabled]="saving">
              <span *ngIf="saving" class="spinner-small"></span>
              <span>{{ saving ? 'Saving...' : (editingId ? 'Update Collaborator' : 'Save Collaborator') }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- PREVIEW MODAL -->
      <div *ngIf="previewItem" class="modal-backdrop" (click)="previewItem = null">
        <div class="modal-card modal-sm" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">Collaborator Preview</h2>
            <button class="modal-close" (click)="previewItem = null">&times;</button>
          </div>
          <div class="modal-body text-center" style="padding: 2rem 1.5rem;">
            <div *ngIf="previewItem.logo_url" style="margin-bottom: 1rem;">
              <img [src]="previewItem.logo_url" alt="Logo" style="max-height: 60px; max-width: 160px; object-fit: contain; margin: 0 auto;" />
            </div>
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a; margin: 0 0 0.5rem 0;">{{ previewItem.name }}</h3>
            <span class="category-badge" style="margin-bottom: 1rem;">{{ previewItem.category }}</span>
            <p *ngIf="previewItem.description" style="font-size: 0.875rem; color: #475569; margin: 1rem 0; line-height: 1.5;">
              {{ previewItem.description }}
            </p>
            <div *ngIf="previewItem.website_url" style="margin-top: 1rem;">
              <a [href]="previewItem.website_url" target="_blank" class="btn btn-secondary" style="font-size: 0.8125rem;">
                Visit Official Website &rarr;
              </a>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" (click)="previewItem = null">Close</button>
          </div>
        </div>
      </div>

      <!-- DELETE CONFIRMATION MODAL -->
      <div *ngIf="collabToDelete" class="modal-backdrop" (click)="collabToDelete = null">
        <div class="modal-card modal-sm" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title text-danger">Remove Collaborator</h2>
            <button class="modal-close" (click)="collabToDelete = null">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>{{ collabToDelete.name }}</strong>?</p>
            <p class="text-danger-sm">This collaborator will be removed from the public website.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="collabToDelete = null">Cancel</button>
            <button class="btn btn-danger" (click)="deleteConfirmed()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .collab-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem 0; }
    .page-subtitle { color: #64748b; font-size: 0.875rem; margin: 0; }
    .header-actions { display: flex; gap: 0.75rem; }
    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1rem; font-size: 0.875rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: none; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-primary { background: var(--primary-pink); color: #fff; }
    .btn-primary:hover:not(:disabled) { filter: brightness(0.92); transform: translateY(-1px); }
    .btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
    .btn-secondary:hover:not(:disabled) { background: #e2e8f0; }
    .btn-danger { background: #ef4444; color: #fff; }
    .btn-danger:hover { background: #dc2626; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .filter-bar { padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .category-pills { display: flex; gap: 0.375rem; flex-wrap: wrap; }
    .cat-pill { background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.375rem 0.75rem; border-radius: 6px; font-size: 0.8125rem; font-weight: 500; color: #64748b; cursor: pointer; transition: all 0.15s; }
    .cat-pill.active { background: var(--primary-pink); border-color: var(--primary-pink); color: #fff; }
    .search-box { position: relative; min-width: 260px; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); width: 1rem; height: 1rem; color: #94a3b8; }
    .search-input { padding-left: 2.25rem !important; width: 100%; }
    .form-input { border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #1e293b; outline: none; }
    .form-input:focus { border-color: var(--primary-pink); box-shadow: 0 0 0 3px rgba(237, 46, 132, 0.15); }
    .form-select { background-color: #fff; cursor: pointer; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { background: #f8fafc; padding: 0.75rem 1rem; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .data-table td { padding: 0.875rem 1rem; border-bottom: 1px solid #f1f5f9; color: #1e293b; vertical-align: middle; }
    .data-table tr:hover td { background: #fafafa; }
    .order-controls { display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .order-arrow { background: none; border: none; font-size: 9px; line-height: 1; color: #94a3b8; cursor: pointer; padding: 1px; }
    .order-arrow:hover:not(:disabled) { color: var(--primary-pink); }
    .order-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
    .order-num { font-size: 0.75rem; font-weight: 600; color: #64748b; }
    .logo-preview-box { width: 44px; height: 44px; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; background: #fff; overflow: hidden; }
    .collab-logo-thumb { max-width: 100%; max-height: 100%; object-fit: contain; }
    .logo-fallback-badge { font-size: 0.75rem; font-weight: 700; color: var(--primary-pink); background: #fdf2f8; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .name-block { display: flex; flex-direction: column; gap: 0.125rem; }
    .collab-name { font-weight: 600; color: #0f172a; }
    .collab-org { font-size: 0.8125rem; color: #64748b; }
    .collab-desc { font-size: 0.75rem; color: #64748b; margin: 0.25rem 0 0 0; }
    .category-badge { display: inline-block; padding: 0.25rem 0.625rem; border-radius: 9999px; background: #eff6ff; color: #1e40af; font-size: 0.75rem; font-weight: 600; }
    .link-preview { display: inline-flex; align-items: center; gap: 0.375rem; color: #2563eb; font-size: 0.8125rem; font-weight: 500; text-decoration: none; }
    .link-preview:hover { text-decoration: underline; }
    .status-toggle-btn { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.625rem; border-radius: 9999px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; color: #64748b; }
    .status-toggle-btn .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #94a3b8; }
    .status-toggle-btn.active { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
    .status-toggle-btn.active .status-dot { background: #22c55e; }
    .row-actions { display: inline-flex; align-items: center; gap: 0.375rem; }
    .icon-btn { width: 32px; height: 32px; border-radius: 6px; border: 1px solid transparent; background: transparent; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
    .icon-btn:hover:not(:disabled) { background: #f1f5f9; }
    .preview-btn { color: #0284c7; }
    .preview-btn:hover { background: #f0f9ff; border-color: #bae6fd; }
    .edit-btn { color: #2563eb; }
    .edit-btn:hover:not(:disabled) { background: #eff6ff; border-color: #bfdbfe; }
    .delete-btn { color: #ef4444; }
    .delete-btn:hover:not(:disabled) { background: #fef2f2; border-color: #fecaca; }
    .image-upload-row { display: flex; gap: 0.5rem; align-items: center; }
    .file-upload-label { cursor: pointer; white-space: nowrap; margin: 0; }
    .uploading-indicator { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--primary-pink); margin-top: 0.375rem; }
    .logo-preview-inline { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; }
    .preview-label { font-size: 0.75rem; color: #64748b; }
    .logo-inline-img { max-height: 40px; max-width: 120px; object-fit: contain; border: 1px solid #e2e8f0; border-radius: 4px; padding: 2px; }
    .toast-banner { padding: 0.875rem 1.25rem; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; font-weight: 500; }
    .toast-banner.success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; line-height: 1; cursor: pointer; color: inherit; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
    .modal-card { background: #fff; border-radius: 12px; width: 100%; max-width: 620px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
    .modal-card.modal-sm { max-width: 440px; }
    .modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .modal-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; margin: 0; }
    .modal-close { background: none; border: none; font-size: 1.5rem; line-height: 1; color: #94a3b8; cursor: pointer; }
    .modal-body { padding: 1.5rem; }
    .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 0.75rem; background: #f8fafc; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
    .form-group.full-width { grid-column: 1 / -1; }
    .form-label { font-size: 0.8125rem; font-weight: 600; color: #334155; }
    .required { color: #ef4444; }
    .form-checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #1e293b; cursor: pointer; }
    .text-danger { color: #dc2626; }
    .text-danger-sm { color: #dc2626; font-size: 0.8125rem; margin-top: 0.5rem; }
    .text-muted { color: #64748b; }
    .text-sm { font-size: 0.8125rem; }
    .spinner { width: 2rem; height: 2rem; border: 3px solid #e2e8f0; border-top-color: var(--primary-pink); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    .spinner-small { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-state { padding: 3rem; text-align: center; color: #64748b; }
    .empty-state { padding: 3rem 1rem; text-align: center; }
    .empty-title { font-weight: 600; color: #1e293b; margin: 0 0 0.25rem 0; }
    .empty-desc { color: #64748b; font-size: 0.875rem; margin: 0; }
    @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
  `]
})
export class CollaboratorsListComponent implements OnInit {
  collaborators: Collaborator[] = [];
  loading = false;
  saving = false;
  uploadingFile = false;
  searchQuery = '';
  selectedCategory = 'All';

  categories = [
    'All',
    'Government and Multilateral',
    'Academic',
    'Community and Civil Society',
    'Institutional and Funding Partners'
  ];

  formCategories = [
    'Government and Multilateral',
    'Academic',
    'Community and Civil Society',
    'Institutional and Funding Partners'
  ];

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  isModalOpen = false;
  editingId: number | null = null;
  formData: any = {
    name: '',
    organization: '',
    category: 'Government and Multilateral',
    description: '',
    logo_url: '',
    website_url: '',
    sort_order: 0,
    is_active: true,
  };

  previewItem: Collaborator | null = null;
  collabToDelete: Collaborator | null = null;

  get currentUser() {
    return this.authService.currentUser();
  }

  get isReadOnly(): boolean {
    return this.currentUser?.role === 'READ_ONLY';
  }

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCollaborators();
  }

  loadCollaborators() {
    this.loading = true;
    this.apiService.getCollaborators(this.selectedCategory, this.searchQuery, true).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.collaborators = res.collaborators;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.error || 'Failed to load collaborators', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  onSearch() {
    this.loadCollaborators();
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.loadCollaborators();
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    this.cdr.markForCheck();
    setTimeout(() => {
      if (this.toastMessage === msg) {
        this.toastMessage = '';
        this.cdr.markForCheck();
      }
    }, 4000);
  }

  getInitials(name: string): string {
    if (!name) return 'C';
    const words = name.trim().split(' ');
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0].substring(0, 2).toUpperCase();
  }

  openCreateModal() {
    this.editingId = null;
    this.formData = {
      name: '',
      organization: '',
      category: this.selectedCategory !== 'All' ? this.selectedCategory : 'Government and Multilateral',
      description: '',
      logo_url: '',
      website_url: '',
      sort_order: this.collaborators.length + 1,
      is_active: true,
    };
    this.isModalOpen = true;
  }

  openEditModal(c: Collaborator) {
    this.editingId = c.id;
    this.formData = { ...c };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingId = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.uploadingFile = true;
    this.apiService.uploadFile(file).subscribe({
      next: (res) => {
        this.uploadingFile = false;
        if (res.success) {
          this.formData.logo_url = res.url;
          this.showToast('Image uploaded successfully', 'success');
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.uploadingFile = false;
        this.showToast(err.error?.error || 'Image upload failed', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  saveCollaborator() {
    if (!this.formData.name || !this.formData.name.trim()) {
      this.showToast('Collaborator name is required', 'error');
      return;
    }

    this.saving = true;

    if (this.editingId) {
      this.apiService.updateCollaborator(this.editingId, this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Collaborator updated successfully', 'success');
            this.closeModal();
            this.loadCollaborators();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to update collaborator', 'error');
        }
      });
    } else {
      this.apiService.createCollaborator(this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Collaborator added successfully', 'success');
            this.closeModal();
            this.loadCollaborators();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to create collaborator', 'error');
        }
      });
    }
  }

  toggleStatus(c: Collaborator) {
    if (this.isReadOnly) return;
    const newStatus = !c.is_active;
    this.apiService.updateCollaborator(c.id, { is_active: newStatus }).subscribe({
      next: (res) => {
        if (res.success) {
          c.is_active = newStatus;
          this.showToast(
            `Collaborator is now ${newStatus ? 'visible on' : 'hidden from'} public website`,
            'success'
          );
          this.cdr.markForCheck();
        }
      },
      error: (err) => {
        this.showToast(err.error?.error || 'Failed to update visibility', 'error');
      }
    });
  }

  moveOrder(index: number, direction: number) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.collaborators.length) return;

    const itemA = this.collaborators[index];
    const itemB = this.collaborators[targetIndex];

    const tempOrder = itemA.sort_order;
    itemA.sort_order = itemB.sort_order;
    itemB.sort_order = tempOrder;

    this.collaborators[index] = itemB;
    this.collaborators[targetIndex] = itemA;

    this.apiService.reorderCollaborators([
      { id: itemA.id, sort_order: itemA.sort_order },
      { id: itemB.id, sort_order: itemB.sort_order }
    ]).subscribe({
      next: () => {
        this.showToast('Display order updated', 'success');
        this.cdr.markForCheck();
      },
      error: () => {
        this.loadCollaborators();
      }
    });
  }

  previewCollaborator(c: Collaborator) {
    this.previewItem = c;
  }

  confirmDelete(c: Collaborator) {
    this.collabToDelete = c;
  }

  deleteConfirmed() {
    if (!this.collabToDelete) return;
    this.apiService.deleteCollaborator(this.collabToDelete.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('Collaborator removed successfully', 'success');
          this.collabToDelete = null;
          this.loadCollaborators();
        }
      },
      error: (err) => {
        this.showToast(err.error?.error || 'Failed to delete collaborator', 'error');
      }
    });
  }

  onLogoError(e: any) {
    e.target.style.display = 'none';
  }
}
