import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {

    constructor(
    ) {

    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }


}