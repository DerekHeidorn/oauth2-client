import { Component, OnInit } from '@angular/core';
import { PublicUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-user-detail',
  templateUrl: './public-user-detail.component.html',
  styleUrls: ['./public-user-detail.component.css']
})
export class PublicUserDetailComponent implements OnInit {

  public user: PublicUser = new PublicUser();

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
          this.user.alias = responseData.data.alias;

        });    
  }

}
