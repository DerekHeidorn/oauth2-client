import { Component, OnInit } from '@angular/core';
import { PrivateUpdatePassword } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../models/response';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public username: string = null;
  public oldPassword: string = null;
  public newPassword: string = null;
  public repeatPassword: string = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getMyAccount();
  }

  getMyAccount(): void {
    this.userService.getMyAccount().subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.username = responseData['data']['username'];
    });

  }

  updatePassword() {
    let p = new PrivateUpdatePassword();
    p.old_password = this.oldPassword;
    p.new_password = this.newPassword;
    this.userService.updateMyPassword(p).subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data)
    });
  }

}
