import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { UserToken } from '../models/userToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getPublicUserUrl = 'http://127.0.0.1:9000/api/v1.0/public/user';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
      private http: HttpClient, 
      private authenticationService: AuthenticationService
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  fetchCurrentUser(user_uuid: string) {
    console.log("fetchCurrentUser->user_uuid=" + user_uuid);
    // let tokenValue:UserToken = this.authenticationService.currentTokenValue
    
    return this.http.get<User>(this.getPublicUserUrl+ "/" + user_uuid)
  }

  saveCurrentUser(user: User) {
      console.log("saveCurrentUser->user_uuid=" + user.uuid);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
  }

  saveCurrentUserByData(user_uuid:string, username:string) {
    let user: User = new User()
    user.uuid = user_uuid;
    user.username = username;
    this.saveCurrentUser(user)
  } 
  clearCurrentUser() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }
  fetchCurrentUser2(user_uuid: string) {
    console.log("fetchCurrentUser->user_uuid=" + user_uuid);
    return this.http.get<any>(this.getPublicUserUrl+ "/" + user_uuid)
        .pipe(map(user => {
            // get successful user
            console.log("user=" + user);
            if (user && user.uuid) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

}
