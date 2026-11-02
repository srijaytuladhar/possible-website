import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Article } from '../../core/models';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="news-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">News & Field Updates</h1>
          <p class="page-subtitle">Publish and manage press releases, research announcements, and field dispatches</p>
        </div>
        <button class="btn btn-primary" (click)="openCreateModal()">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Write Article</span>
        </button>
      </div>

      <!-- Toast Notification -->
      <div *ngIf="toastMessage" class="toast-banner" [ngClass]="toastType">
        <span>{{ toastMessage }}</span>
        <button class="toast-close" (click)="toastMessage = ''">&times;</button>
      </div>

      <!-- Filters & Controls Bar -->
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
            placeholder="Search articles by title or keyword..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
          />
        </div>
      </div>

      <!-- Articles Data Table -->
      <div class="card table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 80px;">Thumbnail</th>
                <th>Title & Excerpt</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th style="width: 120px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let article of articles">
                <td>
                  <div class="thumb-wrap">
                    <img [src]="article.image_url" [alt]="article.title" class="table-thumb" (error)="onThumbError($event)" />
                  </div>
                </td>
                <td>
                  <div class="article-info">
                    <strong class="article-title">{{ article.title }}</strong>
                    <span class="article-excerpt">{{ article.desc_text }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge" [ngClass]="{
                    'badge-pink': article.category === 'Field Updates',
                    'badge-blue': article.category === 'Announcements',
                    'badge-purple': article.category === 'Research'
                  }">
                    {{ article.category }}
                  </span>
                </td>
                <td>
                  <span class="author-tag">{{ article.author || 'Possible Health' }}</span>
                </td>
                <td>
                  <span class="text-xs text-muted">{{ article.published_date | date:'mediumDate' }}</span>
                </td>
                <td>
                  <button
                    type="button"
                    class="status-toggle-btn"
                    [class.live]="article.is_published"
                    (click)="togglePublish(article)"
                    title="Click to toggle publish status"
                  >
                    <span class="toggle-dot"></span>
                    <span>{{ article.is_published ? 'Published' : 'Draft' }}</span>
                  </button>
                </td>
                <td style="text-align: right;">
                  <div class="action-buttons">
                    <button class="icon-btn edit" (click)="openEditModal(article)" title="Edit article">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button class="icon-btn delete" (click)="confirmDelete(article)" title="Delete article">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr *ngIf="!loading && !articles.length">
                <td colspan="7" class="empty-state">
                  <div class="empty-wrap">
                    <svg class="w-12 h-12 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <p>No articles found matching criteria</p>
                    <button class="btn btn-sm btn-secondary mt-2" (click)="resetFilters()">Clear Filters</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Create / Edit Modal -->
      <div *ngIf="isModalOpen" class="modal-backdrop" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ editingArticleId ? 'Edit Article' : 'Write New Article' }}</h3>
            <button class="close-btn" (click)="closeModal()">&times;</button>
          </div>

          <form (ngSubmit)="saveArticle()">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Article Title *</label>
                <input
                  type="text"
                  class="form-input"
                  name="title"
                  [(ngModel)]="formData.title"
                  required
                  placeholder="e.g. Co-Designing Digital Health Systems with Municipal Leaders in Achham"
                />
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Category *</label>
                  <select class="form-select" name="category" [(ngModel)]="formData.category" required>
                    <option value="Field Updates">Field Updates</option>
                    <option value="Announcements">Announcements</option>
                    <option value="Research">Research</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Author Name</label>
                  <input
                    type="text"
                    class="form-input"
                    name="author"
                    [(ngModel)]="formData.author"
                    placeholder="e.g. Prakash Pant, Data Systems"
                  />
                </div>
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Estimated Read Time</label>
                  <input
                    type="text"
                    class="form-input"
                    name="read_time"
                    [(ngModel)]="formData.read_time"
                    placeholder="e.g. 4 min read"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Featured Image URL</label>
                  <input
                    type="text"
                    class="form-input"
                    name="image_url"
                    [(ngModel)]="formData.image_url"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Short Summary (Excerpt)</label>
                <textarea
                  class="form-textarea"
                  rows="2"
                  name="desc_text"
                  [(ngModel)]="formData.desc_text"
                  placeholder="Brief synopsis displayed on the news card..."
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Full Article Content *</label>
                <textarea
                  class="form-textarea"
                  rows="6"
                  name="content"
                  [(ngModel)]="formData.content"
                  required
                  placeholder="Write the full story, markdown, or text paragraphs here..."
                ></textarea>
              </div>

              <div class="form-checkbox-row">
                <label class="checkbox-label">
                  <input type="checkbox" name="is_published" [(ngModel)]="formData.is_published" />
                  <span>Publish this article immediately (visible on public website)</span>
                </label>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="saving">
                <span *ngIf="saving" class="spinner"></span>
                <span *ngIf="!saving">{{ editingArticleId ? 'Save Changes' : 'Create Article' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div *ngIf="articleToDelete" class="modal-backdrop" (click)="articleToDelete = null">
        <div class="modal-content sm-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Confirm Delete Article</h3>
            <button class="close-btn" (click)="articleToDelete = null">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the article <strong>"{{ articleToDelete.title }}"</strong>?</p>
            <p class="text-muted text-xs mt-2">This will remove it from the PostgreSQL database and public website.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="articleToDelete = null">Cancel</button>
            <button type="button" class="btn btn-danger" (click)="deleteConfirmed()">Delete Article</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .news-page {
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

    .toast-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: inherit;
      line-height: 1;
    }

    .filter-bar {
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .category-pills {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

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

    .cat-pill.active {
      background: var(--primary-pink);
      border-color: var(--primary-pink);
      color: white;
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
      padding-left: 2.25rem;
      font-size: 0.8125rem;
    }

    .table-card {
      overflow: hidden;
    }

    .table-responsive {
      overflow-x: auto;
    }

    .thumb-wrap {
      width: 56px;
      height: 40px;
      border-radius: var(--radius-sm);
      overflow: hidden;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .table-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .article-info {
      display: flex;
      flex-direction: column;
      max-width: 380px;
    }

    .article-title {
      font-size: 0.875rem;
      color: var(--text-main);
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .article-excerpt {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .author-tag {
      font-size: 0.8125rem;
      color: #475569;
    }

    .status-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      color: #64748b;
      cursor: pointer;
      transition: all 0.15s;
    }

    .status-toggle-btn.live {
      background: #ecfdf5;
      border-color: #a7f3d0;
      color: #065f46;
    }

    .toggle-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #94a3b8;
    }

    .status-toggle-btn.live .toggle-dot {
      background: #10b981;
    }

    .action-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.375rem;
    }

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

    .empty-state {
      text-align: center;
      padding: 3rem 1rem !important;
    }

    .empty-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    /* Modal Form */
    .modal-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h3 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--text-muted);
      cursor: pointer;
      line-height: 1;
    }

    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      max-height: calc(85vh - 130px);
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.75rem;
      background: #f8fafc;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-checkbox-row {
      margin-top: 0.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #334155;
      cursor: pointer;
    }

    .sm-modal {
      max-width: 440px;
    }

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
export class NewsListComponent implements OnInit {
  articles: Article[] = [];
  categories = ['All', 'Field Updates', 'Announcements', 'Research'];
  selectedCategory = 'All';
  searchQuery = '';
  loading = false;
  saving = false;

  // Toast
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  // Modal State
  isModalOpen = false;
  editingArticleId: number | null = null;
  formData: Partial<Article> = {
    title: '',
    category: 'Field Updates',
    desc_text: '',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=500&q=80',
    author: 'Possible Health',
    read_time: '4 min read',
    is_published: true
  };

  // Delete State
  articleToDelete: Article | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.getArticles(this.selectedCategory, this.searchQuery).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.articles = res.articles || [];
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load articles from database', 'error');
        this.cdr.markForCheck();
      }
    });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.loadArticles();
  }

  onSearch() {
    this.loadArticles();
  }

  resetFilters() {
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.loadArticles();
  }

  openCreateModal() {
    this.editingArticleId = null;
    this.formData = {
      title: '',
      category: 'Field Updates',
      desc_text: '',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=500&q=80',
      author: 'Possible Health',
      read_time: '4 min read',
      is_published: true
    };
    this.isModalOpen = true;
  }

  openEditModal(article: Article) {
    this.editingArticleId = article.id;
    this.formData = {
      title: article.title,
      category: article.category,
      desc_text: article.desc_text,
      content: article.content,
      image_url: article.image_url,
      author: article.author,
      read_time: article.read_time,
      is_published: article.is_published
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingArticleId = null;
  }

  saveArticle() {
    if (!this.formData.title || !this.formData.content) {
      this.showToast('Title and content are required', 'error');
      return;
    }

    this.saving = true;

    if (this.editingArticleId) {
      this.apiService.updateArticle(this.editingArticleId, this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('Article updated successfully!', 'success');
            this.closeModal();
            this.loadArticles();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to update article', 'error');
        }
      });
    } else {
      this.apiService.createArticle(this.formData).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.showToast('New article published successfully!', 'success');
            this.closeModal();
            this.loadArticles();
          }
        },
        error: (err) => {
          this.saving = false;
          this.showToast(err.error?.error || 'Failed to create article', 'error');
        }
      });
    }
  }

  togglePublish(article: Article) {
    const updatedStatus = !article.is_published;
    this.apiService.updateArticle(article.id, { is_published: updatedStatus }).subscribe({
      next: (res) => {
        if (res.success) {
          article.is_published = updatedStatus;
          this.showToast(`Article is now ${updatedStatus ? 'Published' : 'Draft'}`, 'success');
        }
      },
      error: () => {
        this.showToast('Failed to toggle status', 'error');
      }
    });
  }

  confirmDelete(article: Article) {
    this.articleToDelete = article;
  }

  deleteConfirmed() {
    if (!this.articleToDelete) return;
    const id = this.articleToDelete.id;
    this.apiService.deleteArticle(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.articleToDelete = null;
          this.showToast('Article deleted successfully', 'success');
          this.loadArticles();
        }
      },
      error: () => {
        this.showToast('Failed to delete article', 'error');
      }
    });
  }

  onThumbError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&h=300&q=80';
  }

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }
}
