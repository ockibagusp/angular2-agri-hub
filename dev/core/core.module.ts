import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageNotFoundComponent } from './exceptions/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CredentialsService } from './authenticate/credentials.service';
import { LoginService } from './login/login.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    exports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        NavbarComponent,
        BreadcrumbComponent,
        LoginComponent,
        NgbModule
    ],
    declarations: [
        NavbarComponent,
        BreadcrumbComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    providers: [ 
        LoginService,
        CookieService,
        CredentialsService 
    ]
})
export class CoreModule {}