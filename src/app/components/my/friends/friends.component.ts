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
    this.getMyFriends();

  }

  getMyFriends() {
    this.userService.getMyFriends()
    .subscribe((responseData: AppResponse) => {
      console.log("data=" + responseData.data)
      this.friends = []
      for(let i = 0; i < responseData.data.length; i++) {
        let u: PublicUser = new PublicUser()
        u.user_uuid = responseData.data[i].user_uuid;
        u.user_uuid_digest = responseData.data[i].user_uuid_digest;
        u.alias = responseData.data[i].alias;
        this.friends.push(u);
      }
    });
  }

  unfriend(user_uuid: string, user_uuid_digest: string) {
    this.userService.unfriendUser(user_uuid, user_uuid_digest)
    .subscribe((responseData: AppResponse) => {
      console.log("data=" + responseData.data);
      this.friends = []
      for(let i = 0; i < responseData.data.length; i++) {
        let u: PublicUser = new PublicUser()
        u.user_uuid = responseData.data[i].user_uuid;
        u.user_uuid_digest = responseData.data[i].user_uuid_digest;
        u.alias = responseData.data[i].alias;
        this.friends.push(u);
      }
    });
  }

}
