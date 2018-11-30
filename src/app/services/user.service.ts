import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { PrivateUser, PrivateUpdatePassword, PrivateUpdateUsername, PrivateUpdatePrivateFlag, PrivateUpdateNames } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<PrivateUser>;
  public currentUser: Observable<PrivateUser>;

  constructor(
      private http: HttpClient
    ) {
    this.currentUserSubject = new BehaviorSubject<PrivateUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): PrivateUser {
    return this.currentUserSubject.value;
  }

  saveCurrentUser(user: PrivateUser) {
      // console.log("saveCurrentUser->user_uuid=" + user.uuid);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
  }

  saveCurrentUserByData(user_uuid:string, username:string, alias:string) {
    // console.log("saveCurrentUserByData->user_uuid=" + user_uuid);
    // console.log("saveCurrentUserByData->username=" + username);
    // console.log("saveCurrentUserByData->alias=" + alias);
    let user: PrivateUser = new PrivateUser()
    user.uuid = user_uuid;
    user.username = username;
    user.alias = alias;
    this.saveCurrentUser(user)
  } 
  clearCurrentUser() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getMyAccount() {
    return this.http.get<any>('http://127.0.0.1:9000/api/v1.0/my/account');
  }

  getMyProfile() {
    return this.http.get<any>('http://127.0.0.1:9000/api/v1.0/my/profile');
  }

  getMyPreferences() {
    return this.http.get<any>('http://127.0.0.1:9000/api/v1.0/my/preferences');
  }

  getMyFriends() {
    return this.http.get<any>('http://127.0.0.1:9000/api/v1.0/my/friends');
  }

  updateMyNames(toUpdate: PrivateUpdateNames) {
    return this.http.put<any>('http://127.0.0.1:9000/api/v1.0/my/preferences/names', toUpdate);
  }

  updateMyPrivateFlag(toUpdate: PrivateUpdatePrivateFlag) {
    return this.http.put<any>('http://127.0.0.1:9000/api/v1.0/my/preferences/private', toUpdate);
  }

  updateMyPassword(updatePassword: PrivateUpdatePassword) {
    return this.http.put<any>('http://127.0.0.1:9000/api/v1.0/my/account/password', updatePassword);
  }

  updateMyEmail(updateUsername: PrivateUpdateUsername) {
    return this.http.put<any>('http://127.0.0.1:9000/api/v1.0/my/account/username', updateUsername);
  }

  getPublicUsers() {
    return this.http.get<any>('http://127.0.0.1:9000/api/v1.0/public/user/list');
  }

  getPublicUserDetail(user_uuid: string) {
    return this.http.get<any>('http://127.0.0.1:9000/api/v1.0/public/user/profile/' + user_uuid);
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

}
