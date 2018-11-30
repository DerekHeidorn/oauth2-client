import { Component, OnInit } from '@angular/core';
import { PrivateUserPreferences }  from '../../../models/user';
import { UserService }  from '../../../services/user.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  preferences: PrivateUserPreferences;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserPreferences()
  }

 
  getUserPreferences(): void {
    this.userService.getMyPreferences()
      .subscribe(responseData => this.preferences = responseData.data);
  }

}
