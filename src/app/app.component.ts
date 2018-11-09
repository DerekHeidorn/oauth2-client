import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'oauth2 project';
  constructor(public authenticationService: AuthenticationService, 
              public userService: UserService) {}
}
