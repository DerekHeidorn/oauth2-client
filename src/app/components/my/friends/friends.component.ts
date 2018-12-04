import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicUser } from '../../../models/user';
import { ApiResponse } from '../../../models/response';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public pending_friends: PublicUser[] = [];
  public accepted_friends: PublicUser[] = [];

  constructor(private toastr: ToastrService,
              private userService: UserService) { }

  ngOnInit() {
    this.getMyFriends();

  }

  getMyFriends() {
    this.userService.getMyFriends()
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data)
      this.pending_friends = []
      this.accepted_friends = []
      for(let i = 0; i < responseData.data.pending_friends.length; i++) {
        let u: PublicUser = new PublicUser()
        u.user_uuid = responseData.data.pending_friends[i].user_uuid;
        u.user_uuid_digest = responseData.data.pending_friends[i].user_uuid_digest;
        u.alias = responseData.data.pending_friends[i].alias;
        this.pending_friends.push(u);
      }
      for(let i = 0; i < responseData.data.accepted_friends.length; i++) {
        let u: PublicUser = new PublicUser()
        u.user_uuid = responseData.data.accepted_friends[i].user_uuid;
        u.user_uuid_digest = responseData.data.accepted_friends[i].user_uuid_digest;
        u.alias = responseData.data.accepted_friends[i].alias;
        this.accepted_friends.push(u);
      }
    });
  }

  unfriend(alias: string, user_uuid: string, user_uuid_digest: string) {
    this.userService.unfriendUser(user_uuid, user_uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.toastr.success('Removed "' + alias + '" friend.', 'Friends');
      this.getMyFriends();
    });
  }

}
