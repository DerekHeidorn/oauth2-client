import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customer: Customer = {
    id: 1,
    name: 'Mister Customer',
    username: 'foo@bar.com'
  };

  constructor() { }

  ngOnInit() {
  }

}
