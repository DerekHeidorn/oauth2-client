import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { UserToken } from '../../../models/userToken';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthenticationService, UserToken]
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Boolean = false;
  username:String = null;

  constructor(private authenticationService: AuthenticationService,
              public userService: UserService) { }

  ngOnInit() {
    let tokenValue:UserToken = this.authenticationService.currentTokenValue
    console.log("HeaderComponent->ngOnInit->=" + tokenValue);
    if(tokenValue && tokenValue.user_uuid) {
      this.isLoggedIn = this.authenticationService.isLoggedIn()
      this.userService.fetchCurrentUser(tokenValue.user_uuid)
      .subscribe((data) => {
        this.userService.saveCurrentUserByData(tokenValue.user_uuid, data['username']);
        this.username =  data['username']
      });
    } else {
      this.userService.clearCurrentUser()
    }
  }


  logout() {
    this.userService.clearCurrentUser()
    this.authenticationService.logout()
    this.isLoggedIn = false;
    this.username = null;
  }
}
