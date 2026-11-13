import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { SiteSettings, AdminUser } from '../../core/models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Settings & Account Management</h1>
          <p class="page-subtitle">Configure user account details, passwords, office locations, and public organization links</p>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="settings-tabs">
        <button
          type="button"
          class="tab-btn"
          [class.active]="activeTab === 'profile'"
          (click)="activeTab = 'profile'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>User Profile & Security</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          [class.active]="activeTab === 'offices'"
          (click)="activeTab = 'offices'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Office Locations</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          [class.active]="activeTab === 'social'"
          (click)="activeTab = 'social'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>Social Media Links</span>
        </button>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- TAB 1: User Profile & Security -->
      <div *ngIf="activeTab === 'profile'" class="settings-grid">
        <!-- Personal Information -->
        <div class="card settings-card">
          <div class="card-head">
            <h3>Personal Information</h3>
            <p>Update your administrator name, username, and contact email</p>
          </div>

          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" [(ngModel)]="profileForm.full_name" placeholder="System Administrator" />
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" [(ngModel)]="profileForm.email" placeholder="admin@possiblehealth.org" />
            </div>

            <div class="form-group">
              <label class="form-label">Username</label>
              <input type="text" class="form-input" [(ngModel)]="profileForm.username" placeholder="admin" />
            </div>
          </div>

          <div class="role-badge-box">
            <div class="role-pill">
              <span class="role-title">Assigned Role:</span>
              <span class="role-tag" [ngClass]="profileUser?.role === 'SUPER_ADMIN' ? 'role-super' : 'role-admin'">
                {{ profileUser?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Administrator' }}
              </span>
            </div>
            <p class="role-desc" *ngIf="profileUser?.role === 'SUPER_ADMIN'">
              Full system privileges: Access to content management, payments & donations, and incoming contact submissions.
            </p>
            <p class="role-desc" *ngIf="profileUser?.role !== 'SUPER_ADMIN'">
              Standard administrative privileges: Access to News, Team, Publications, and Solutions. No payment or submission access.
            </p>
          </div>

          <div class="card-actions">
            <button class="btn btn-primary" (click)="saveProfileDetails()" [disabled]="savingProfile">
              <span *ngIf="savingProfile" class="spinner"></span>
              <span>Update Profile</span>
            </button>
          </div>
        </div>

        <!-- Security & Password Change -->
        <div class="card settings-card">
          <div class="card-head">
            <h3>Change Password</h3>
            <p>Ensure your account is protected with a strong, secure password</p>
          </div>

          <div class="form-group">
            <label class="form-label">Current Password</label>
            <input
              type="password"
              class="form-input"
              [(ngModel)]="passwordForm.current_password"
              placeholder="Enter your current password"
            />
          </div>

          <div class="form-group">
            <label class="form-label">New Password</label>
            <input
              type="password"
              class="form-input"
              [(ngModel)]="passwordForm.new_password"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Confirm New Password</label>
            <input
              type="password"
              class="form-input"
              [(ngModel)]="passwordForm.confirm_password"
              placeholder="Re-enter your new password"
            />
          </div>

          <div class="card-actions">
            <button class="btn btn-primary" (click)="changePassword()" [disabled]="savingPassword">
              <span *ngIf="savingPassword" class="spinner"></span>
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: Office Locations -->
      <div *ngIf="activeTab === 'offices'" class="settings-grid">
        <!-- Nepal Office Settings -->
        <div class="card settings-card">
          <div class="card-head">
            <h3>Nepal Office (Sambhav)</h3>
            <p>Main headquarters and registered operational office</p>
          </div>

          <div class="form-group">
            <label class="form-label">Entity Name</label>
            <input type="text" class="form-input" [(ngModel)]="nepalOffice.entity" />
          </div>

          <div class="form-group">
            <label class="form-label">Physical Address</label>
            <textarea rows="2" class="form-textarea" [(ngModel)]="nepalOffice.address"></textarea>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="text" class="form-input" [(ngModel)]="nepalOffice.phone" />
            </div>

            <div class="form-group">
              <label class="form-label">General Enquiries Email</label>
              <input type="email" class="form-input" [(ngModel)]="nepalOffice.email" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Working Hours</label>
            <input type="text" class="form-input" [(ngModel)]="nepalOffice.hours" />
          </div>

          <div class="card-actions">
            <button class="btn btn-primary" (click)="saveNepalOffice()" [disabled]="saving">
              Save Nepal Office
            </button>
          </div>
        </div>

        <!-- US Office Settings -->
        <div class="card settings-card">
          <div class="card-head">
            <h3>US Office (Possible US)</h3>
            <p>Nonprofit mailing address and support contact</p>
          </div>

          <div class="form-group">
            <label class="form-label">Entity Name</label>
            <input type="text" class="form-input" [(ngModel)]="usOffice.entity" />
          </div>

          <div class="form-group">
            <label class="form-label">Mailing Address</label>
            <textarea rows="2" class="form-textarea" [(ngModel)]="usOffice.address"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Donations & Support Email</label>
            <input type="email" class="form-input" [(ngModel)]="usOffice.email" />
          </div>

          <div class="card-actions">
            <button class="btn btn-primary" (click)="saveUsOffice()" [disabled]="saving">
              Save US Office
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 3: Social Media Links -->
      <div *ngIf="activeTab === 'social'" class="settings-grid">
        <div class="card settings-card full-width">
          <div class="card-head">
            <h3>Social Media & Web Links</h3>
            <p>Official public accounts linked from website header and footer</p>
          </div>

          <div class="grid-3">
            <div class="form-group">
              <label class="form-label">LinkedIn Profile URL</label>
              <input type="text" class="form-input" [(ngModel)]="socialLinks.linkedin" />
            </div>

            <div class="form-group">
              <label class="form-label">Twitter / X Profile URL</label>
              <input type="text" class="form-input" [(ngModel)]="socialLinks.twitter" />
            </div>

            <div class="form-group">
              <label class="form-label">Facebook Profile URL</label>
              <input type="text" class="form-input" [(ngModel)]="socialLinks.facebook" />
            </div>
          </div>

          <div class="card-actions">
            <button class="btn btn-primary" (click)="saveSocialLinks()" [disabled]="saving">
              Save Social Links
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; align-items: center; justify-content: space-between; }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); }
    .page-subtitle { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem; }

    .settings-tabs {
      display: flex;
      gap: 0.5rem;
      border-bottom: 1px solid var(--surface-border);
      padding-bottom: 0.5rem;
      flex-wrap: wrap;
    }

    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1.125rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-muted);
      background: transparent;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }

    .tab-btn.active {
      background: white;
      color: var(--primary-pink);
      border-color: var(--surface-border);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .toast-banner { padding: 0.75rem 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; font-weight: 500; }
    .toast-banner.success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: inherit; }

    .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem; }
    .settings-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .settings-card.full-width { grid-column: 1 / -1; }

    .card-head { border-bottom: 1px solid var(--surface-border-subtle); padding-bottom: 0.75rem; }
    .card-head h3 { font-size: 1.125rem; font-weight: 700; color: var(--text-main); }
    .card-head p { font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.15rem; }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }

    .role-badge-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: var(--radius-md);
      padding: 0.875rem 1rem;
    }

    .role-pill {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.375rem;
    }

    .role-title {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #475569;
    }

    .role-tag {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .role-super {
      background: rgba(237, 46, 132, 0.12);
      color: var(--primary-pink);
      border: 1px solid rgba(237, 46, 132, 0.25);
    }

    .role-admin {
      background: rgba(28, 143, 160, 0.12);
      color: var(--secondary-blue);
      border: 1px solid rgba(28, 143, 160, 0.25);
    }

    .role-desc {
      font-size: 0.775rem;
      color: #64748b;
      line-height: 1.4;
      margin: 0;
    }

    .card-actions { margin-top: auto; padding-top: 0.5rem; display: flex; justify-content: flex-end; }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
      margin-right: 0.375rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class SettingsComponent implements OnInit {
  activeTab: 'profile' | 'offices' | 'social' = 'profile';

  profileUser: AdminUser | null = null;
  profileForm = {
    full_name: '',
    email: '',
    username: ''
  };

  passwordForm = {
    current_password: '',
    new_password: '',
    confirm_password: ''
  };

  nepalOffice: any = {
    entity: 'Sambhav (Possible), Nepal',
    address: 'Ward No 1, Bhim Plaza, Bhupi Sadak, Narayanchour, Naxal, Kathmandu, NPL',
    phone: '9822999300',
    email: 'answers@possiblehealth.org',
    hours: 'Mon–Fri, 9:00 AM – 5:00 PM (except public holidays)'
  };

  usOffice: any = {
    entity: 'Possible US',
    address: '99 Wall Street #4100, New York, NY 10005',
    email: 'donations@possiblehealth.org'
  };

  socialLinks: any = {
    linkedin: 'https://linkedin.com/company/possiblehealth',
    twitter: 'https://twitter.com/possiblehealth',
    facebook: 'https://facebook.com/possiblehealth'
  };

  saving = false;
  savingProfile = false;
  savingPassword = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadSiteSettings();
  }

  loadProfile() {
    this.profileUser = this.authService.currentUser();
    if (this.profileUser) {
      this.profileForm = {
        full_name: this.profileUser.full_name || '',
        email: this.profileUser.email || '',
        username: this.profileUser.username || ''
      };
    }
    this.authService.checkAuthMe().subscribe({
      next: (res) => {
        if (res.success && res.user) {
          this.profileUser = res.user;
          this.profileForm = {
            full_name: res.user.full_name || '',
            email: res.user.email || '',
            username: res.user.username || ''
          };
          this.cdr.markForCheck();
        }
      },
      error: () => {}
    });
  }

  loadSiteSettings() {
    this.apiService.getSettings().subscribe({
      next: (res) => {
        if (res.success && res.settings) {
          if (res.settings.contact_nepal_office) this.nepalOffice = res.settings.contact_nepal_office;
          if (res.settings.contact_us_office) this.usOffice = res.settings.contact_us_office;
          if (res.settings.social_links) this.socialLinks = res.settings.social_links;
          this.cdr.markForCheck();
        }
      },
      error: () => {
        this.cdr.markForCheck();
      }
    });
  }

  saveProfileDetails() {
    if (!this.profileForm.full_name.trim() || !this.profileForm.username.trim()) {
      this.showToast('Full name and username cannot be empty', 'error');
      return;
    }

    this.savingProfile = true;
    this.authService.updateProfile({
      full_name: this.profileForm.full_name.trim(),
      email: this.profileForm.email.trim(),
      username: this.profileForm.username.trim()
    }).subscribe({
      next: (res) => {
        this.savingProfile = false;
        if (res.success) {
          this.profileUser = res.user;
          this.showToast('Profile information updated successfully', 'success');
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.savingProfile = false;
        this.showToast(err.error?.error || 'Failed to update profile details', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  changePassword() {
    if (!this.passwordForm.current_password) {
      this.showToast('Please enter your current password', 'error');
      return;
    }
    if (!this.passwordForm.new_password || this.passwordForm.new_password.length < 6) {
      this.showToast('New password must be at least 6 characters long', 'error');
      return;
    }
    if (this.passwordForm.new_password !== this.passwordForm.confirm_password) {
      this.showToast('New password and confirmation do not match', 'error');
      return;
    }

    this.savingPassword = true;
    this.authService.updateProfile({
      current_password: this.passwordForm.current_password,
      new_password: this.passwordForm.new_password
    }).subscribe({
      next: (res) => {
        this.savingPassword = false;
        if (res.success) {
          this.passwordForm = {
            current_password: '',
            new_password: '',
            confirm_password: ''
          };
          this.showToast('Password changed successfully', 'success');
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.savingPassword = false;
        this.showToast(err.error?.error || 'Failed to change password', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  saveNepalOffice() {
    this.saving = true;
    this.apiService.updateSetting('contact_nepal_office', this.nepalOffice).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('Nepal office details updated successfully', 'success');
        this.cdr.markForCheck();
      },
      error: () => {
        this.saving = false;
        this.showToast('Failed to update settings', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  saveUsOffice() {
    this.saving = true;
    this.apiService.updateSetting('contact_us_office', this.usOffice).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('US office details updated successfully', 'success');
        this.cdr.markForCheck();
      },
      error: () => {
        this.saving = false;
        this.showToast('Failed to update settings', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  saveSocialLinks() {
    this.saving = true;
    this.apiService.updateSetting('social_links', this.socialLinks).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('Social profile links updated successfully', 'success');
        this.cdr.markForCheck();
      },
      error: () => {
        this.saving = false;
        this.showToast('Failed to update settings', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
      this.cdr.markForCheck();
    }, 4000);
  }
}
