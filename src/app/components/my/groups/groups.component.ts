import { Component, OnInit } from '@angular/core';
import { PublicGroup } from '../../../models/group';
import { AppResponse } from '../../../models/response';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups: PublicGroup[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getMyGroups();
  }

  getMyGroups() {
    this.groups = []
    this.groupService.getMyGroups()
      .subscribe((responseData: AppResponse) => {
        console.log("data=" + responseData.data)
        for(let i = 0; i < responseData.data.length; i++) {
          let g: PublicGroup = new PublicGroup()
          g.uuid = responseData.data[i].group_uuid;
          g.uuid_digest = responseData.data[i].group_uuid_digest;
          g.name = responseData.data[i].group_name;
          this.groups.push(g);
        }
    });
  }

  unsubscribe(uuid, uuid_digest) {
    this.groupService.unsubscribe(uuid, uuid_digest)
    .subscribe((responseData: AppResponse) => {
      console.log("data=" + responseData.data);
      this.getMyGroups();
    });
  }
}
