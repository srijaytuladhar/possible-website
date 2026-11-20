import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { HomepageSection } from '../../core/models';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="homepage-cms-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Homepage Content Management (CMS)</h1>
          <p class="page-subtitle">Configure hero banner, approach methodology, mission, dynamic stages, and partnership callouts on the public homepage.</p>
        </div>
        <div class="header-actions">
          <a href="http://localhost:3000" target="_blank" class="btn btn-secondary">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Preview Live Homepage</span>
          </a>
        </div>
      </div>

      <!-- Toast Banner -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- Section Navigation Tabs -->
      <div class="card tabs-card">
        <div class="section-tabs">
          <button
            *ngFor="let s of sectionTabs"
            type="button"
            class="section-tab-btn"
            [class.active]="activeSectionKey === s.key"
            (click)="selectSection(s.key)"
          >
            <span class="tab-index">{{ s.index }}</span>
            <span class="tab-title">{{ s.title }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state card">
        <div class="spinner"></div>
        <p>Loading homepage content sections...</p>
      </div>

      <!-- Current Section Editor -->
      <div *ngIf="!loading && currentSection" class="card section-editor-card">
        <div class="editor-header">
          <div>
            <h2 class="editor-title">{{ getSectionTitle(currentSection.section_key) }}</h2>
            <p class="editor-desc">{{ getSectionDescription(currentSection.section_key) }}</p>
          </div>
          <div class="publish-switch-wrap">
            <label class="form-checkbox-label">
              <input type="checkbox" [(ngModel)]="currentSection.is_published" [disabled]="isReadOnly" />
              <span class="publish-status-text">
                {{ currentSection.is_published ? 'Section Published' : 'Section Unpublished' }}
              </span>
            </label>
          </div>
        </div>

        <div class="editor-body">
          <div class="form-grid">
            <!-- SECTION 1: HERO SLIDER / BANNER -->
            <ng-container *ngIf="currentSection.section_key === 'hero'">
              <div class="form-group full-width">
                <label class="form-label">Hero Main Headline <span class="required">*</span></label>
                <textarea
                  rows="2"
                  class="form-input"
                  [(ngModel)]="currentSection.title"
                  placeholder="e.g. We start with health problems most see as impossible to solve."
                ></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Hero Subheading / Tagline</label>
                <textarea
                  rows="2"
                  class="form-input"
                  [(ngModel)]="currentSection.subtitle"
                  placeholder="e.g. We innovate and rigorously test health solutions with communities and the government..."
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">CTA Button Label</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.link_text"
                  placeholder="e.g. Our solutions"
                />
              </div>

              <div class="form-group">
                <label class="form-label">CTA Button Link</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.link_url"
                  placeholder="e.g. /solutions/scale"
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Hero Background Image</label>
                <div class="image-upload-row">
                  <input
                    type="text"
                    class="form-input flex-1"
                    [(ngModel)]="currentSection.image_url"
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
                <div *ngIf="currentSection.image_url" class="image-preview-box-large">
                  <img [src]="currentSection.image_url" alt="Hero Background Preview" class="preview-hero-img" />
                </div>
              </div>
            </ng-container>

            <!-- SECTION 2: SUB-HERO -->
            <ng-container *ngIf="currentSection.section_key === 'sub_hero'">
              <div class="form-group full-width">
                <label class="form-label">Section Heading</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.title"
                  placeholder="e.g. “Too complex to solve” is where we start."
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Main Description</label>
                <textarea
                  rows="4"
                  class="form-input"
                  [(ngModel)]="currentSection.subtitle"
                  placeholder="We innovate, test, and scale the health solutions..."
                ></textarea>
              </div>
            </ng-container>

            <!-- SECTION 3: APPROACH / PROCESS INTRO -->
            <ng-container *ngIf="currentSection.section_key === 'approach'">
              <div class="form-group full-width">
                <label class="form-label">Section Heading</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.title"
                  placeholder="e.g. Our approach to solve health problems"
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Approach Description Copy</label>
                <textarea
                  rows="4"
                  class="form-input"
                  [(ngModel)]="currentSection.subtitle"
                  placeholder="We work on health problems most either neglect or call impossible to solve..."
                ></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Co-Design Process Image</label>
                <div class="image-upload-row">
                  <input
                    type="text"
                    class="form-input flex-1"
                    [(ngModel)]="currentSection.image_url"
                    placeholder="Enter image URL or choose file to upload..."
                  />
                  <label class="btn btn-secondary file-upload-label">
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" (change)="onFileSelected($event)" style="display: none;" />
                  </label>
                </div>
                <div *ngIf="currentSection.image_url" class="image-preview-box-large">
                  <img [src]="currentSection.image_url" alt="Approach Preview" class="preview-hero-img" />
                </div>
              </div>
            </ng-container>

            <!-- SECTION 4: MISSION / HIMALAYAS -->
            <ng-container *ngIf="currentSection.section_key === 'mission'">
              <div class="form-group full-width">
                <label class="form-label">Mission Quote / Statement</label>
                <textarea
                  rows="4"
                  class="form-input"
                  [(ngModel)]="currentSection.subtitle"
                  placeholder="A mother in the rural foothills of the Himalayas deserves the same high-quality healthcare..."
                ></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Foothills & Mother Image</label>
                <div class="image-upload-row">
                  <input
                    type="text"
                    class="form-input flex-1"
                    [(ngModel)]="currentSection.image_url"
                    placeholder="Enter image URL or choose file to upload..."
                  />
                  <label class="btn btn-secondary file-upload-label">
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" (change)="onFileSelected($event)" style="display: none;" />
                  </label>
                </div>
                <div *ngIf="currentSection.image_url" class="image-preview-box-large">
                  <img [src]="currentSection.image_url" alt="Mission Preview" class="preview-hero-img" />
                </div>
              </div>
            </ng-container>

            <!-- SECTION 5: THREE DYNAMIC STAGES -->
            <ng-container *ngIf="currentSection.section_key === 'stages'">
              <div class="form-group full-width">
                <label class="form-label">Footer Note / Caption</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.subtitle"
                  placeholder="e.g. Our solutions move through these stages dynamically, starting with new ideas that we test and then scale."
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Three Stages Cards (Innovate, Test, Scale)</label>
                <div class="stages-editor-grid">
                  <div *ngFor="let stage of currentSection.items; let idx = index" class="stage-card-edit" [ngClass]="'theme-' + stage.theme">
                    <div class="stage-card-header">
                      <span class="stage-badge">{{ stage.title }}</span>
                      <span class="stage-theme-tag">{{ stage.theme | uppercase }}</span>
                    </div>
                    <div class="form-group" style="margin-top: 0.5rem;">
                      <label class="form-label text-xs">Stage Title</label>
                      <input type="text" class="form-input" [(ngModel)]="stage.title" />
                    </div>
                    <div class="form-group" style="margin-top: 0.5rem;">
                      <label class="form-label text-xs">Stage Description</label>
                      <textarea rows="2" class="form-input" [(ngModel)]="stage.desc"></textarea>
                    </div>
                    <div class="form-group" style="margin-top: 0.5rem;">
                      <label class="form-label text-xs">Page Link URL</label>
                      <input type="text" class="form-input" [(ngModel)]="stage.link" />
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- SECTION 6: WHO WE ARE -->
            <ng-container *ngIf="currentSection.section_key === 'who_we_are'">
              <div class="form-group full-width">
                <label class="form-label">Section Heading</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.title"
                  placeholder="Who We Are"
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Who We Are Overview Description</label>
                <textarea
                  rows="4"
                  class="form-input"
                  [(ngModel)]="currentSection.subtitle"
                  placeholder="We are health care professionals, clinicians, engineers, and advocates..."
                ></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Team Photo Image</label>
                <div class="image-upload-row">
                  <input
                    type="text"
                    class="form-input flex-1"
                    [(ngModel)]="currentSection.image_url"
                    placeholder="Enter image URL or choose file to upload..."
                  />
                  <label class="btn btn-secondary file-upload-label">
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" (change)="onFileSelected($event)" style="display: none;" />
                  </label>
                </div>
                <div *ngIf="currentSection.image_url" class="image-preview-box-large">
                  <img [src]="currentSection.image_url" alt="Team Photo Preview" class="preview-hero-img" />
                </div>
              </div>
            </ng-container>

            <!-- SECTION 7: PARTNER WITH US -->
            <ng-container *ngIf="currentSection.section_key === 'partner_with_us'">
              <div class="form-group full-width">
                <label class="form-label">Section Heading</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.title"
                  placeholder="Partner With Us"
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Section Subtitle</label>
                <input
                  type="text"
                  class="form-input"
                  [(ngModel)]="currentSection.subtitle"
                  placeholder="Working on a health problem others have overlooked or called too complex? We’d love to hear from you."
                />
              </div>

              <div class="form-group full-width">
                <label class="form-label">Bottom Summary Note</label>
                <textarea
                  rows="2"
                  class="form-input"
                  [(ngModel)]="currentSection.content"
                  placeholder="We work best with partners who work with communities and government..."
                ></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Partner Cards (Fund, Build, Share)</label>
                <div class="stages-editor-grid">
                  <div *ngFor="let card of currentSection.items; let idx = index" class="stage-card-edit" [ngClass]="'theme-' + card.theme">
                    <div class="stage-card-header">
                      <span class="stage-badge">{{ card.title }}</span>
                      <span class="stage-theme-tag">{{ card.theme | uppercase }}</span>
                    </div>
                    <div class="form-group" style="margin-top: 0.5rem;">
                      <label class="form-label text-xs">Card Title</label>
                      <input type="text" class="form-input" [(ngModel)]="card.title" />
                    </div>
                    <div class="form-group" style="margin-top: 0.5rem;">
                      <label class="form-label text-xs">Description</label>
                      <textarea rows="2" class="form-input" [(ngModel)]="card.desc"></textarea>
                    </div>
                    <div class="form-group" style="margin-top: 0.5rem;">
                      <label class="form-label text-xs">Link Destination</label>
                      <input type="text" class="form-input" [(ngModel)]="card.link" />
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>

        <div class="editor-footer">
          <div class="last-saved-time text-muted text-sm" *ngIf="currentSection.updated_at">
            Last updated: {{ currentSection.updated_at | date:'medium' }}
          </div>
          <button class="btn btn-primary" (click)="saveSection()" [disabled]="saving || isReadOnly">
            <span *ngIf="saving" class="spinner-small"></span>
            <span>{{ saving ? 'Saving Changes...' : 'Save & Publish Changes' }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .homepage-cms-page { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem 0; }
    .page-subtitle { color: #64748b; font-size: 0.875rem; margin: 0; }
    .header-actions { display: flex; gap: 0.75rem; }
    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1rem; font-size: 0.875rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: none; text-decoration: none; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-primary { background: var(--primary-pink); color: #fff; }
    .btn-primary:hover:not(:disabled) { filter: brightness(0.92); transform: translateY(-1px); }
    .btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
    .btn-secondary:hover:not(:disabled) { background: #e2e8f0; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .tabs-card { padding: 0.5rem; }
    .section-tabs { display: flex; gap: 0.5rem; overflow-x: auto; padding: 0.25rem; }
    .section-tab-btn { display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem 1rem; border-radius: 8px; border: 1px solid transparent; background: #f8fafc; color: #475569; font-size: 0.8125rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
    .section-tab-btn:hover { background: #f1f5f9; color: #0f172a; }
    .section-tab-btn.active { background: #fdf2f8; border-color: rgba(237, 46, 132, 0.3); color: var(--primary-pink); }
    .tab-index { width: 20px; height: 20px; border-radius: 50%; background: #e2e8f0; color: #475569; display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; }
    .section-tab-btn.active .tab-index { background: var(--primary-pink); color: #fff; }
    .section-editor-card { display: flex; flex-direction: column; }
    .editor-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .editor-title { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem 0; }
    .editor-desc { font-size: 0.8125rem; color: #64748b; margin: 0; }
    .publish-switch-wrap { display: flex; align-items: center; }
    .form-checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #1e293b; cursor: pointer; }
    .publish-status-text { font-size: 0.8125rem; }
    .editor-body { padding: 1.5rem; }
    .editor-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
    .form-group.full-width { grid-column: 1 / -1; }
    .form-label { font-size: 0.8125rem; font-weight: 600; color: #334155; }
    .required { color: #ef4444; }
    .text-xs { font-size: 0.75rem; }
    .text-sm { font-size: 0.8125rem; }
    .text-muted { color: #64748b; }
    .form-input { border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #1e293b; outline: none; }
    .form-input:focus { border-color: var(--primary-pink); box-shadow: 0 0 0 3px rgba(237, 46, 132, 0.15); }
    .image-upload-row { display: flex; gap: 0.5rem; align-items: center; }
    .file-upload-label { cursor: pointer; white-space: nowrap; margin: 0; }
    .uploading-indicator { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--primary-pink); margin-top: 0.375rem; }
    .image-preview-box-large { margin-top: 0.75rem; max-width: 520px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; max-height: 220px; background: #000; }
    .preview-hero-img { width: 100%; height: 100%; object-fit: cover; max-height: 220px; display: block; }
    .stages-editor-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 0.5rem; }
    .stage-card-edit { padding: 1rem; border-radius: 10px; border: 2px solid #e2e8f0; background: #fff; }
    .stage-card-edit.theme-pink { border-color: var(--primary-pink); background: #fdf2f7; }
    .stage-card-edit.theme-blue { border-color: #0284c7; background: #f0fbfd; }
    .stage-card-edit.theme-purple { border-color: #9333ea; background: #f8f2f9; }
    .stage-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .stage-badge { font-weight: 700; font-size: 0.9375rem; color: #0f172a; }
    .stage-theme-tag { font-size: 0.6875rem; font-weight: 700; color: #64748b; }
    .toast-banner { padding: 0.875rem 1.25rem; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; font-weight: 500; }
    .toast-banner.success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
    .toast-banner.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-close { background: none; border: none; font-size: 1.25rem; line-height: 1; cursor: pointer; color: inherit; }
    .spinner { width: 2rem; height: 2rem; border: 3px solid #e2e8f0; border-top-color: var(--primary-pink); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    .spinner-small { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-state { padding: 3rem; text-align: center; color: #64748b; }
    @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
  `]
})
export class HomepageContentComponent implements OnInit {
  sections: HomepageSection[] = [];
  sectionsMap: Record<string, HomepageSection> = {};
  currentSection: HomepageSection | null = null;
  activeSectionKey = 'hero';

  loading = false;
  saving = false;
  uploadingFile = false;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  sectionTabs = [
    { index: 1, key: 'hero', title: '1. Hero Banner' },
    { index: 2, key: 'sub_hero', title: '2. Sub-Hero Intro' },
    { index: 3, key: 'approach', title: '3. Approach & Process' },
    { index: 4, key: 'mission', title: '4. Mission & Himalayas' },
    { index: 5, key: 'stages', title: '5. Dynamic Three Stages' },
    { index: 6, key: 'who_we_are', title: '6. Who We Are' },
    { index: 7, key: 'partner_with_us', title: '7. Partner With Us' },
  ];

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
    this.loadSections();
  }

  loadSections() {
    this.loading = true;
    this.apiService.getHomepageSections(true).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.sections = res.sections;
          this.sectionsMap = res.sectionsMap;
          this.selectSection(this.activeSectionKey);
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.error || 'Failed to load homepage sections', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  selectSection(key: string) {
    this.activeSectionKey = key;
    this.currentSection = this.sectionsMap[key] || null;
    this.cdr.markForCheck();
  }

  getSectionTitle(key: string): string {
    switch (key) {
      case 'hero': return 'Hero Banner Section';
      case 'sub_hero': return 'Sub-Hero Callout Section';
      case 'approach': return 'Our Approach & Process Section';
      case 'mission': return 'Foothills of the Himalayas Mission Statement';
      case 'stages': return 'Dynamic Stages (Innovate, Test, Scale)';
      case 'who_we_are': return 'Who We Are Section';
      case 'partner_with_us': return 'Partner With Us & Opportunity Cards';
      default: return key;
    }
  }

  getSectionDescription(key: string): string {
    switch (key) {
      case 'hero': return 'First visual impressions of the landing page, including primary headline, subtitle, action buttons, and background hero image.';
      case 'sub_hero': return 'Bold statement highlighting the core ethos: "Too complex to solve is where we start".';
      case 'approach': return 'Methodology description and co-design community healthcare illustration.';
      case 'mission': return 'Mission commitment to high quality rural healthcare in the Himalayas.';
      case 'stages': return 'Dynamic pathway cards displaying the three interactive solution phases.';
      case 'who_we_are': return 'Core organization identity, clinician and advocate profile description, and full-width team photography.';
      case 'partner_with_us': return 'Collaborative action cards (Fund a Solution, Build With Us, Share an Idea).';
      default: return '';
    }
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

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file || !this.currentSection) return;

    this.uploadingFile = true;
    this.apiService.uploadFile(file).subscribe({
      next: (res) => {
        this.uploadingFile = false;
        if (res.success && this.currentSection) {
          this.currentSection.image_url = res.url;
          this.showToast('Section image uploaded successfully', 'success');
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

  saveSection() {
    if (!this.currentSection) return;

    this.saving = true;
    this.apiService.updateHomepageSection(this.currentSection).subscribe({
      next: (res) => {
        this.saving = false;
        if (res.success) {
          this.showToast(`'${this.getSectionTitle(this.currentSection!.section_key)}' updated successfully!`, 'success');
          this.sectionsMap[this.currentSection!.section_key] = res.section;
          this.currentSection = res.section;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.saving = false;
        this.showToast(err.error?.error || 'Failed to update homepage section', 'error');
        this.cdr.markForCheck();
      }
    });
  }
}
