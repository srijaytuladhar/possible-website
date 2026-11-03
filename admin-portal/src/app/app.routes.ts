import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { LayoutComponent } from './features/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NewsListComponent } from './features/news/news-list.component';
import { TeamListComponent } from './features/team/team-list.component';
import { PublicationsListComponent } from './features/publications/publications-list.component';
import { SolutionsListComponent } from './features/solutions/solutions-list.component';
import { ContactsListComponent } from './features/contacts/contacts-list.component';
import { SubscribersListComponent } from './features/subscribers/subscribers-list.component';
import { DonationsListComponent } from './features/donations/donations-list.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'news', component: NewsListComponent },
      { path: 'team', component: TeamListComponent },
      { path: 'publications', component: PublicationsListComponent },
      { path: 'solutions', component: SolutionsListComponent },
      { path: 'contacts', component: ContactsListComponent },
      { path: 'subscribers', component: SubscribersListComponent },
      { path: 'donations', component: DonationsListComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
