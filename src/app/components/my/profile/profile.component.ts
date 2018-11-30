import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PublicUserProfile }  from '../../../models/user';
import { UserService }  from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: PublicUserProfile;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUserProfile()
  }

 
  getUserProfile(): void {
    this.userService.getMyProfile()
      .subscribe(responseData => this.profile = responseData.data);
  }

  goBack(): void {
    this.location.back();
  }


}
