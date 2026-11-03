import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { SiteSettings } from '../../core/models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Global Site Settings</h1>
          <p class="page-subtitle">Configure organization contact details, office addresses, and social profile links</p>
        </div>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <div class="settings-grid">
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

        <!-- Social Media Profiles -->
        <div class="card settings-card full-width">
          <div class="card-head">
            <h3>Social Media & Web Links</h3>
            <p>URLs linked in the website header, footer, and article share dialogs</p>
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

    .card-actions { margin-top: auto; pt: 0.5rem; display: flex; justify-content: flex-end; }
  `]
})
export class SettingsComponent implements OnInit {
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
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
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

  saveNepalOffice() {
    this.saving = true;
    this.apiService.updateSetting('contact_nepal_office', this.nepalOffice).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('Nepal office details updated successfully', 'success');
      },
      error: () => {
        this.saving = false;
        this.showToast('Failed to update settings', 'error');
      }
    });
  }

  saveUsOffice() {
    this.saving = true;
    this.apiService.updateSetting('contact_us_office', this.usOffice).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('US office details updated successfully', 'success');
      },
      error: () => {
        this.saving = false;
        this.showToast('Failed to update settings', 'error');
      }
    });
  }

  saveSocialLinks() {
    this.saving = true;
    this.apiService.updateSetting('social_links', this.socialLinks).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('Social profile links updated successfully', 'success');
      },
      error: () => {
        this.saving = false;
        this.showToast('Failed to update settings', 'error');
      }
    });
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => { this.toastMessage = ''; }, 4000);
  }
}
