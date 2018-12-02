import { Component, OnInit, Input } from '@angular/core';
import { AppResponse } from '../../../models/response';

@Component({
  selector: 'app-global-messages',
  templateUrl: './global-messages.component.html',
  styleUrls: ['./global-messages.component.css']
})
export class GlobalMessagesComponent implements OnInit {

  global_info_msgs: string[];
  global_warning_msgs: string[];
  global_error_msgs: string[];

  @Input() appResponse = null;

  constructor() { }

  ngOnInit() {
  }

  // @Input
  // setResponse(appResponse: AppResponse) {
  //   console.log("(*) appResponse.global_info_msgs.length=" +  appResponse.global_info_msgs.length);
  //   for(let i = 0; i < appResponse.global_info_msgs.length; i++) {
  //     this.global_info_msgs.push(appResponse.global_info_msgs[i]);
  //   }
    
  // }

}
