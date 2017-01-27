import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './core/authenticate/authenticate.service';

@Component({
    selector: 'main-app',
    template: ''
})
export class MainAppComponent {
    constructor(
        private router: Router,
        private authenticateService: AuthenticateService
    ) {}

    ngOnInit() {
        if(!this.authenticateService.isAuth()) {
            this.router.navigate(['/login']);
        } else if(this.authenticateService.isAdmin()) {
            this.router.navigate(['/users']);
        } else if(this.authenticateService.isResearcher()) {
            this.router.navigate(['/nodes']);
        }
    }
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
