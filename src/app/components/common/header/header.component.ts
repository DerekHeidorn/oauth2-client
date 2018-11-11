import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { UserToken } from '../../../models/userToken';
import { User } from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthenticationService, UserToken]
})
export class HeaderComponent implements OnInit {

  userToken:UserToken = null;
  user:User = null;

  constructor(private authenticationService: AuthenticationService,
              public userService: UserService) { 

                authenticationService.currentToken.subscribe((userToken:UserToken) => {
                  this.userToken = userToken
                });

                userService.currentUser.subscribe((user:User) => {
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
    // this.isLoggedIn = false;
    // this.username = null;
  }
}
