import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicGroup } from '../../../models/group';
import { ApiResponse } from '../../../models/response';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups: PublicGroup[] = [];

  constructor(private toastr: ToastrService,
              private groupService: GroupService) { }

  ngOnInit() {
    this.getMyGroups();
  }

  getMyGroups() {
    this.groups = []
    this.groupService.getMyGroups()
      .subscribe((responseData: ApiResponse) => {
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

  unsubscribe(group_name: string, uuid: string, uuid_digest: string) {
    this.groupService.unsubscribe(uuid, uuid_digest)
    .subscribe((responseData: ApiResponse) => {
      console.log("data=" + responseData.data);
      this.toastr.success('Successfully unsubscribed from "' + group_name + '" group.', 'Group');
      this.getMyGroups();
    });
  }
}
