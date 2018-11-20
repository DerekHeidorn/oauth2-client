import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserProfile }  from '../../../models/user';
import { UserService }  from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() userProfile: UserProfile;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUserProfile()
  }

  // fetchCurrentUserProfile
  getUserProfile(): void {
    this.userService.fetchCurrentUserProfile()
      .subscribe(responseData => this.userProfile = responseData.data);
  }

  goBack(): void {
    this.location.back();
  }

//  save(): void {
//     this.heroService.updateHero(this.hero)
//       .subscribe(() => this.goBack());
//   }

}
