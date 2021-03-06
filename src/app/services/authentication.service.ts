import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserToken } from '../models/userToken';
import * as jwt_decode from "jwt-decode";

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

    public getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

    public getCurrentTokenAuthorities(): Array<string> {
        // console.log("getCurrentTokenAuthorities->this.currentTokenSubject=" + this.currentTokenSubject)
        // console.log("getCurrentTokenAuthorities->this.currentTokenSubject.value=" + this.currentTokenSubject.value)
        if(this.currentTokenSubject && this.currentTokenSubject.value) {
            let authorities: Array<string> = []

            let tokenInfo = this.getDecodedAccessToken(this.currentTokenSubject.value.token); // decode token
            let expireDate = tokenInfo.exp; // get token expiration dateTime
            // console.log("getCurrentTokenAuthorities->tokenInfo=" + tokenInfo); // show decoded token object in console
            // console.log("getCurrentTokenAuthorities->tokenInfo.authorities=" + tokenInfo.authorities); 

            if(tokenInfo && tokenInfo.authorities) {
                for(let i = 0; i < tokenInfo.authorities.length; i++) {
                    // console.log("getCurrentTokenAuthorities->tokenInfo.authorities[" + i + "]=" + tokenInfo.authorities[i]);
                    authorities.push(tokenInfo.authorities[i])
                }
                return authorities;
            }
        }

        return null;
    }


    saveToken(token: UserToken) {
        // console.log("currentTokenSubject.next().token=" + token)
        // if(token.user_uuid) {
        //     console.log("currentTokenSubject.next().token.user_uuid=" + token.user_uuid)
        //     console.log("currentTokenSubject.next().token.token=" + token.token)
        // }
        this.currentTokenSubject.next(token);
        localStorage.setItem('currentToken', JSON.stringify(token));

        this.userService.getMyAccount()
            .subscribe((response_data) => {
                // console.log("saveToken.next()..subscribe::token.user_uuid=" + token.user_uuid)
                // console.log("saveToken.next()..subscribe::data['username']=" + response_data['data']['username'])
                this.userService.saveCurrentUserByData(token.user_uuid, 
                                                        response_data['data']['username'],
                                                        response_data['data']['alias']);
            });
        
    }

    logout() {
        // remove user from local storage to log user out
        this.currentTokenSubject.next(null);
        localStorage.removeItem('currentToken');
    }
}
