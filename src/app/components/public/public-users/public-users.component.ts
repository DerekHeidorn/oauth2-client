import { Component, OnInit } from '@angular/core';
import { PublicUser } from '../../../models/user';
import { ApiResponse } from '../../../models/response';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-public-users',
  templateUrl: './public-users.component.html',
  styleUrls: ['./public-users.component.css']
})
export class PublicUsersComponent implements OnInit {

  public users: PublicUser[] = [];

  constructor(private toastr: ToastrService,
              private userService: UserService) { }

  ngOnInit() {
    this.getPublicUsers();

  }

  getPublicUsers() {
    this.userService.getPublicUsers()
      .subscribe((responseData: ApiResponse) => {
        console.log("data=" + responseData.data)
        this.users = []
        for(let i = 0; i < responseData.data.length; i++) {
          let u: PublicUser = new PublicUser()
          u.user_uuid = responseData.data[i].user_uuid;
          u.user_uuid_digest = responseData.data[i].user_uuid_digest;
          u.alias = responseData.data[i].alias;
          u.is_friend = responseData.data[i].is_friend;
          this.users.push(u);
        }
    });

  }

  friend(alias: string, user_uuid: string, user_uuid_digest: string) {
    this.userService.friendUser(user_uuid, user_uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.toastr.success('Users', 'Sent a friend request to "' + alias + '".');
      this.getPublicUsers();
    });
  }

}
