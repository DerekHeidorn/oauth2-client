import { Component, OnInit } from '@angular/core';
import { User, UserDetail } from '../../models/user';
import { Group, GroupDetail } from '../../models/group';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppResponse } from '../../models/response';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public detail: GroupDetail = new GroupDetail();

  constructor(private groupService: GroupService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getGroup()
    
  }

  getGroup(): void {
    const uuid: string = this.route.snapshot.paramMap.get('uuid');
    this.groupService.getGroup(uuid)
        .subscribe((responseData) => {
          console.log("data=" + responseData.data)
          this.detail.group = new Group();
          this.detail.activeManagers = new Array();
          this.detail.activeMembers = new Array();
          
          this.detail.group.uuid = responseData.data.group.group_uuid;
          this.detail.group.name = responseData.data.group.group_name;

          let active_managers = responseData.data.active_managers;
          if(active_managers) {
            for(let i = 0; i < active_managers.length; i++) {
              let user: UserDetail = new UserDetail();

              if(active_managers[i].nick_name)  {
                user.nick_name = active_managers[i].nick_name;
              }
              if(active_managers[i].user_uuid) {
                user.user_uuid = active_managers[i].user_uuid;
                this.detail.activeManagers.push(user);
              }            
            }
          }

          let active_members = responseData.data.active_members;
          if(active_members) {
            for(let i = 0; i < active_members.length; i++) {
              let user: UserDetail = new UserDetail();
              if(active_members[i].nick_name) {
                user.nick_name = active_members[i].nick_name;
              }
              if(active_members[i].user_uuid) {
                user.user_uuid = active_members[i].user_uuid;
              }
              this.detail.activeMembers.push(user);
            }
          }

        });    
  }

}
