import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
import { PageNotFoundComponent } from './core/exceptions/page-not-found.component';
import { NodeComponent } from './nodes/node.component';
import { NodeDetailComponent } from './nodes/node-detail.component';
import { NodeNewComponent } from './nodes/node-new.component';
import { NodeEditComponent } from './nodes/node-edit.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'nodes', component: NodeComponent },
    { path: 'nodes/new', component: NodeNewComponent },
    { path: 'nodes/view/:id', component: NodeDetailComponent },
    { path: 'nodes/edit/:id', component: NodeEditComponent },
    // otherwise
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}