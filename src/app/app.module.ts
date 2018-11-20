import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthCallbackComponent } from './components/auth/auth-callback.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MenuComponent } from './components/common/menu/menu.component';
import { ProfileComponent } from './components/common/profile/profile.component';
import { GroupsComponent } from './components/groups/groups.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { ManagerDetailComponent } from './components/manager-detail/manager-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    AuthCallbackComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ProfileComponent,
    GroupsComponent,
    MemberDetailComponent,
    GroupDetailComponent,
    ManagerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
