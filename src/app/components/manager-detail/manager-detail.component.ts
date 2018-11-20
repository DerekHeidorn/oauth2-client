import { Component, OnInit } from '@angular/core';
import { Manager } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-detail',
  templateUrl: './manager-detail.component.html',
  styleUrls: ['./manager-detail.component.css']
})
export class ManagerDetailComponent implements OnInit {

  public manager: Manager = new Manager();

  constructor(private memberService: MemberService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMember()
  }

  getMember(): void {
    
    const group_uuid: string = this.route.snapshot.paramMap.get('group_uuid');
    const user_uuid: string = this.route.snapshot.paramMap.get('user_uuid');
    this.memberService.getManager(group_uuid, user_uuid)
        .subscribe((responseData) => {
          console.log("data=" + responseData.data)
          this.manager = new Manager();
          
          this.manager.uuid = responseData.data.user_uuid;
          this.manager.first_name = responseData.data.first_name;
          this.manager.last_name = responseData.data.last_name;
          this.manager.nick_name = responseData.data.nick_name;
          this.manager.manager_from_ts = responseData.data.manager_from_ts;
          this.manager.manager_to_ts = responseData.data.manager_to_ts;

        });    
  }

}
