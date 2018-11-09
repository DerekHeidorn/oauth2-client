import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    // Add this to guard this route
    canActivate: [
      AuthGuard
    ]
  }
  , { path: 'oauth/callback', component: CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
