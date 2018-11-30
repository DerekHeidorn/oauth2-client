import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/my/profile/profile.component';
import { FriendsComponent } from './components/my/friends/friends.component';
import { GroupsComponent } from './components/my/groups/groups.component';
import { PreferencesComponent } from './components/my/preferences/preferences.component';
import { PublicUsersComponent } from './components/public-users/public-users.component';
import { PublicUserDetailComponent } from './components/public-user-detail/public-user-detail.component';
import { ReportsComponent } from './components/reports/reports.component';
import { PublicGroupsComponent } from './components/public-groups/public-groups.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { ManagerDetailComponent } from './components/manager-detail/manager-detail.component';
import { AuthCallbackComponent } from './components/auth/auth-callback.component';
import { HomeComponent } from './components/home/home.component';
import { ChangePasswordComponent } from './components/my/change-password/change-password.component';
import { ChangeEmailComponent } from './components/my/change-email/change-email.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'oauth/callback', component: AuthCallbackComponent},
  { path: 'my/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'my/changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'my/changeEmail', component: ChangeEmailComponent, canActivate: [AuthGuard]},
  { path: 'my/friends', component: FriendsComponent, canActivate: [AuthGuard]},
  { path: 'my/groups', component: GroupsComponent, canActivate: [AuthGuard]},
  { path: 'my/preferences', component: PreferencesComponent, canActivate: [AuthGuard]},
  { path: 'users', component: PublicUsersComponent, canActivate: [AuthGuard]},
  { path: 'user/detail/:user_uuid', component: PublicUserDetailComponent, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: PublicGroupsComponent, canActivate: [AuthGuard]},
  { path: 'group/detail/:uuid', component: GroupDetailComponent, canActivate: [AuthGuard]},
  { path: 'group/:group_uuid/manager/detail/:user_uuid', component: ManagerDetailComponent, canActivate: [AuthGuard]},
  { path: 'group/:group_uuid/member/detail/:user_uuid', component: MemberDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
