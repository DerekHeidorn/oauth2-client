import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getPublicUserUrl = 'http://127.0.0.1:9000/api/v1.0/public/user';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
      private http: HttpClient
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  saveCurrentUser(user: User) {
      console.log("saveCurrentUser->user_uuid=" + user.uuid);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
  }

  saveCurrentUserByData(user_uuid:string, username:string) {
    console.log("saveCurrentUserByData->user_uuid=" + user_uuid);
    console.log("saveCurrentUserByData->username=" + username);
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

  fetchCurrentUser(user_uuid: string) {
    return this.http.get<any>(this.getPublicUserUrl+ "/" + user_uuid);
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

}
