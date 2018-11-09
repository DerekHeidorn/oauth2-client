import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CustomersComponent } from './components/customers/customers.component';
import { AuthCallbackComponent } from './components/auth/auth-callback.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  { path: 'oauth/callback', component: AuthCallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
