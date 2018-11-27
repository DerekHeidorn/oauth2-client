import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/common/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { ManagerDetailComponent } from './components/manager-detail/manager-detail.component';
import { AuthCallbackComponent } from './components/auth/auth-callback.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  { path: 'group/detail/:uuid', component: GroupDetailComponent, canActivate: [AuthGuard]},
  { path: 'group/:group_uuid/manager/detail/:user_uuid', component: ManagerDetailComponent, canActivate: [AuthGuard]},
  { path: 'group/:group_uuid/member/detail/:user_uuid', component: MemberDetailComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'oauth/callback', component: AuthCallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
