import { Component, OnInit } from '@angular/core';
import { PrivateUserPreferences, PrivateUpdatePrivateFlag, PrivateUpdateNames }  from '../../../models/user';
import { UserService }  from '../../../services/user.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  preferences: PrivateUserPreferences;

  isEditName: boolean = false;
  editableFirstName: string = null;
  editableLastName: string = null;

  isEditPrivate: boolean = false;
  editablePrivate: boolean = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserPreferences()
  }

 
  getUserPreferences(): void {
    this.userService.getMyPreferences()
      .subscribe(responseData => this.preferences = responseData.data);
  }

  makeNameEditable(): void {
    if(this.preferences) {
      this.editableFirstName = this.preferences.first_name;
      this.editableLastName = this.preferences.last_name;
      this.isEditName = true;
    }
  }

  saveNames(): void {
    if(this.editableFirstName != null && this.editableLastName != null) {
      let u = new PrivateUpdateNames();
      u.first_name = this.editableFirstName;
      u.last_name = this.editableLastName;
      this.userService.updateMyNames(u)
          .subscribe(responseData => 
              this.setPreferences (responseData.data)
            );
    }
  }

  setPreferences(data) {
    this.preferences = data;
    this.isEditName = false;
    this.isEditPrivate = false;
  }

  makeNameUneditable(): void {
    this.editableFirstName = null;
    this.editableLastName = null;
    this.isEditName = false;
  }

  makePrivateEditable(): void {
    if(this.preferences) {
      this.editablePrivate = this.preferences.is_private
      this.isEditPrivate = true;
    }
  }

  savePrivate(): void {
    if(this.editablePrivate != null) {
      let u = new PrivateUpdatePrivateFlag();
      u.is_private = this.editablePrivate;
      this.userService.updateMyPrivateFlag(u)
          .subscribe(responseData => this.setPreferences (responseData.data));
    }
  }

  makePrivateUneditable(): void {
    this.editablePrivate = null;
    this.isEditPrivate = false;
  }

}
