import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        //     this.currentUser = user;
        // });
    }

    ngOnInit() {

        this.userService.fetchCurrentUser()
        //this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        // this.currentUserSubscription.unsubscribe();
    }


}