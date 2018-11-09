import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import * as jwt_decode from "jwt-decode";



@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  // /oauth/callback?
  //           auth_response=1
  //           &access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NDE4Nzk0NTEsImlhdCI6MTU0MTc5MzA1MSwic3ViIjoxMDAsImp0aSI6IjkzZTQyNGFkLWY2ZWEtNDllZi1hZWJiLTgzYmQ0ZGJhYTZhNSIsImF1dGgiOlsiQ1VTVF9BQ0NFU1MiLCJDVVNUX1BST0ZJTEUiXX0.Ez8LaHfYfe6I1HQRyGwtst_oyaY64IZYJrHp_8ukf9r5yeoDS0_7_dwP2M5Omb2ZWra2wQtUHqcFe50sak77oA
  //           &expires_in=864000
  //           &token_type=Bearer
  ngOnInit() {
    const auth_response: string = this.activatedRoute.snapshot.queryParamMap.get('auth_response');
    const access_token: string = this.activatedRoute.snapshot.queryParamMap.get('access_token');
    const expires_in: string = this.activatedRoute.snapshot.queryParamMap.get('expires_in');
    const token_type: string = this.activatedRoute.snapshot.queryParamMap.get('token_type');

    console.log("auth_response=" + auth_response)
    console.log("token_type=" + token_type)
    console.log("expires_in=" + expires_in)
    

    let tokenInfo = this.getDecodedAccessToken(access_token); // decode token
    let expireDate = tokenInfo.exp; // get token expiration dateTime
    console.log(tokenInfo); // show decoded token object in console
    console.log(tokenInfo.auth); 
    console.log(tokenInfo.sub); 
    console.log("expireDate=" + expireDate);

    // save the token locally
    this.authenticationService.saveToken({"user_uuid": tokenInfo.sub, 
                                          "token": access_token })

    // get the user information
    if(tokenInfo != null && tokenInfo.sub != null) {
      console.log("fetchCurrentUser=" + tokenInfo.sub);
      this.userService.fetchCurrentUser(tokenInfo.sub)
    }



    this.router.navigateByUrl("/")

    
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
