import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsAdminComponent } from '../core/authenticate/authenticate.component';

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: 'user.tpl.html'
})
export class UserComponent extends IsAdminComponent implements OnInit {
    users: User[];
    links: any[]; // breadcrumb

    constructor(
        private userService: UserService,
        public router: Router,
        public authenticateService: AuthenticateService
    ) {
        super(router, authenticateService);
        super.ngOnInit();
    }

    ngOnInit() {
        this.links = [
            { label: "Home", url: "/" },
            { label: "Users", url: "/users" , is_active: true}
        ]
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe(
                users => this.users = users.results as User[],
                error => console.log(error)
            );
    }
}