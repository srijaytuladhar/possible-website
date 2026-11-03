import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { SolutionProject } from '../../core/models';

@Component({
  selector: 'app-solutions-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="solutions-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Healthcare Solutions & Innovation</h1>
          <p class="page-subtitle">Manage research programs across the 4 stages: Scale, Test, Innovate, and Pipeline</p>
        </div>
        <button class="btn btn-primary" (click)="openCreateModal()">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Solution Project</span>
        </button>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- Filter Bar -->
      <div class="card filter-bar">
        <div class="stage-pills">
          <button
            *ngFor="let stage of stages"
            type="button"
            class="stage-pill"
            [class.active]="selectedStage === stage.value"
            (click)="setStage(stage.value)"
          >
            {{ stage.label }}
          </button>
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="projects-grid">
        <div *ngFor="let p of solutions" class="card project-card">
          <div class="project-header">
            <span class="badge" [ngClass]="{
              'badge-purple': p.stage_id === 'scale',
              'badge-blue': p.stage_id === 'test',
              'badge-pink': p.stage_id === 'innovate',
              'badge-warning': p.stage_id === 'pipeline'
            }">
              {{ p.stage_id | uppercase }}
            </span>
            <span *ngIf="p.badge" class="sub-badge">{{ p.badge }}</span>

            <div class="card-actions">
              <button class="icon-btn edit" (click)="openEditModal(p)" title="Edit project">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button class="icon-btn delete" (click)="confirmDelete(p)" title="Delete project">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div class="project-body">
            <h3 class="project-title">{{ p.title }}</h3>
            <p *ngIf="p.subtitle" class="project-subtitle">{{ p.subtitle }}</p>
            <p class="project-desc">{{ p.description }}</p>
          </div>

          <div class="project-footer">
            <span class="pub-count">
              <svg class="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{{ (p.publications_json?.length || 0) }} Publications Attached</span>
            </span>
          </div>
        </div>

        <div *ngIf="!loading && !solutions.length" class="empty-state card">
          <p>No projects found under the selected stage</p>
        </div>
      </div>

      <!-- Add / Edit Modal -->
      <div *ngIf="isModalOpen" class="modal-backdrop" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ editingId ? 'Edit Solution Project' : 'New Solution Project' }}</h3>
            <button class="close-btn" (click)="closeModal()">&times;</button>
          </div>

          <form (ngSubmit)="saveSolution()">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Project Title *</label>
                <input
                  type="text"
                  class="form-input"
                  name="title"
                  [(ngModel)]="formData.title"
                  required
                  placeholder="e.g. Strengthening community health system through longitudinal care"
                />
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Stage Category *</label>
                  <select class="form-select" name="stage_id" [(ngModel)]="formData.stage_id" required>
                    <option value="scale">Scale</option>
                    <option value="test">Test</option>
                    <option value="innovate">Innovate</option>
                    <option value="pipeline">Pipeline</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Badge Tag</label>
                  <input
                    type="text"
                    class="form-input"
                    name="badge"
                    [(ngModel)]="formData.badge"
                    placeholder="e.g. National Pilot or Clinical Model"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Subtitle / Focus</label>
                <input
                  type="text"
                  class="form-input"
                  name="subtitle"
                  [(ngModel)]="formData.subtitle"
                  placeholder="Brief headline or thematic summary..."
                />
              </div>

              <div class="form-group">
                <label class="form-label">Project Overview & Methodology *</label>
                <textarea
                  class="form-textarea"
                  rows="5"
                  name="description"
                  [(ngModel)]="formData.description"
                  required
                  placeholder="Explain the healthcare problem, proposed intervention, and clinical impact..."
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Cover Image URL</label>
                <input
                  type="text"
                  class="form-input"
                  name="image_url"
                  [(ngModel)]="formData.image_url"
                  placeholder="/baby.jpg or https://..."
                />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="saving">
                <span *ngIf="saving" class="spinner"></span>
                <span *ngIf="!saving">{{ editingId ? 'Save Changes' : 'Create Project' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Modal -->
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
    .solutions-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); }
    .page-subtitle { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem; }

    .toast-banner { padding: 0.75rem 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; font-weight: 500; }
    .toast-banner.success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: inherit; }

    .filter-bar { padding: 1rem 1.25rem; }
    .stage-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .stage-pill { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 0.35rem 0.875rem; border-radius: 9999px; font-size: 0.8125rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.15s; }
    .stage-pill:hover { background: #e2e8f0; }
    .stage-pill.active { background: var(--text-main); border-color: var(--text-main); color: white; }

    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.25rem; }
    .project-card { padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; }

    .project-header { display: flex; align-items: center; gap: 0.5rem; }
    .sub-badge { font-size: 0.6875rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.15rem 0.5rem; border-radius: 4px; color: #64748b; }
    .card-actions { margin-left: auto; display: flex; align-items: center; gap: 0.25rem; }

    .project-body { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
    .project-title { font-size: 1.0625rem; font-weight: 700; color: var(--text-main); line-height: 1.35; }
    .project-subtitle { font-size: 0.8125rem; color: var(--secondary-blue); font-weight: 600; }
    .project-desc { font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

    .project-footer { border-top: 1px solid var(--surface-border-subtle); pt: 0.75rem; margin-top: auto; }
    .pub-count { display: flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; color: var(--text-muted); }

    .icon-btn { width: 30px; height: 30px; border-radius: var(--radius-sm); border: 1px solid var(--surface-border); background: white; color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
    .icon-btn.edit:hover { background: #eff6ff; color: #2563eb; }
    .icon-btn.delete:hover { background: #fef2f2; color: #dc2626; }

    .empty-state { text-align: center; padding: 3rem; color: var(--text-muted); grid-column: 1 / -1; }

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
export class SolutionsListComponent implements OnInit {
  solutions: SolutionProject[] = [];
  stages = [
    { label: 'All Stages', value: 'all' },
    { label: 'Scale', value: 'scale' },
    { label: 'Test', value: 'test' },
    { label: 'Innovate', value: 'innovate' },
    { label: 'Pipeline', value: 'pipeline' },
  ];
  selectedStage = 'all';
  loading = false;
  saving = false;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  isModalOpen = false;
  editingId: number | null = null;
  formData: Partial<SolutionProject> = {
    title: '',
    stage_id: 'scale',
    subtitle: '',
    badge: '',
    description: '',
    image_url: '/baby.jpg'
  };

  itemToDelete: SolutionProject | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSolutions();
  }

  loadSolutions() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getSolutions(this.selectedStage).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.solutions = res.solutions || [];
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load solutions projects', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  setStage(stage: string) {
    this.selectedStage = stage;
    this.loadSolutions();
  }

  openCreateModal() {
    this.editingId = null;
    this.formData = {
      title: '',
      stage_id: 'scale',
      subtitle: '',
      badge: 'National Pilot',
      description: '',
      image_url: '/baby.jpg'
    };
    this.isModalOpen = true;
  }

  openEditModal(p: SolutionProject) {
    this.editingId = p.id;
    this.formData = { ...p };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingId = null;
  }

  saveSolution() {
    if (!this.formData.title || !this.formData.stage_id || !this.formData.description) {
      this.showToast('Title, stage, and description are required', 'error');
      return;
    }

    this.saving = true;

    if (this.editingId) {
      this.apiService.updateSolution(this.editingId, this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Solution project updated successfully', 'success');
            this.closeModal();
            this.loadSolutions();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to update project', 'error');
        }
      });
    } else {
      this.apiService.createSolution(this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Solution project created successfully', 'success');
            this.closeModal();
            this.loadSolutions();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to create project', 'error');
        }
      });
    }
  }

  confirmDelete(p: SolutionProject) {
    this.itemToDelete = p;
  }

  deleteConfirmed() {
    if (!this.itemToDelete) return;
    this.apiService.deleteSolution(this.itemToDelete.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.itemToDelete = null;
          this.showToast('Project deleted successfully', 'success');
          this.loadSolutions();
        }
      },
      error: () => {
        this.showToast('Failed to delete project', 'error');
      }
    });
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => { this.toastMessage = ''; }, 4000);
  }
}
