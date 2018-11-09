import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserToken } from '../models/userToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentTokenSubject: BehaviorSubject<UserToken>;


  constructor(private http: HttpClient) {
      this.currentTokenSubject = new BehaviorSubject<UserToken>(
            JSON.parse(localStorage.getItem('currentToken'))
          );
  }

  public get currentTokenValue(): UserToken {
      return this.currentTokenSubject.value;
  }

    isLoggedIn() {
        return (localStorage.getItem('currentToken') != null)
    }

    saveToken(token) {

        localStorage.setItem('currentToken', JSON.stringify(token));
        this.currentTokenSubject.next(token);
    }

  // login(username: string, password: string) {
  //     return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
  //         .pipe(map(user => {
  //             // login successful if there's a jwt token in the response
  //             if (user && user.token) {
  //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
  //                 localStorage.setItem('currentUser', JSON.stringify(user));
  //                 this.currentUserSubject.next(user);
  //             }

  //             return user;
  //         }));
  // }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentToken');
      this.currentTokenSubject.next(null);
  }
}
