import { Component, OnInit } from '@angular/core';
import { PublicUser } from '../../../models/user';
import { AppResponse } from '../../../models/response';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

public friends: PublicUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMyFriends()
      .subscribe((responseData: AppResponse) => {
        console.log("data=" + responseData.data)
        this.friends = []
        for(let i = 0; i < responseData.data.length; i++) {
          let u: PublicUser = new PublicUser()
          u.user_uuid = responseData.data[i].user_uuid;
          u.alias = responseData.data[i].alias;
          this.friends.push(u);
        }
  });

  }

}
