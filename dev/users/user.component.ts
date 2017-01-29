import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: 'user.tpl.html'
})
export class UserComponent implements OnInit {
    users: User[];
    links: any[]; // breadcrumb

    constructor(
        private userService: UserService
    ) {}

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