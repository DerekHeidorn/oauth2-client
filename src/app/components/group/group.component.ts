import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
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

  public group: Group = new Group();

  constructor(private groupService: GroupService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getGroup()
    
  }

  getGroup(): void {
    const uuid: string = this.route.snapshot.paramMap.get('uuid');
    this.groupService.getGroup(uuid)
        .subscribe((responseData: AppResponse) => {
          console.log("data=" + responseData.data)
          this.group = new Group();

          this.group.uuid = responseData.data.group_uuid;
          this.group.name = responseData.data.group_name;
        });    
  }

}
