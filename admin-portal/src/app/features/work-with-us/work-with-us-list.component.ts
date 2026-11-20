import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { WorkWithUsItem } from '../../core/models';

@Component({
  selector: 'app-work-with-us-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wwu-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Work With Us & Opportunities Management</h1>
          <p class="page-subtitle">Manage open job postings, fellowship & apprenticeship opportunities, and Work With Us overview sections.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" (click)="openCreateModal()" [disabled]="isReadOnly">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Opportunity / Section</span>
          </button>
        </div>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- Filter Bar -->
      <div class="card filter-bar">
        <div class="category-pills">
          <button
            *ngFor="let tab of typeTabs"
            type="button"
            class="cat-pill"
            [class.active]="selectedType === tab.value"
            (click)="setType(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="search-box">
          <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            class="form-input search-input"
            placeholder="Search by title, department or description..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state card">
        <div class="spinner"></div>
        <p>Loading Work With Us items...</p>
      </div>

      <!-- Table Card -->
      <div *ngIf="!loading" class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 50px; text-align: center;">Order</th>
                <th>Title & Role</th>
                <th>Section Type</th>
                <th>Department & Location</th>
                <th>Employment Type</th>
                <th>Deadline</th>
                <th>Publication Status</th>
                <th style="width: 140px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of items; let i = index">
                <td style="text-align: center;">
                  <div class="order-controls">
                    <button
                      class="order-arrow"
                      (click)="moveOrder(i, -1)"
                      [disabled]="isReadOnly || i === 0"
                      title="Move Up"
                    >▲</button>
                    <span class="order-num">{{ item.sort_order }}</span>
                    <button
                      class="order-arrow"
                      (click)="moveOrder(i, 1)"
                      [disabled]="isReadOnly || i === items.length - 1"
                      title="Move Down"
                    >▼</button>
                  </div>
                </td>
                <td>
                  <div class="title-block">
                    <span class="item-title">{{ item.title }}</span>
                    <span *ngIf="item.subtitle" class="item-subtitle">{{ item.subtitle }}</span>
                  </div>
                </td>
                <td>
                  <span class="type-badge" [ngClass]="getTypeBadgeClass(item.section_type)">
                    {{ formatTypeName(item.section_type) }}
                  </span>
                </td>
                <td>
                  <div class="dept-location">
                    <span>{{ item.department || 'General' }}</span>
                    <span *ngIf="item.location" class="text-muted text-xs">{{ item.location }}</span>
                  </div>
                </td>
                <td>
                  <span *ngIf="item.employment_type" class="badge-neutral">{{ item.employment_type }}</span>
                  <span *ngIf="!item.employment_type" class="text-muted text-sm">-</span>
                </td>
                <td>
                  <span *ngIf="item.deadline" class="deadline-pill">{{ item.deadline }}</span>
                  <span *ngIf="!item.deadline" class="text-muted text-sm">-</span>
                </td>
                <td>
                  <button
                    type="button"
                    class="status-toggle-btn"
                    [class.active]="item.is_published"
                    (click)="togglePublish(item)"
                    [disabled]="isReadOnly"
                    title="Click to toggle publication"
                  >
                    <span class="status-dot"></span>
                    <span>{{ item.is_published ? 'Published' : 'Draft / Unpublished' }}</span>
                  </button>
                </td>
                <td style="text-align: right;">
                  <div class="row-actions">
                    <button class="icon-btn preview-btn" (click)="previewItem(item)" title="Preview item">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button class="icon-btn edit-btn" (click)="openEditModal(item)" title="Edit" [disabled]="isReadOnly">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button class="icon-btn delete-btn" (click)="confirmDelete(item)" title="Delete" [disabled]="isReadOnly">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr *ngIf="items.length === 0">
                <td colspan="8" class="empty-cell">
                  <div class="empty-state">
                    <p class="empty-title">No Work With Us items found</p>
                    <p class="empty-desc">Create your first opening or switch filters.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- CREATE / EDIT MODAL -->
      <div *ngIf="isModalOpen" class="modal-backdrop" (click)="closeModal()">
        <div class="modal-card modal-lg" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">{{ editingId ? 'Edit Opportunity / Section' : 'Create New Opportunity / Section' }}</h2>
            <button class="modal-close" (click)="closeModal()">&times;</button>
          </div>

          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Section / Opportunity Type <span class="required">*</span></label>
                <select class="form-input form-select" [(ngModel)]="formData.section_type">
                  <option value="job_posting">Job Posting (Careers / Vacancies)</option>
                  <option value="traineeship">Traineeship & Apprenticeship</option>
                  <option value="value_card">Culture / Value Pillar Card</option>
                  <option value="quote">Testimonial / Mission Quote</option>
                  <option value="hero">Page Banner / Header</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Position / Section Title <span class="required">*</span></label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.title"
                  placeholder="e.g. Community Health Implementation Specialist"
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Subtitle / Tagline</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.subtitle"
                  placeholder="e.g. Lead maternal and mental health task-sharing programs across municipal health centers"
                />
              </div>

              <div class="form-group" *ngIf="isPostingType(formData.section_type)">
                <label class="form-label">Department / Program</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.department"
                  placeholder="e.g. Programs & Implementation"
                />
              </div>

              <div class="form-group" *ngIf="isPostingType(formData.section_type)">
                <label class="form-label">Location</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.location"
                  placeholder="e.g. Kathmandu & Achham, Nepal"
                />
              </div>

              <div class="form-group" *ngIf="isPostingType(formData.section_type)">
                <label class="form-label">Employment Type</label>
                <select class="form-input form-select" [(ngModel)]="formData.employment_type">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                  <option value="Internship">Internship</option>
                  <option value="Consultancy">Consultancy</option>
                </select>
              </div>

              <div class="form-group" *ngIf="isPostingType(formData.section_type)">
                <label class="form-label">Application Deadline</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.deadline"
                  placeholder="e.g. Rolling basis or March 31, 2026"
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Description / Overview <span class="required">*</span></label>
                <textarea
                  rows="4"
                  class="form-input"
                  [(ngModel)]="formData.description"
                  placeholder="Provide detailed description of the role, responsibilities, or section content..."
                ></textarea>
              </div>

              <div class="form-group full-width" *ngIf="isPostingType(formData.section_type)">
                <label class="form-label">Requirements & Qualifications</label>
                <textarea
                  rows="3"
                  class="form-input"
                  [(ngModel)]="formData.requirements"
                  placeholder="Education, experience, competencies..."
                ></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Link / Apply URL</label>
                <input
                  type="url"
                  class="form-input"
                  [(ngModel)]="formData.link_url"
                  placeholder="https://possiblehealth.org/contact-us or external form"
                />
              </div>

              <!-- Image Upload & URL -->
              <div class="form-group full-width">
                <label class="form-label">Cover / Feature Image</label>
                <div class="image-upload-row">
                  <input
                    type="text"
                    class="form-input flex-1"
                    [(ngModel)]="formData.image_url"
                    placeholder="Enter image URL or choose file to upload..."
                  />
                  <label class="btn btn-secondary file-upload-label">
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" (change)="onFileSelected($event)" style="display: none;" />
                  </label>
                </div>
                <div *ngIf="uploadingFile" class="uploading-indicator">
                  <span class="spinner-small"></span>
                  <span>Uploading image...</span>
                </div>
                <div *ngIf="formData.image_url" class="logo-preview-inline">
                  <span class="preview-label">Preview:</span>
                  <img [src]="formData.image_url" alt="Preview" class="image-inline-img" (error)="onImageError($event)" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Sort Order</label>
                <input
                  type="number"
                  class="form-input"
                  [(ngModel)]="formData.sort_order"
                  placeholder="0"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Publishing Status</label>
                <label class="form-checkbox-label" style="margin-top: 0.5rem;">
                  <input type="checkbox" [(ngModel)]="formData.is_published" />
                  <span>Published (live on website)</span>
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button class="btn btn-primary" (click)="saveItem()" [disabled]="saving">
              <span *ngIf="saving" class="spinner-small"></span>
              <span>{{ saving ? 'Saving...' : (editingId ? 'Update Item' : 'Create Item') }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- PREVIEW MODAL -->
      <div *ngIf="selectedPreview" class="modal-backdrop" (click)="selectedPreview = null">
        <div class="modal-card modal-md" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">Opportunity Preview</h2>
            <button class="modal-close" (click)="selectedPreview = null">&times;</button>
          </div>
          <div class="modal-body">
            <span class="type-badge" [ngClass]="getTypeBadgeClass(selectedPreview.section_type)" style="margin-bottom: 0.5rem;">
              {{ formatTypeName(selectedPreview.section_type) }}
            </span>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0.5rem 0 0.25rem 0;">
              {{ selectedPreview.title }}
            </h3>
            <p *ngIf="selectedPreview.subtitle" style="color: #64748b; font-size: 0.875rem; margin-bottom: 1rem;">
              {{ selectedPreview.subtitle }}
            </p>

            <div class="preview-meta-row" *ngIf="selectedPreview.department || selectedPreview.location">
              <span *ngIf="selectedPreview.department"><strong>Dept:</strong> {{ selectedPreview.department }}</span>
              <span *ngIf="selectedPreview.location"><strong>Location:</strong> {{ selectedPreview.location }}</span>
              <span *ngIf="selectedPreview.deadline"><strong>Deadline:</strong> {{ selectedPreview.deadline }}</span>
            </div>

            <div style="margin: 1rem 0; line-height: 1.6; font-size: 0.875rem; color: #334155; white-space: pre-line;">
              {{ selectedPreview.description }}
            </div>

            <div *ngIf="selectedPreview.requirements" style="margin: 1rem 0; padding: 0.75rem; background: #f8fafc; border-radius: 8px;">
              <h4 style="font-size: 0.8125rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem 0;">Requirements</h4>
              <p style="font-size: 0.8125rem; color: #475569; margin: 0; white-space: pre-line;">{{ selectedPreview.requirements }}</p>
            </div>

            <div *ngIf="selectedPreview.link_url" style="margin-top: 1.25rem;">
              <a [href]="selectedPreview.link_url" target="_blank" class="btn btn-primary" style="font-size: 0.8125rem;">
                Apply Now &rarr;
              </a>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="selectedPreview = null">Close</button>
          </div>
        </div>
      </div>

      <!-- DELETE MODAL -->
      <div *ngIf="itemToDelete" class="modal-backdrop" (click)="itemToDelete = null">
        <div class="modal-card modal-sm" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title text-danger">Confirm Delete</h2>
            <button class="modal-close" (click)="itemToDelete = null">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>{{ itemToDelete.title }}</strong>?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="itemToDelete = null">Cancel</button>
            <button class="btn btn-danger" (click)="deleteConfirmed()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wwu-page { display: flex; flex-direction: column; gap: 1.5rem; }
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
    .title-block { display: flex; flex-direction: column; gap: 0.125rem; }
    .item-title { font-weight: 600; color: #0f172a; }
    .item-subtitle { font-size: 0.75rem; color: #64748b; }
    .type-badge { display: inline-block; padding: 0.25rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
    .type-badge.badge-job { background: #eff6ff; color: #1d4ed8; border: 1px solid rgba(29, 78, 216, 0.2); }
    .type-badge.badge-train { background: #f0fdf4; color: #166534; border: 1px solid rgba(22, 101, 52, 0.2); }
    .type-badge.badge-section { background: #faf5ff; color: #7e22ce; border: 1px solid rgba(126, 34, 206, 0.2); }
    .badge-neutral { display: inline-block; padding: 0.2rem 0.5rem; background: #f1f5f9; color: #334155; border-radius: 4px; font-size: 0.75rem; font-weight: 500; }
    .deadline-pill { display: inline-block; padding: 0.2rem 0.5rem; background: #fffbeb; color: #b45309; border-radius: 4px; font-size: 0.75rem; font-weight: 600; border: 1px solid #fde68a; }
    .dept-location { display: flex; flex-direction: column; }
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
    .image-inline-img { max-height: 48px; max-width: 140px; object-fit: cover; border: 1px solid #e2e8f0; border-radius: 4px; }
    .preview-meta-row { display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.8125rem; color: #64748b; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; }
    .toast-banner { padding: 0.875rem 1.25rem; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; font-weight: 500; }
    .toast-banner.success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; line-height: 1; cursor: pointer; color: inherit; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
    .modal-card { background: #fff; border-radius: 12px; width: 100%; max-width: 620px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
    .modal-card.modal-sm { max-width: 440px; }
    .modal-card.modal-md { max-width: 600px; }
    .modal-card.modal-lg { max-width: 820px; }
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
    .text-muted { color: #64748b; }
    .text-sm { font-size: 0.8125rem; }
    .text-xs { font-size: 0.75rem; }
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
export class WorkWithUsListComponent implements OnInit {
  items: WorkWithUsItem[] = [];
  loading = false;
  saving = false;
  uploadingFile = false;
  searchQuery = '';
  selectedType = 'all';

  typeTabs = [
    { label: 'All Content', value: 'all' },
    { label: 'Job Postings', value: 'job_posting' },
    { label: 'Traineeship & Apprenticeship', value: 'traineeship' },
    { label: 'Overview & Value Cards', value: 'value_card' },
  ];

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  isModalOpen = false;
  editingId: number | null = null;
  formData: any = {
    section_type: 'job_posting',
    title: '',
    subtitle: '',
    department: '',
    location: '',
    employment_type: 'Full-time',
    description: '',
    requirements: '',
    link_url: '',
    image_url: '',
    deadline: '',
    sort_order: 0,
    is_published: true,
  };

  selectedPreview: WorkWithUsItem | null = null;
  itemToDelete: WorkWithUsItem | null = null;

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
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.apiService.getWorkWithUsItems(this.selectedType, this.searchQuery, true).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.items = res.items;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.error || 'Failed to load items', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  onSearch() {
    this.loadItems();
  }

  setType(type: string) {
    this.selectedType = type;
    this.loadItems();
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

  isPostingType(t: string): boolean {
    return t === 'job_posting' || t === 'traineeship';
  }

  formatTypeName(t: string): string {
    switch (t) {
      case 'job_posting': return 'Job Posting';
      case 'traineeship': return 'Traineeship';
      case 'value_card': return 'Value Card';
      case 'quote': return 'Quote';
      case 'hero': return 'Hero';
      default: return t;
    }
  }

  getTypeBadgeClass(t: string): string {
    switch (t) {
      case 'job_posting': return 'badge-job';
      case 'traineeship': return 'badge-train';
      default: return 'badge-section';
    }
  }

  openCreateModal() {
    this.editingId = null;
    this.formData = {
      section_type: this.selectedType !== 'all' ? this.selectedType : 'job_posting',
      title: '',
      subtitle: '',
      department: '',
      location: 'Kathmandu, Nepal',
      employment_type: 'Full-time',
      description: '',
      requirements: '',
      link_url: 'https://possiblehealth.org/contact-us',
      image_url: '',
      deadline: 'Rolling basis',
      sort_order: this.items.length + 1,
      is_published: true,
    };
    this.isModalOpen = true;
  }

  openEditModal(item: WorkWithUsItem) {
    this.editingId = item.id;
    this.formData = { ...item };
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
          this.formData.image_url = res.url;
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

  saveItem() {
    if (!this.formData.title || !this.formData.description) {
      this.showToast('Title and description are required', 'error');
      return;
    }

    this.saving = true;

    if (this.editingId) {
      this.apiService.updateWorkWithUsItem(this.editingId, this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Work With Us item updated successfully', 'success');
            this.closeModal();
            this.loadItems();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to update item', 'error');
        }
      });
    } else {
      this.apiService.createWorkWithUsItem(this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Work With Us item created successfully', 'success');
            this.closeModal();
            this.loadItems();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to create item', 'error');
        }
      });
    }
  }

  togglePublish(item: WorkWithUsItem) {
    if (this.isReadOnly) return;
    const newStatus = !item.is_published;
    this.apiService.updateWorkWithUsItem(item.id, { is_published: newStatus }).subscribe({
      next: (res) => {
        if (res.success) {
          item.is_published = newStatus;
          this.showToast(
            `Item is now ${newStatus ? 'published' : 'unpublished'} on the public website`,
            'success'
          );
          this.cdr.markForCheck();
        }
      },
      error: (err) => {
        this.showToast(err.error?.error || 'Failed to update publication status', 'error');
      }
    });
  }

  moveOrder(index: number, direction: number) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.items.length) return;

    const itemA = this.items[index];
    const itemB = this.items[targetIndex];

    const tempOrder = itemA.sort_order;
    itemA.sort_order = itemB.sort_order;
    itemB.sort_order = tempOrder;

    this.items[index] = itemB;
    this.items[targetIndex] = itemA;

    this.apiService.reorderWorkWithUsItems([
      { id: itemA.id, sort_order: itemA.sort_order },
      { id: itemB.id, sort_order: itemB.sort_order }
    ]).subscribe({
      next: () => {
        this.showToast('Display order updated', 'success');
        this.cdr.markForCheck();
      },
      error: () => {
        this.loadItems();
      }
    });
  }

  previewItem(item: WorkWithUsItem) {
    this.selectedPreview = item;
  }

  confirmDelete(item: WorkWithUsItem) {
    this.itemToDelete = item;
  }

  deleteConfirmed() {
    if (!this.itemToDelete) return;
    this.apiService.deleteWorkWithUsItem(this.itemToDelete.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('Item deleted successfully', 'success');
          this.itemToDelete = null;
          this.loadItems();
        }
      },
      error: (err) => {
        this.showToast(err.error?.error || 'Failed to delete item', 'error');
      }
    });
  }

  onImageError(e: any) {
    e.target.style.display = 'none';
  }
}
