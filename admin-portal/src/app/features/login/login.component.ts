import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-container">
        <!-- Brand Header -->
        <div class="brand-header">
          <div class="brand-badge">
            <span class="pulse-dot"></span>
            <span>SECURE ADMIN PORTAL</span>
          </div>
          <h1 class="portal-title">
            Possible <span class="highlight-pink">Health</span>
          </h1>
          <p class="portal-subtitle">
            Dynamic Content Management & Database Operations
          </p>
        </div>

        <!-- Login Card -->
        <div class="card login-card">
          <div class="card-header">
            <h2>Sign In</h2>
            <p>Enter your administrative credentials to continue</p>
          </div>

          <!-- Error Alert -->
          <div *ngIf="errorMessage" class="alert-error">
            <svg class="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Form -->
          <form (ngSubmit)="onLogin()" #loginForm="ngForm">
            <div class="form-group">
              <label class="form-label" for="username">Username</label>
              <div class="input-icon-wrap">
                <svg class="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="form-input with-icon"
                  [(ngModel)]="username"
                  required
                  placeholder="admin"
                  autocomplete="username"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label class="form-label" for="password">Password</label>
              </div>
              <div class="input-icon-wrap">
                <svg class="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="password"
                  name="password"
                  [type]="showPassword ? 'text' : 'password'"
                  class="form-input with-icon pr-10"
                  [(ngModel)]="password"
                  required
                  placeholder="••••••••••••"
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="password-toggle"
                  (click)="showPassword = !showPassword"
                  tabindex="-1"
                >
                  <svg *ngIf="!showPassword" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg *ngIf="showPassword" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Pre-fill hint / quick credentials helper -->
            <div class="credentials-hint">
              <span class="hint-title">Initial Credentials:</span>
              <button type="button" class="hint-btn" (click)="fillCredentials()">
                Click to Auto-fill: <strong>admin</strong> / <strong>Nepal&#64;123#</strong>
              </button>
            </div>

            <button
              type="submit"
              class="btn btn-primary submit-btn"
              [disabled]="loading"
            >
              <span *ngIf="loading" class="spinner"></span>
              <span *ngIf="!loading">Sign In to Dashboard</span>
              <svg *ngIf="!loading" class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        <!-- Footer -->
        <div class="login-footer">
          <p>Connected to PostgreSQL on Supabase (Port 5432)</p>
          <p>&copy; 2026 Possible Health. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      background: linear-gradient(135deg, #0b1325 0%, #172554 50%, #0f172a 100%);
      position: relative;
      overflow: hidden;
    }

    .login-wrapper::before {
      content: '';
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(237, 46, 132, 0.15) 0%, rgba(237, 46, 132, 0) 70%);
      top: -150px;
      left: -150px;
      pointer-events: none;
    }

    .login-wrapper::after {
      content: '';
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(28, 143, 160, 0.15) 0%, rgba(28, 143, 160, 0) 70%);
      bottom: -150px;
      right: -150px;
      pointer-events: none;
    }

    .login-container {
      width: 100%;
      max-width: 440px;
      position: relative;
      z-index: 10;
    }

    .brand-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      color: #cbd5e1;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 1rem;
      backdrop-filter: blur(8px);
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: var(--primary-pink);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--primary-pink);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }

    .portal-title {
      color: white;
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 0.5rem;
    }

    .highlight-pink {
      color: var(--primary-pink);
    }

    .portal-subtitle {
      color: #94a3b8;
      font-size: 0.9375rem;
    }

    .login-card {
      background: white;
      padding: 2.25rem;
      border-radius: var(--radius-xl);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .card-header {
      margin-bottom: 1.5rem;
    }

    .card-header h2 {
      font-size: 1.5rem;
      color: var(--text-main);
      font-weight: 700;
    }

    .card-header p {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }

    .alert-error {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      margin-bottom: 1.25rem;
    }

    .alert-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .input-icon-wrap {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 0.875rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.125rem;
      height: 1.125rem;
      color: #94a3b8;
      pointer-events: none;
    }

    .form-input.with-icon {
      padding-left: 2.625rem;
    }

    .password-toggle {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      display: flex;
      padding: 0.25rem;
    }

    .password-toggle:hover {
      color: var(--text-main);
    }

    .credentials-hint {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      padding: 0.625rem 0.875rem;
      border-radius: var(--radius-md);
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .hint-title {
      font-weight: 600;
      color: #475569;
    }

    .hint-btn {
      background: none;
      border: none;
      text-align: left;
      font-size: 0.75rem;
      color: var(--primary-pink);
      cursor: pointer;
      padding: 0;
      font-family: inherit;
    }

    .hint-btn:hover {
      text-decoration: underline;
    }

    .submit-btn {
      width: 100%;
      padding: 0.875rem;
      font-size: 0.9375rem;
    }

    .spinner {
      width: 1.125rem;
      height: 1.125rem;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .login-footer {
      text-align: center;
      margin-top: 1.75rem;
      color: #94a3b8;
      font-size: 0.75rem;
      line-height: 1.6;
    }
  `]
})
export class LoginComponent {
  username = 'admin';
  password = 'Nepal@123#';
  showPassword = false;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  fillCredentials() {
    this.username = 'admin';
    this.password = 'Nepal@123#';
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please provide both username and password';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = res.error || 'Authentication failed';
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Invalid credentials or server connection error';
        this.cdr.markForCheck();
      }
    });
  }
}
