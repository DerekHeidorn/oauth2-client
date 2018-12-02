import { Component, OnInit } from '@angular/core';
import { PublicGroup } from '../../models/group';
import { ApiResponse } from '../../models/response';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-public-groups',
  templateUrl: './public-groups.component.html',
  styleUrls: ['./public-groups.component.css']
})
export class PublicGroupsComponent implements OnInit {

  public groups: PublicGroup[] = [];
  public apiResponse: ApiResponse = new ApiResponse();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getPublicGroups();
  }

  getPublicGroups() {
    this.groupService.getGroups()
      .subscribe((responseData: ApiResponse) => {
        console.log("data=" + responseData.data)
        this.groups = []
        for(let i = 0; i < responseData.data.length; i++) {
          let g: PublicGroup = new PublicGroup();
          console.log("(*)responseData.global_info_msgs=" + responseData.global_info_msgs);
          this.apiResponse = responseData;
          g.uuid = responseData.data[i].group_uuid;
          g.uuid_digest = responseData.data[i].group_uuid_digest;
          g.name = responseData.data[i].group_name;
          g.description = responseData.data[i].group_de; 
          this.groups.push(g);
        }
    });
  }

  subscribe(uuid: string, uuid_digest: string) {
    this.groupService.subscribe(uuid, uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.getPublicGroups();
    });
  }
}
