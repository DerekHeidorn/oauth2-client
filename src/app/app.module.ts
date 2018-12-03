import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthCallbackComponent } from './components/auth/auth-callback.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MenuComponent } from './components/common/menu/menu.component';
import { ProfileComponent } from './components/my/profile/profile.component';
import { GroupsComponent } from './components/my/groups/groups.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { ManagerDetailComponent } from './components/manager-detail/manager-detail.component';
import { ReportsComponent } from './components/reports/reports.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { ReportsService } from './services/reports.service';
import { PublicUsersComponent } from './components/public-users/public-users.component';
import { PublicUserDetailComponent } from './components/public-user-detail/public-user-detail.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { PreferencesComponent } from './components/my/preferences/preferences.component';
import { FriendsComponent } from './components/my/friends/friends.component';
import { PublicGroupsComponent } from './components/public-groups/public-groups.component';
import { ChangePasswordComponent } from './components/my/change-password/change-password.component';
import { ChangeEmailComponent } from './components/my/change-email/change-email.component';
import { GlobalMessagesComponent } from './components/common/global-messages/global-messages.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthCallbackComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ProfileComponent,
    GroupsComponent,
    MemberDetailComponent,
    GroupDetailComponent,
    ManagerDetailComponent,
    ReportsComponent,
    PublicUsersComponent,
    PublicUserDetailComponent,
    SidebarComponent,
    PreferencesComponent,
    FriendsComponent,
    PublicGroupsComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    GlobalMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [AuthenticationService, UserService, ReportsService, GroupService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
