import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

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

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

}
