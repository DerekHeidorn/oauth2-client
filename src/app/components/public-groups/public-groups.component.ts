import { Component, OnInit } from '@angular/core';
import { PublicGroup } from '../../models/group';
import { AppResponse } from '../../models/response';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-public-groups',
  templateUrl: './public-groups.component.html',
  styleUrls: ['./public-groups.component.css']
})
export class PublicGroupsComponent implements OnInit {

  public groups: PublicGroup[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe((responseData: AppResponse) => {
        console.log("data=" + responseData.data)
        this.groups = []
        for(let i = 0; i < responseData.data.length; i++) {
          let g: PublicGroup = new PublicGroup()
          g.uuid = responseData.data[i].group_uuid;
          g.name = responseData.data[i].group_name;
          this.groups.push(g);
        }
  });

  }
}
