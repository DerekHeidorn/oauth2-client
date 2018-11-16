import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserToken } from '../models/userToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private currentTokenSubject: BehaviorSubject<UserToken>;
    public currentToken: Observable<UserToken>;


    constructor(private http: HttpClient, private userService: UserService) {
        this.currentTokenSubject = new BehaviorSubject<UserToken>(
            JSON.parse(localStorage.getItem('currentToken'))
            );
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentTokenValue(): UserToken {
        return this.currentTokenSubject.value;
    }



    saveToken(token: UserToken) {
        console.log("currentTokenSubject.next().token=" + token)
        if(token.user_uuid) {
            console.log("currentTokenSubject.next().token.user_uuid=" + token.user_uuid)
            console.log("currentTokenSubject.next().token.token=" + token.token)
        }
        this.currentTokenSubject.next(token);
        localStorage.setItem('currentToken', JSON.stringify(token));

        this.userService.fetchCurrentUser()
            .subscribe((data) => {
                console.log("saveToken.next()..subscribe::token.user_uuid=" + token.user_uuid)
                console.log("saveToken.next()..subscribe::data['username']=" + data['username'])
                this.userService.saveCurrentUserByData(token.user_uuid, data['username']);
            });
        
    }

    logout() {
        // remove user from local storage to log user out
        this.currentTokenSubject.next(null);
        localStorage.removeItem('currentToken');
    }
}
