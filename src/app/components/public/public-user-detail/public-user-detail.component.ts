import { Component, OnInit } from '@angular/core';
import { PublicUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../models/response';

@Component({
  selector: 'app-public-user-detail',
  templateUrl: './public-user-detail.component.html',
  styleUrls: ['./public-user-detail.component.css']
})
export class PublicUserDetailComponent implements OnInit {

  public user: PublicUser = new PublicUser();

  public apiResponse: ApiResponse = new ApiResponse();

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPublicUser()
  }

  getPublicUser(): void {
    
    const user_uuid: string = this.route.snapshot.paramMap.get('user_uuid');
    this.userService.getPublicUserDetail(user_uuid)
        .subscribe((responseData) => {
          console.log("data=" + responseData.data)
          this.user = new PublicUser();
          
          this.user.user_uuid = responseData.data.user_uuid;
          this.user.user_uuid_digest = responseData.data.user_uuid_digest;
          this.user.alias = responseData.data.alias;
          this.user.is_friend = responseData.data.is_friend;

        });    
  }

  friend(alias: string, user_uuid: string, user_uuid_digest: string) {
    this.userService.friendUser(user_uuid, user_uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.apiResponse = responseData;
      this.getPublicUser();
    });
  }

}
