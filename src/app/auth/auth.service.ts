import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router: Router, private _http: HttpClient){}
  
  getTokenHttpOptions() {
    let token:string = this.getToken();
    // var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    // var options = new RequestOptions({ headers: headers });
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic '+ token
      })
    };
    return httpOptions;
  }

  obtainAccessToken(username: string, password: string){
    let params = new URLSearchParams();
    params.append('username',username);
    params.append('password',password);    
    params.append('grant_type','password');
    params.append('client_id', environment.auth.clientID);
    //let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("fooClientIdPassword:secret")});
    //let options = new RequestOptions({ headers: headers });
    let httpOptions = this.getTokenHttpOptions()

    let url = 'http://localhost:9000/auth/login';
    this._http.post(url, params.toString(), httpOptions)
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    );
  }
 
  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    // this.accessToken = token.access_token;
    // this.expiresAt = expireDate;
    //Cookie.set("access_token", token.access_token, expireDate);
    localStorage.setItem('currentToken', JSON.stringify(token));
    this._router.navigate(['/']);
  }
 
  // getResource(resourceUrl) : Observable<Foo>{
  //   let httpOptions = this.getTokenHttpOptions();
  //   return this._http.get(resourceUrl, httpOptions)
  //                  .map((res:Response) => res.json())
  //                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  // }
 
  getToken() {
    let token = localStorage.getItem('currentToken')
    if (token == null){
        this._router.navigate(['/login']);
    } else {
      return token;
    }
  }
  
  isLoggedIn() {
    return ( localStorage.getItem('currentToken') != null)
  }

  checkCredentials(){
    let token = localStorage.getItem('currentToken')
    if (token == null){
        this._router.navigate(['/login']);
    }
  } 
 
  logout() {
    localStorage.removeItem('currentToken');
    this._router.navigate(['/login']);
  }



  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
