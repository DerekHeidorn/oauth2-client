import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './customer';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private allCustomersUrl = 'http://127.0.0.1:9001/api/v1.0/admin/user';



  constructor(
              private http: HttpClient,
              private authService: AuthService
             ) { }


  getCustomers() {
    return this.http
      .get<Customer[]>(this.allCustomersUrl, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
