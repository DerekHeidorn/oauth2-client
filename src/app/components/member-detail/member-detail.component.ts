import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  public member: Member = new Member();

  constructor(private memberService: MemberService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMember()
  }

  getMember(): void {
    
    const group_uuid: string = this.route.snapshot.paramMap.get('group_uuid');
    const user_uuid: string = this.route.snapshot.paramMap.get('user_uuid');
    this.memberService.getMember(group_uuid, user_uuid)
        .subscribe((responseData) => {
          console.log("data=" + responseData.data)
          this.member = new Member();
          
          this.member.uuid = responseData.data.user_uuid;
          this.member.alias = responseData.data.alias;
          this.member.membership_from_ts = responseData.data.membership_from_ts;
          this.member.membership_to_ts = responseData.data.membership_to_ts;

        });    
  }

}
