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

  fetchCurrentUser() {
    let tokenValue:UserToken = this.authenticationService.currentTokenValue
    console.log("fetchCurrentUser->user_uuid=" + tokenValue.uuid);
    if(tokenValue && tokenValue.uuid ) {
     
      let error;
      let u: User;
      
      this.http.get<User>(this.getPublicUserUrl+ "/" + tokenValue.uuid)
                  .subscribe((data: User) => {
                    console.log("data=" + data);
                    if(data != null && data.uuid != null) {
                      localStorage.setItem('currentUser', JSON.stringify(data));
                      this.currentUserSubject.next(data);
                    }
                  }, // success path
                  error => error = error // error path
                  );
    }


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
