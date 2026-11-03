import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout-wrapper">
      <!-- Sidebar -->
      <aside class="sidebar" [class.mobile-open]="mobileSidebarOpen">
        <!-- Sidebar Brand -->
        <div class="sidebar-header">
          <div class="logo-box">
            <span class="logo-accent">P</span>
          </div>
          <div class="brand-info">
            <h2 class="brand-name">POSSIBLE</h2>
            <span class="brand-badge">ADMIN PORTAL</span>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="sidebar-nav">
          <div class="nav-section-title">MAIN</div>
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </a>

          <div class="nav-section-title">CONTENT MANAGEMENT</div>
          <a routerLink="/news" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>News & Articles</span>
          </a>

          <a routerLink="/team" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Team Members</span>
          </a>

          <a routerLink="/publications" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Publications</span>
          </a>

          <a routerLink="/solutions" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Solutions & Projects</span>
          </a>

          <div class="nav-section-title">COMMUNICATION</div>
          <a routerLink="/contacts" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact Messages</span>
            <span *ngIf="newMessagesCount > 0" class="nav-badge">{{ newMessagesCount }}</span>
          </a>

          <a routerLink="/subscribers" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>Newsletter Subscribers</span>
          </a>

          <a routerLink="/donations" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Donations</span>
          </a>

          <div class="nav-section-title">CONFIGURATION</div>
          <a routerLink="/settings" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Site Settings</span>
          </a>
        </nav>

        <!-- Sidebar Footer / Database Status -->
        <div class="sidebar-footer">
          <div class="db-pill">
            <span class="db-dot"></span>
            <div class="db-text">
              <span class="db-status">PostgreSQL Connected</span>
              <span class="db-name">db.ovurdxjnnyliefzsecem</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Layout -->
      <div class="main-content-wrap">
        <!-- Top Navigation Bar -->
        <header class="topbar">
          <div class="topbar-left">
            <button class="mobile-menu-btn" (click)="toggleMobileSidebar()">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="breadcrumbs">
              <span class="brand-crumb">Possible Health</span>
              <span class="crumb-separator">/</span>
              <span class="active-crumb">Admin Management Portal</span>
            </div>
          </div>

          <div class="topbar-right">
            <!-- View live site button -->
            <a href="https://possible-website.vercel.app" target="_blank" class="live-site-link">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>View Public Website</span>
            </a>

            <!-- User Profile & Logout -->
            <div class="user-profile-menu">
              <div class="user-avatar">
                {{ userInitials }}
              </div>
              <div class="user-info">
                <span class="user-name">{{ user?.full_name || 'System Admin' }}</span>
                <span class="user-role">{{ user?.role || 'SUPER_ADMIN' }}</span>
              </div>
              <button class="logout-btn" (click)="logout()" title="Sign out">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <!-- View Page Outlet -->
        <main class="page-container">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      min-height: 100vh;
      background: var(--bg-main);
    }

    /* Sidebar Styling */
    .sidebar {
      width: 270px;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--sidebar-border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      z-index: 50;
      transition: transform 0.3s ease;
    }

    .sidebar-header {
      padding: 1.5rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.875rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .logo-box {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--primary-pink), var(--accent-purple));
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px var(--primary-pink-glow);
    }

    .logo-accent {
      color: white;
      font-weight: 800;
      font-size: 1.25rem;
      font-family: 'Outfit', sans-serif;
    }

    .brand-name {
      color: white;
      font-size: 1.125rem;
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .brand-badge {
      font-size: 0.65rem;
      color: var(--primary-pink);
      font-weight: 700;
      letter-spacing: 0.06em;
      display: block;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1.25rem 0.875rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .nav-section-title {
      font-size: 0.6875rem;
      font-weight: 700;
      color: #475569;
      letter-spacing: 0.08em;
      padding: 0.875rem 0.75rem 0.375rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.875rem;
      color: var(--sidebar-text);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: var(--radius-md);
      transition: all 0.15s ease;
      position: relative;
    }

    .nav-item:hover {
      background: var(--sidebar-hover);
      color: #f1f5f9;
    }

    .nav-item.active {
      background: rgba(237, 46, 132, 0.15);
      color: #ffffff;
      font-weight: 600;
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      bottom: 6px;
      width: 4px;
      background: var(--primary-pink);
      border-radius: 0 4px 4px 0;
    }

    .nav-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .nav-badge {
      margin-left: auto;
      background: var(--primary-pink);
      color: white;
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
    }

    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.2);
    }

    .db-pill {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.5rem 0.75rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-md);
    }

    .db-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      flex-shrink: 0;
    }

    .db-text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .db-status {
      color: #cbd5e1;
      font-size: 0.6875rem;
      font-weight: 600;
    }

    .db-name {
      color: #64748b;
      font-size: 0.625rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    /* Main Content Layout */
    .main-content-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .topbar {
      height: 68px;
      background: white;
      border-bottom: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      position: sticky;
      top: 0;
      z-index: 40;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.25rem;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .brand-crumb {
      color: var(--text-muted);
      font-weight: 500;
    }

    .crumb-separator {
      color: #cbd5e1;
    }

    .active-crumb {
      color: var(--text-main);
      font-weight: 600;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .live-site-link {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--secondary-blue);
      background: var(--secondary-blue-light);
      padding: 0.45rem 0.875rem;
      border-radius: var(--radius-md);
      text-decoration: none;
      transition: background 0.15s;
    }

    .live-site-link:hover {
      background: #b2dfdb;
    }

    .user-profile-menu {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-left: 1rem;
      border-left: 1px solid var(--surface-border);
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-pink), #ec4899);
      color: white;
      font-weight: 700;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px var(--primary-pink-glow);
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-main);
      line-height: 1.2;
    }

    .user-role {
      font-size: 0.6875rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .logout-btn {
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 0.375rem;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      transition: all 0.15s;
      margin-left: 0.25rem;
    }

    .logout-btn:hover {
      background: var(--danger-bg);
      color: var(--danger);
    }

    .page-container {
      flex: 1;
      padding: 2rem;
      max-width: 1440px;
      width: 100%;
      margin: 0 auto;
    }

    @media (max-width: 900px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        transform: translateX(-100%);
      }

      .sidebar.mobile-open {
        transform: translateX(0);
      }

      .mobile-menu-btn {
        display: block;
      }

      .page-container {
        padding: 1.25rem;
      }
    }
  `]
})
export class LayoutComponent implements OnInit {
  mobileSidebarOpen = false;
  newMessagesCount = 0;

  get user() {
    return this.authService.currentUser();
  }

  get userInitials() {
    if (!this.user?.full_name) return 'AD';
    const parts = this.user.full_name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : this.user.full_name.substring(0, 2).toUpperCase();
  }

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.apiService.getStats().subscribe({
      next: (res) => {
        if (res.success && res.stats) {
          this.newMessagesCount = res.stats.contacts.newCount || 0;
          this.cdr.markForCheck();
        }
      },
      error: () => { }
    });
  }

  toggleMobileSidebar() {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
