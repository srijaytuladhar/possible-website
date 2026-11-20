import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { AdminUser, RoleInfo, AuditLog } from '../../core/models';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">User Administration & RBAC</h1>
          <p class="page-subtitle">Manage portal users, access credentials, and role-based permissions.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-secondary" (click)="openAuditLogsModal()">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Audit Trail</span>
          </button>
          <button class="btn btn-secondary" (click)="openRolesMatrixModal()">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Role Matrix</span>
          </button>
          <button class="btn btn-primary" (click)="openCreateModal()" [disabled]="isReadOnly">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Add User</span>
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
        <div class="filter-group">
          <div class="category-pills">
            <button
              *ngFor="let r of roleFilters"
              type="button"
              class="cat-pill"
              [class.active]="selectedRole === r.value"
              (click)="setRole(r.value)"
            >
              {{ r.label }}
            </button>
          </div>

          <div class="status-select-wrap">
            <select class="form-input form-select" [(ngModel)]="selectedStatus" (change)="loadUsers()">
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Users</option>
              <option value="INACTIVE">Deactivated Users</option>
            </select>
          </div>
        </div>

        <div class="search-box">
          <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            class="form-input search-input"
            placeholder="Search by name, username or email..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state card">
        <div class="spinner"></div>
        <p>Loading portal users...</p>
      </div>

      <!-- Users Table -->
      <div *ngIf="!loading" class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 50px;">Avatar</th>
                <th>Name & Username</th>
                <th>Email & Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Created</th>
                <th style="width: 140px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let u of users">
                <td>
                  <div class="avatar-circle" [ngClass]="'role-' + u.role.toLowerCase()">
                    {{ getUserInitials(u.full_name) }}
                  </div>
                </td>
                <td>
                  <div class="user-name-title">
                    <span class="user-fullname">{{ u.full_name }}</span>
                    <span class="user-username">&#64;{{ u.username }}</span>
                  </div>
                </td>
                <td>
                  <div class="user-contact">
                    <span class="user-email">{{ u.email }}</span>
                    <span *ngIf="u.phone" class="user-phone">{{ u.phone }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge" [ngClass]="getRoleBadgeClass(u.role)">
                    {{ formatRoleName(u.role) }}
                  </span>
                </td>
                <td>
                  <span class="status-indicator" [class.active]="u.is_active" [class.inactive]="!u.is_active">
                    <span class="dot"></span>
                    <span>{{ u.is_active ? 'Active' : 'Deactivated' }}</span>
                  </span>
                </td>
                <td class="text-muted text-sm">
                  {{ u.last_login ? (u.last_login | date:'medium') : 'Never' }}
                </td>
                <td class="text-muted text-sm">
                  {{ u.created_at | date:'mediumDate' }}
                </td>
                <td style="text-align: right;">
                  <div class="row-actions">
                    <button class="icon-btn edit-btn" (click)="openEditModal(u)" title="Edit user profile & role" [disabled]="isReadOnly">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button class="icon-btn key-btn" (click)="openResetPasswordModal(u)" title="Reset user password" [disabled]="isReadOnly">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </button>
                    <button
                      class="icon-btn delete-btn"
                      (click)="confirmDelete(u)"
                      title="Delete account"
                      [disabled]="isReadOnly || u.id === currentUser?.id || (u.role === 'SUPER_ADMIN' && !isSuperAdmin)"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr *ngIf="users.length === 0">
                <td colspan="8" class="empty-cell">
                  <div class="empty-state">
                    <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p class="empty-title">No portal users found</p>
                    <p class="empty-desc">Try clearing filters or search queries.</p>
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
            <h2 class="modal-title">{{ editingId ? 'Edit User Account' : 'Create New Portal User' }}</h2>
            <button class="modal-close" (click)="closeModal()">&times;</button>
          </div>

          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Username <span class="required">*</span></label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.username"
                  [disabled]="!!editingId"
                  placeholder="e.g. jdoe_admin"
                />
                <span *ngIf="editingId" class="form-hint">Username cannot be changed once created</span>
              </div>

              <div class="form-group">
                <label class="form-label">Full Name <span class="required">*</span></label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.full_name"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Email Address <span class="required">*</span></label>
                <input
                  type="email"
                  class="form-input"
                  [(ngModel)]="formData.email"
                  placeholder="e.g. jdoe@possiblehealth.org"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="formData.phone"
                  placeholder="e.g. +977 9822999300"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Role <span class="required">*</span></label>
                <select class="form-input form-select" [(ngModel)]="formData.role">
                  <option value="SUPER_ADMIN" [disabled]="!isSuperAdmin">Super Admin (Full System Privileges)</option>
                  <option value="ADMIN">Admin (Content & User Management)</option>
                  <option value="CONTENT_MANAGER">Content Manager (All Content Modules)</option>
                  <option value="READ_ONLY">Read Only (View Access Only)</option>
                </select>
                <span *ngIf="!isSuperAdmin && formData.role !== 'SUPER_ADMIN'" class="form-hint">Only Super Admins can assign the Super Admin role</span>
              </div>

              <div *ngIf="!editingId" class="form-group">
                <label class="form-label">Initial Password <span class="required">*</span></label>
                <input
                  type="password"
                  class="form-input"
                  [(ngModel)]="formData.password"
                  placeholder="Minimum 8 characters with letters and numbers"
                />
                <span class="form-hint">At least 8 characters, letters and numbers</span>
              </div>

              <div class="form-group full-width">
                <label class="form-checkbox-label">
                  <input type="checkbox" [(ngModel)]="formData.is_active" [disabled]="editingId === currentUser?.id" />
                  <span>Account Active (permits login to portal)</span>
                </label>
                <span *ngIf="editingId === currentUser?.id" class="form-hint">You cannot deactivate your own account</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button class="btn btn-primary" (click)="saveUser()" [disabled]="saving">
              <span *ngIf="saving" class="spinner-small"></span>
              <span>{{ saving ? 'Saving...' : (editingId ? 'Update Account' : 'Create User') }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- RESET PASSWORD MODAL -->
      <div *ngIf="isResetModalOpen" class="modal-backdrop" (click)="isResetModalOpen = false">
        <div class="modal-card modal-sm" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">Reset Password</h2>
            <button class="modal-close" (click)="isResetModalOpen = false">&times;</button>
          </div>

          <div class="modal-body">
            <p class="modal-desc">
              Set a new secure password for <strong>{{ targetUserForReset?.full_name }}</strong> (&#64;{{ targetUserForReset?.username }}).
            </p>

            <div class="form-group" style="margin-top: 1rem;">
              <label class="form-label">New Password <span class="required">*</span></label>
              <input
                type="password"
                class="form-input"
                [(ngModel)]="newPasswordInput"
                placeholder="Minimum 8 characters with letters & numbers"
              />
            </div>
            <div class="form-group" style="margin-top: 1rem;">
              <label class="form-label">Confirm Password <span class="required">*</span></label>
              <input
                type="password"
                class="form-input"
                [(ngModel)]="confirmPasswordInput"
                placeholder="Re-type password"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="isResetModalOpen = false">Cancel</button>
            <button class="btn btn-primary" (click)="submitPasswordReset()" [disabled]="saving">
              <span *ngIf="saving" class="spinner-small"></span>
              <span>{{ saving ? 'Resetting...' : 'Set New Password' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- DELETE CONFIRMATION MODAL -->
      <div *ngIf="userToDelete" class="modal-backdrop" (click)="userToDelete = null">
        <div class="modal-card modal-sm" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title text-danger">Confirm Account Deletion</h2>
            <button class="modal-close" (click)="userToDelete = null">&times;</button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to permanently delete user account
              <strong>{{ userToDelete.full_name }}</strong> (&#64;{{ userToDelete.username }})?
            </p>
            <p class="text-danger-sm">This action cannot be undone and will revoke all access immediately.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="userToDelete = null">Cancel</button>
            <button class="btn btn-danger" (click)="deleteConfirmed()">Permanently Delete</button>
          </div>
        </div>
      </div>

      <!-- ROLE MATRIX MODAL -->
      <div *ngIf="isMatrixModalOpen" class="modal-backdrop" (click)="isMatrixModalOpen = false">
        <div class="modal-card modal-lg" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">Role-Based Access Control (RBAC) Matrix</h2>
            <button class="modal-close" (click)="isMatrixModalOpen = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="matrix-table-wrap">
              <table class="data-table matrix-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Homepage</th>
                    <th>Collaborators</th>
                    <th>Work With Us</th>
                    <th>Content Modules</th>
                    <th>User Management</th>
                    <th>Communications</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Super Admin</strong></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">All Users + Super Admin</span></td>
                    <td><span class="check-pill">View & Manage</span></td>
                  </tr>
                  <tr>
                    <td><strong>Admin</strong></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Standard Users Only</span></td>
                    <td><span class="check-pill">View & Manage</span></td>
                  </tr>
                  <tr>
                    <td><strong>Content Manager</strong></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="check-pill">Full Access</span></td>
                    <td><span class="cross-pill">No Access</span></td>
                    <td><span class="cross-pill">No Access</span></td>
                  </tr>
                  <tr>
                    <td><strong>Read Only</strong></td>
                    <td><span class="view-pill">View Only</span></td>
                    <td><span class="view-pill">View Only</span></td>
                    <td><span class="view-pill">View Only</span></td>
                    <td><span class="view-pill">View Only</span></td>
                    <td><span class="cross-pill">No Access</span></td>
                    <td><span class="cross-pill">No Access</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" (click)="isMatrixModalOpen = false">Close</button>
          </div>
        </div>
      </div>

      <!-- AUDIT LOGS MODAL -->
      <div *ngIf="isAuditModalOpen" class="modal-backdrop" (click)="isAuditModalOpen = false">
        <div class="modal-card modal-lg" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">System Audit Log Trail</h2>
            <button class="modal-close" (click)="isAuditModalOpen = false">&times;</button>
          </div>
          <div class="modal-body">
            <div *ngIf="loadingAudit" class="loading-state">
              <div class="spinner"></div>
              <p>Fetching audit trail...</p>
            </div>
            <div *ngIf="!loadingAudit" class="audit-list">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Module</th>
                    <th>Record ID</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let l of auditLogs">
                    <td class="text-sm text-muted">{{ l.created_at | date:'medium' }}</td>
                    <td><strong>&#64;{{ l.username }}</strong></td>
                    <td><span class="badge badge-neutral">{{ l.action }}</span></td>
                    <td>{{ l.module }}</td>
                    <td>{{ l.record_id || '-' }}</td>
                    <td class="text-sm">{{ formatDetails(l.details) }}</td>
                  </tr>
                  <tr *ngIf="auditLogs.length === 0">
                    <td colspan="6" class="text-center text-muted" style="padding: 2rem;">No audit records logged yet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" (click)="isAuditModalOpen = false">Close</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-page {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.25rem 0;
    }

    .page-subtitle {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background: var(--primary-pink);
      color: #fff;
    }

    .btn-primary:hover:not(:disabled) {
      filter: brightness(0.92);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #e2e8f0;
    }

    .btn-danger {
      background: #ef4444;
      color: #fff;
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    .card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .filter-bar {
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .category-pills {
      display: flex;
      gap: 0.375rem;
      flex-wrap: wrap;
    }

    .cat-pill {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #64748b;
      cursor: pointer;
      transition: all 0.15s;
    }

    .cat-pill.active {
      background: var(--primary-pink);
      border-color: var(--primary-pink);
      color: #fff;
    }

    .search-box {
      position: relative;
      min-width: 280px;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      color: #94a3b8;
    }

    .search-input {
      padding-left: 2.25rem !important;
      width: 100%;
    }

    .form-input {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      color: #1e293b;
      outline: none;
      transition: border-color 0.15s;
    }

    .form-input:focus {
      border-color: var(--primary-pink);
      box-shadow: 0 0 0 3px rgba(237, 46, 132, 0.15);
    }

    .form-select {
      background-color: #fff;
      cursor: pointer;
    }

    .table-responsive {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.875rem;
    }

    .data-table th {
      background: #f8fafc;
      padding: 0.75rem 1rem;
      font-weight: 600;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .data-table td {
      padding: 0.875rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
      vertical-align: middle;
    }

    .data-table tr:hover td {
      background: #fafafa;
    }

    .avatar-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.8125rem;
      background: #f1f5f9;
      color: #475569;
    }

    .avatar-circle.role-super_admin {
      background: #fdf2f8;
      color: var(--primary-pink);
    }

    .avatar-circle.role-admin {
      background: #eff6ff;
      color: #2563eb;
    }

    .avatar-circle.role-content_manager {
      background: #faf5ff;
      color: #9333ea;
    }

    .avatar-circle.role-read_only {
      background: #f1f5f9;
      color: #64748b;
    }

    .user-name-title {
      display: flex;
      flex-direction: column;
    }

    .user-fullname {
      font-weight: 600;
      color: #0f172a;
    }

    .user-username {
      font-size: 0.75rem;
      color: #64748b;
    }

    .user-contact {
      display: flex;
      flex-direction: column;
    }

    .user-email {
      color: #334155;
    }

    .user-phone {
      font-size: 0.75rem;
      color: #64748b;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .badge-super {
      background: #fdf2f8;
      color: var(--primary-pink);
      border: 1px solid rgba(237, 46, 132, 0.3);
    }

    .badge-admin {
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid rgba(29, 78, 216, 0.2);
    }

    .badge-manager {
      background: #faf5ff;
      color: #7e22ce;
      border: 1px solid rgba(126, 34, 206, 0.2);
    }

    .badge-readonly {
      background: #f8fafc;
      color: #475569;
      border: 1px solid #cbd5e1;
    }

    .status-indicator {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 500;
    }

    .status-indicator .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .status-indicator.active {
      color: #16a34a;
    }

    .status-indicator.active .dot {
      background: #22c55e;
    }

    .status-indicator.inactive {
      color: #dc2626;
    }

    .status-indicator.inactive .dot {
      background: #ef4444;
    }

    .row-actions {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }

    .icon-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid transparent;
      background: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
    }

    .icon-btn:hover:not(:disabled) {
      background: #f1f5f9;
    }

    .edit-btn { color: #2563eb; }
    .edit-btn:hover:not(:disabled) { background: #eff6ff; border-color: #bfdbfe; }

    .key-btn { color: #d97706; }
    .key-btn:hover:not(:disabled) { background: #fffbeb; border-color: #fde68a; }

    .delete-btn { color: #ef4444; }
    .delete-btn:hover:not(:disabled) { background: #fef2f2; border-color: #fecaca; }

    .icon-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .toast-banner {
      padding: 0.875rem 1.25rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .toast-banner.success {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    .toast-banner.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .toast-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      line-height: 1;
      cursor: pointer;
      color: inherit;
    }

    /* Modal Styling */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1.5rem;
    }

    .modal-card {
      background: #fff;
      border-radius: 12px;
      width: 100%;
      max-width: 620px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
    }

    .modal-card.modal-sm { max-width: 440px; }
    .modal-card.modal-lg { max-width: 820px; }

    .modal-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      line-height: 1;
      color: #94a3b8;
      cursor: pointer;
    }

    .modal-close:hover { color: #0f172a; }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-desc {
      font-size: 0.875rem;
      color: #475569;
      line-height: 1.5;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      background: #f8fafc;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
    }

    .required { color: #ef4444; }

    .form-hint {
      font-size: 0.75rem;
      color: #64748b;
    }

    .form-checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1e293b;
      cursor: pointer;
    }

    .text-danger { color: #dc2626; }
    .text-danger-sm { color: #dc2626; font-size: 0.8125rem; margin-top: 0.5rem; }
    .text-muted { color: #64748b; }
    .text-sm { font-size: 0.8125rem; }

    .matrix-table th, .matrix-table td {
      padding: 0.625rem 0.875rem;
      font-size: 0.8125rem;
    }

    .check-pill {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      background: #f0fdf4;
      color: #166534;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .cross-pill {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      background: #fef2f2;
      color: #991b1b;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .view-pill {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      background: #f8fafc;
      color: #475569;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .spinner {
      width: 2rem;
      height: 2rem;
      border: 3px solid #e2e8f0;
      border-top-color: var(--primary-pink);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 0.75rem;
    }

    .spinner-small {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-state {
      padding: 3rem;
      text-align: center;
      color: #64748b;
    }

    .empty-state {
      padding: 3rem 1rem;
      text-align: center;
    }

    .empty-icon {
      width: 3rem;
      height: 3rem;
      color: #94a3b8;
      margin-bottom: 0.5rem;
    }

    .empty-title {
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }

    .empty-desc {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0;
    }

    @media (max-width: 640px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class UsersListComponent implements OnInit {
  users: AdminUser[] = [];
  loading = false;
  saving = false;
  searchQuery = '';
  selectedRole = 'ALL';
  selectedStatus = 'ALL';

  roleFilters = [
    { label: 'All Roles', value: 'ALL' },
    { label: 'Super Admin', value: 'SUPER_ADMIN' },
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Content Manager', value: 'CONTENT_MANAGER' },
    { label: 'Read Only', value: 'READ_ONLY' },
  ];

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  // Modals
  isModalOpen = false;
  isResetModalOpen = false;
  isMatrixModalOpen = false;
  isAuditModalOpen = false;

  editingId: number | null = null;
  formData: any = {
    username: '',
    full_name: '',
    email: '',
    phone: '',
    role: 'ADMIN',
    password: '',
    is_active: true,
  };

  targetUserForReset: AdminUser | null = null;
  newPasswordInput = '';
  confirmPasswordInput = '';

  userToDelete: AdminUser | null = null;

  auditLogs: AuditLog[] = [];
  loadingAudit = false;

  get currentUser(): AdminUser | null {
    return this.authService.currentUser();
  }

  get isSuperAdmin(): boolean {
    return this.currentUser?.role === 'SUPER_ADMIN';
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
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.apiService.getUsers(this.selectedRole, this.selectedStatus, this.searchQuery).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.users = res.users;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.error || 'Failed to load users', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  onSearch() {
    this.loadUsers();
  }

  setRole(r: string) {
    this.selectedRole = r;
    this.loadUsers();
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

  getUserInitials(name?: string): string {
    if (!name) return 'U';
    const p = name.trim().split(' ');
    return p.length > 1 ? (p[0][0] + p[1][0]).toUpperCase() : p[0].substring(0, 2).toUpperCase();
  }

  formatRoleName(role?: string): string {
    if (!role) return '';
    switch (role.toUpperCase()) {
      case 'SUPER_ADMIN': return 'Super Admin';
      case 'ADMIN': return 'Admin';
      case 'CONTENT_MANAGER': return 'Content Manager';
      case 'READ_ONLY': return 'Read Only';
      default: return role;
    }
  }

  getRoleBadgeClass(role?: string): string {
    if (!role) return 'badge-readonly';
    switch (role.toUpperCase()) {
      case 'SUPER_ADMIN': return 'badge-super';
      case 'ADMIN': return 'badge-admin';
      case 'CONTENT_MANAGER': return 'badge-manager';
      default: return 'badge-readonly';
    }
  }

  openCreateModal() {
    this.editingId = null;
    this.formData = {
      username: '',
      full_name: '',
      email: '',
      phone: '',
      role: 'ADMIN',
      password: '',
      is_active: true,
    };
    this.isModalOpen = true;
  }

  openEditModal(u: AdminUser) {
    this.editingId = u.id;
    this.formData = {
      username: u.username,
      full_name: u.full_name,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      is_active: u.is_active !== undefined ? u.is_active : true,
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingId = null;
  }

  saveUser() {
    if (!this.formData.full_name || !this.formData.email || !this.formData.role) {
      this.showToast('Full name, email, and role are required', 'error');
      return;
    }

    if (!this.editingId && (!this.formData.username || !this.formData.password)) {
      this.showToast('Username and password are required', 'error');
      return;
    }

    this.saving = true;

    if (this.editingId) {
      this.apiService.updateUser(this.editingId, this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('User account updated successfully', 'success');
            this.closeModal();
            this.loadUsers();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to update user', 'error');
        }
      });
    } else {
      this.apiService.createUser(this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('User account created successfully', 'success');
            this.closeModal();
            this.loadUsers();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to create user', 'error');
        }
      });
    }
  }

  openResetPasswordModal(u: AdminUser) {
    this.targetUserForReset = u;
    this.newPasswordInput = '';
    this.confirmPasswordInput = '';
    this.isResetModalOpen = true;
  }

  submitPasswordReset() {
    if (!this.targetUserForReset) return;
    if (!this.newPasswordInput) {
      this.showToast('Please enter a new password', 'error');
      return;
    }
    if (this.newPasswordInput !== this.confirmPasswordInput) {
      this.showToast('Passwords do not match', 'error');
      return;
    }
    if (this.newPasswordInput.length < 8) {
      this.showToast('Password must be at least 8 characters long', 'error');
      return;
    }

    this.saving = true;
    this.apiService.resetUserPassword(this.targetUserForReset.id, this.newPasswordInput).subscribe({
      next: (res) => {
        this.saving = false;
        if (res.success) {
          this.showToast('Password reset successfully', 'success');
          this.isResetModalOpen = false;
          this.targetUserForReset = null;
        }
      },
      error: (err) => {
        this.saving = false;
        this.showToast(err.error?.error || 'Failed to reset password', 'error');
      }
    });
  }

  confirmDelete(u: AdminUser) {
    this.userToDelete = u;
  }

  deleteConfirmed() {
    if (!this.userToDelete) return;
    this.apiService.deleteUser(this.userToDelete.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('User removed successfully', 'success');
          this.userToDelete = null;
          this.loadUsers();
        }
      },
      error: (err) => {
        this.showToast(err.error?.error || 'Failed to delete user', 'error');
      }
    });
  }

  openRolesMatrixModal() {
    this.isMatrixModalOpen = true;
  }

  openAuditLogsModal() {
    this.isAuditModalOpen = true;
    this.loadingAudit = true;
    this.apiService.getAuditLogs().subscribe({
      next: (res) => {
        this.loadingAudit = false;
        if (res.success) {
          this.auditLogs = res.logs;
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loadingAudit = false;
        this.cdr.markForCheck();
      }
    });
  }

  formatDetails(d: any): string {
    if (!d) return '-';
    if (typeof d === 'string') return d;
    return JSON.stringify(d);
  }
}
