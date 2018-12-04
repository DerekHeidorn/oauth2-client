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
  public pending_friend_requests: PublicUser[] = [];
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
      this.pending_friends = [];
      this.pending_friend_requests = []
      this.accepted_friends = [];
      if(responseData.data.pending_friends) {
        for(let i = 0; i < responseData.data.pending_friends.length; i++) {
          let u: PublicUser = new PublicUser()
          u.user_uuid = responseData.data.pending_friends[i].user_uuid;
          u.user_uuid_digest = responseData.data.pending_friends[i].user_uuid_digest;
          u.alias = responseData.data.pending_friends[i].alias;
          this.pending_friends.push(u);
        }
      }
      if(responseData.data.pending_friend_requests) {
        for(let i = 0; i < responseData.data.pending_friend_requests.length; i++) {
          let u: PublicUser = new PublicUser()
          u.user_uuid = responseData.data.pending_friend_requests[i].user_uuid;
          u.user_uuid_digest = responseData.data.pending_friend_requests[i].user_uuid_digest;
          u.alias = responseData.data.pending_friend_requests[i].alias;
          this.pending_friend_requests.push(u);
        }
      }
      if(responseData.data.accepted_friends) {
        for(let i = 0; i < responseData.data.accepted_friends.length; i++) {
          let u: PublicUser = new PublicUser()
          u.user_uuid = responseData.data.accepted_friends[i].user_uuid;
          u.user_uuid_digest = responseData.data.accepted_friends[i].user_uuid_digest;
          u.alias = responseData.data.accepted_friends[i].alias;
          this.accepted_friends.push(u);
        }
      }
    });
  }

  unfriend(alias: string, user_uuid: string, user_uuid_digest: string) {
    this.userService.unfriendUser(user_uuid, user_uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.toastr.success('Removed "' + alias + '" as a friend.', 'Friends');
      this.getMyFriends();
    });
  }

  denyFriendRequest(alias: string, user_uuid: string, user_uuid_digest: string) {
    this.userService.denyFriendRequest(user_uuid, user_uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.toastr.success('Removed "' + alias + '" friend request.', 'Friends');
      this.getMyFriends();
    });
  }

  acceptFriendRequest(alias: string, user_uuid: string, user_uuid_digest: string) {
    this.userService.acceptFriendRequest(user_uuid, user_uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.toastr.success('Accept "' + alias + '" as a friend.', 'Friends');
      this.getMyFriends();
    });
  }

}
