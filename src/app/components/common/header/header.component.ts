import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { UserToken } from '../../../models/userToken';
import { PrivateUser } from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthenticationService, UserToken]
})
export class HeaderComponent implements OnInit {

  userToken:UserToken = null;
  user:PrivateUser = null;

  constructor(private authenticationService: AuthenticationService,
              public userService: UserService) { 

                authenticationService.currentToken.subscribe((userToken:UserToken) => {
                  this.userToken = userToken
                });

                userService.currentUser.subscribe((user:PrivateUser) => {
                  console.log("HeaderComponent->constructor:user" + user)
                  this.user = user
                });
              }

  ngOnInit() {

  }
  isLoggedIn() {
    if(this.user && this.user.uuid) {
      return true;
    }
    return false;
  }

  logout() {
    this.userService.clearCurrentUser()
    this.authenticationService.logout()
  }
}
