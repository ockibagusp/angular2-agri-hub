import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CredentialsService } from '../authenticate/credentials.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.tpl.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    username: string = 'basukicahya';
    password: string = 'admin123';

    errors: string;

    constructor(
        private router: Router, 
        private loginService: LoginService,
        private credentialsService: CredentialsService
    ) {}

    ngOnInit() {}

    login(): void {
        this.loginService.login(this.username, this.password)
            .then(res => this.setAndRedirect(res))
            .catch(error => this.errors = error.__all__[0])
    }

    setAndRedirect(response: any) {
        this.credentialsService.setUser(response.user);
        this.credentialsService.setToken(response.token);
        this.router.navigate(['/']);
    }
    
}