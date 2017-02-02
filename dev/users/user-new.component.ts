import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsAdminComponent } from '../core/authenticate/authenticate.component';

interface Errors {
    field: string,
    message: string
}

@Component({
    moduleId: '../views/users/',
    selector: 'user-new',
    templateUrl: 'user-form.tpl.html'
})
export class UserNewComponent extends IsAdminComponent implements OnInit {
    is_new: boolean = true;
    user: User;
    links: any[];

    errors: Errors[];

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
            { label: "Users", url: "/users/" },
            { label: "New", is_active: true }
        ];
        this.user = new User;
        // initial for example purpose
        this.user.username = "milea";
        this.user.email = "milea@example.com";
        this.user.first_name = 'Milea Adnan';
        this.user.last_name = 'Nasution';
        this.user.is_admin = 0;
    }

    save() {
        this.userService.save(this.user)
            .subscribe(
                () => this.router.navigate(['/users']),
                error => this.extractErrors(error)
            );
    }

    private extractErrors(err: any): void {
        let errorsParse = JSON.parse(err._body);
        this.errors = [];
        for(let index in errorsParse) {
            if(errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: errorsParse[index][0]
                })
            }
        }
    }
}