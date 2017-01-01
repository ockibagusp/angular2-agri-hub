import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

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

    constructor(private router: Router, private loginService: LoginService) {}

    ngOnInit() {}

    login(): void {
        this.loginService.login(this.username, this.password)
            .then(res => this.setAndRedirect(res))
            .catch(error => this.errors = error.__all__[0])
    }

    setAndRedirect(response: JSON) {
        console.log(response);
        this.router.navigate(['/nodes']);
    }
    
}