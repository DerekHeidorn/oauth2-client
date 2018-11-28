import { Component, OnInit } from '@angular/core';
import { PrivateUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user:PrivateUser = null;

  constructor(public userService: UserService) { 
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

}
