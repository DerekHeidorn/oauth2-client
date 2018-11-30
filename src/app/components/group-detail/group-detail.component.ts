import { Component, OnInit } from '@angular/core';
import { PublicUserProfile } from '../../models/user';
import { PublicGroup, PublicGroupDetail } from '../../models/group';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  public detail: PublicGroupDetail = new PublicGroupDetail();

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
          this.detail.group = new PublicGroup();
          this.detail.activeManagers = new Array();
          this.detail.activeMembers = new Array();
          
          this.detail.group.uuid = responseData.data.group.group_uuid;
          this.detail.group.name = responseData.data.group.group_name;
          this.detail.group.description = responseData.data.group.group_de; 

          let active_managers = responseData.data.active_managers;
          if(active_managers) {
            for(let i = 0; i < active_managers.length; i++) {
              let user: PublicUserProfile = new PublicUserProfile();

              if(active_managers[i].alias)  {
                user.alias = active_managers[i].alias;
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
              let user: PublicUserProfile = new PublicUserProfile();
              if(active_members[i].alias)  {
                user.alias = active_members[i].alias;
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
