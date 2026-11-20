import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { superAdminGuard } from './core/guards/super-admin.guard';
import { userManagementGuard } from './core/guards/user-management.guard';
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
import { UsersListComponent } from './features/users/users-list.component';
import { CollaboratorsListComponent } from './features/collaborators/collaborators-list.component';
import { WorkWithUsListComponent } from './features/work-with-us/work-with-us-list.component';
import { HomepageContentComponent } from './features/homepage/homepage-content.component';

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
      { path: 'homepage', component: HomepageContentComponent },
      { path: 'collaborators', component: CollaboratorsListComponent },
      { path: 'work-with-us', component: WorkWithUsListComponent },
      { path: 'users', component: UsersListComponent, canActivate: [userManagementGuard] },
      { path: 'news', component: NewsListComponent },
      { path: 'team', component: TeamListComponent },
      { path: 'publications', component: PublicationsListComponent },
      { path: 'solutions', component: SolutionsListComponent },
      { path: 'contacts', component: ContactsListComponent, canActivate: [superAdminGuard] },
      { path: 'subscribers', component: SubscribersListComponent, canActivate: [superAdminGuard] },
      { path: 'donations', component: DonationsListComponent, canActivate: [superAdminGuard] },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

