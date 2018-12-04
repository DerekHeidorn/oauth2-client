import { Component, OnInit } from '@angular/core';
import { PrivateUpdateUsername } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../models/response';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  public oldEmail: string = null;
  public newEmail: string = null;
  public password: string = null;
  public is_saved: boolean = false;

  public apiResponse: ApiResponse = new ApiResponse();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getMyAccount();
  }

  getMyAccount(): void {
    this.userService.getMyAccount().subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.oldEmail = responseData['data']['username'];
    });

  }

  updateEmail() {
    let p = new PrivateUpdateUsername();
    p.old_username = this.oldEmail;
    p.new_username = this.newEmail;
    p.password = this.password;
    this.userService.updateMyEmail(p).subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.apiResponse = responseData;
      this.is_saved = true;
    });
  }

}
