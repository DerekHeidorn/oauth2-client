import { Component, OnInit, Input } from '@angular/core';
import { ApiResponse } from '../../../models/response';

@Component({
  selector: 'app-global-messages',
  templateUrl: './global-messages.component.html',
  styleUrls: ['./global-messages.component.css']
})
export class GlobalMessagesComponent implements OnInit {

  @Input() apiResponse: ApiResponse = null;

  constructor() { }

  ngOnInit() {
  }

}
