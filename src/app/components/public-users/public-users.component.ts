import { Component, OnInit } from '@angular/core';
import { PublicUser } from '../../models/user';
import { AppResponse } from '../../models/response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-public-users',
  templateUrl: './public-users.component.html',
  styleUrls: ['./public-users.component.css']
})
export class PublicUsersComponent implements OnInit {

  public users: PublicUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPublicUsers()
      .subscribe((responseData: AppResponse) => {
        console.log("data=" + responseData.data)
        this.users = []
        for(let i = 0; i < responseData.data.length; i++) {
          let u: PublicUser = new PublicUser()
          u.user_uuid = responseData.data[i].user_uuid;
          u.user_uuid_digest = responseData.data[i].user_uuid_digest;
          u.alias = responseData.data[i].alias;
          this.users.push(u);
        }
  });

  }

}
