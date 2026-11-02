import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { TeamMember } from '../../core/models';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="team-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Team & Board Directory</h1>
          <p class="page-subtitle">Manage Nepal & US board directors, executive leadership, scientists, and advisors</p>
        </div>
        <button class="btn btn-primary" (click)="openCreateModal()">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>Add Member</span>
        </button>
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
            placeholder="Search team member by name or role..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
          />
        </div>
      </div>

      <!-- Team Table -->
      <div class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 70px;">Avatar</th>
                <th>Name & Designation</th>
                <th>Category</th>
                <th>LinkedIn</th>
                <th>Bio Excerpt</th>
                <th style="width: 120px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of members">
                <td>
                  <div class="avatar-wrap">
                    <img [src]="m.image" [alt]="m.name" class="avatar-img" (error)="onAvatarError($event)" />
                  </div>
                </td>
                <td>
                  <div class="member-info">
                    <strong class="member-name">{{ m.name }}</strong>
                    <span class="member-role">{{ m.role }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge" [ngClass]="{
                    'badge-purple': m.category === 'us_board',
                    'badge-blue': m.category === 'nepal_board',
                    'badge-pink': m.category === 'team_member',
                    'badge-warning': m.category === 'advisor'
                  }">
                    {{ getCategoryLabel(m.category) }}
                  </span>
                </td>
                <td>
                  <a *ngIf="m.linkedin" [href]="m.linkedin" target="_blank" class="linkedin-link" title="Open LinkedIn">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <span *ngIf="!m.linkedin" class="text-xs text-muted">—</span>
                </td>
                <td>
                  <span class="bio-excerpt">{{ m.bio }}</span>
                </td>
                <td style="text-align: right;">
                  <div class="action-buttons">
                    <button class="icon-btn edit" (click)="openEditModal(m)" title="Edit member">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button class="icon-btn delete" (click)="confirmDelete(m)" title="Delete member">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr *ngIf="!loading && !members.length">
                <td colspan="6" class="empty-state">
                  <p>No team members found</p>
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
            <h3>{{ editingId ? 'Edit Team Member' : 'Add Team Member' }}</h3>
            <button class="close-btn" (click)="closeModal()">&times;</button>
          </div>

          <form (ngSubmit)="saveMember()">
            <div class="modal-body">
              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Full Name & Credentials *</label>
                  <input
                    type="text"
                    class="form-input"
                    name="name"
                    [(ngModel)]="formData.name"
                    required
                    placeholder="e.g. Dr. Indira Basnett, MD, MPH"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Position / Role *</label>
                  <input
                    type="text"
                    class="form-input"
                    name="role"
                    [(ngModel)]="formData.role"
                    required
                    placeholder="e.g. Board Chair or Executive Director"
                  />
                </div>
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Category *</label>
                  <select class="form-select" name="category" [(ngModel)]="formData.category" required>
                    <option value="nepal_board">Sambhav Board – Nepal</option>
                    <option value="us_board">Possible Board – US</option>
                    <option value="team_member">Staff & Team Member</option>
                    <option value="advisor">Advisor & Specialist</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    class="form-input"
                    name="linkedin"
                    [(ngModel)]="formData.linkedin"
                    placeholder="https://www.linkedin.com/in/..."
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Photo / Headshot URL</label>
                <input
                  type="text"
                  class="form-input"
                  name="image"
                  [(ngModel)]="formData.image"
                  placeholder="https://... or /team/photo.jpg"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Professional Biography</label>
                <textarea
                  class="form-textarea"
                  rows="5"
                  name="bio"
                  [(ngModel)]="formData.bio"
                  placeholder="Summary of experience, degrees, qualifications, and focus areas..."
                ></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="saving">
                <span *ngIf="saving" class="spinner"></span>
                <span *ngIf="!saving">{{ editingId ? 'Save Changes' : 'Add Member' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Modal -->
      <div *ngIf="memberToDelete" class="modal-backdrop" (click)="memberToDelete = null">
        <div class="modal-content sm-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Confirm Delete Member</h3>
            <button class="close-btn" (click)="memberToDelete = null">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to remove <strong>"{{ memberToDelete.name }}"</strong> from the directory?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="memberToDelete = null">Cancel</button>
            <button type="button" class="btn btn-danger" (click)="deleteConfirmed()">Delete Member</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-page {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .page-subtitle {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .toast-banner {
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .toast-banner.success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: inherit; }

    .filter-bar {
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .category-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .cat-pill {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 0.35rem 0.875rem;
      border-radius: 9999px;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s;
    }
    .cat-pill:hover { background: #e2e8f0; }
    .cat-pill.active { background: var(--secondary-blue); border-color: var(--secondary-blue); color: white; }

    .search-box { position: relative; min-width: 280px; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); width: 1rem; height: 1rem; color: #94a3b8; }
    .search-input { padding-left: 2.25rem; font-size: 0.8125rem; }

    .table-card { overflow: hidden; }
    .table-responsive { overflow-x: auto; }

    .avatar-wrap {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-img { width: 100%; height: 100%; object-fit: cover; }

    .member-info { display: flex; flex-direction: column; max-width: 250px; }
    .member-name { font-size: 0.875rem; color: var(--text-main); }
    .member-role { font-size: 0.75rem; color: var(--text-muted); }

    .linkedin-link {
      color: #0A66C2;
      display: inline-flex;
      padding: 0.25rem;
      border-radius: 4px;
    }
    .linkedin-link:hover { background: rgba(10, 102, 194, 0.1); }

    .bio-excerpt {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 0.8125rem;
      color: var(--text-muted);
      max-width: 380px;
    }

    .action-buttons { display: flex; align-items: center; justify-content: flex-end; gap: 0.375rem; }
    .icon-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--surface-border);
      background: white;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
    }
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

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class TeamListComponent implements OnInit {
  members: TeamMember[] = [];
  categories = [
    { label: 'All Categories', value: 'All' },
    { label: 'Sambhav Board – NP', value: 'nepal_board' },
    { label: 'Possible Board – US', value: 'us_board' },
    { label: 'Staff & Team', value: 'team_member' },
    { label: 'Advisors', value: 'advisor' },
  ];
  selectedCategory = 'All';
  searchQuery = '';
  loading = false;
  saving = false;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  isModalOpen = false;
  editingId: string | null = null;
  formData: Partial<TeamMember> = {
    name: '',
    role: '',
    category: 'nepal_board',
    image: '',
    bio: '',
    linkedin: ''
  };

  memberToDelete: TeamMember | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getTeamMembers(this.selectedCategory, this.searchQuery).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.members = res.team || [];
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load team directory', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.loadMembers();
  }

  onSearch() {
    this.loadMembers();
  }

  getCategoryLabel(cat: string): string {
    switch (cat) {
      case 'us_board': return 'US Board';
      case 'nepal_board': return 'Nepal Board';
      case 'advisor': return 'Advisor';
      default: return 'Team';
    }
  }

  openCreateModal() {
    this.editingId = null;
    this.formData = {
      name: '',
      role: '',
      category: 'nepal_board',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
      bio: '',
      linkedin: ''
    };
    this.isModalOpen = true;
  }

  openEditModal(m: TeamMember) {
    this.editingId = m.id;
    this.formData = { ...m };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingId = null;
  }

  saveMember() {
    if (!this.formData.name || !this.formData.role || !this.formData.category) {
      this.showToast('Name, role and category are required', 'error');
      return;
    }

    this.saving = true;

    if (this.editingId) {
      this.apiService.updateTeamMember(this.editingId, this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Member profile updated successfully', 'success');
            this.closeModal();
            this.loadMembers();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to update member', 'error');
        }
      });
    } else {
      this.apiService.createTeamMember(this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Team member added successfully', 'success');
            this.closeModal();
            this.loadMembers();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to create member', 'error');
        }
      });
    }
  }

  confirmDelete(m: TeamMember) {
    this.memberToDelete = m;
  }

  deleteConfirmed() {
    if (!this.memberToDelete) return;
    this.apiService.deleteTeamMember(this.memberToDelete.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.memberToDelete = null;
          this.showToast('Member removed from directory', 'success');
          this.loadMembers();
        }
      },
      error: () => {
        this.showToast('Failed to delete member', 'error');
      }
    });
  }

  onAvatarError(e: any) {
    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80';
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => { this.toastMessage = ''; }, 4000);
  }
}
