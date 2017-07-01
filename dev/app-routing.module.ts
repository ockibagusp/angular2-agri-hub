import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
    BaseCanActivate, CanActivateAdmin, CanActivateResearcher 
} from './core/authenticate/authenticate.service';

import { MainAppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { LogoutComponent } from './core/authenticate/logout.component';
import { RegisterComponent } from './core/register/register.component';
import { PageNotFoundComponent, ForbiddenComponent } from './core/exceptions/exception.component';
import { NodeComponent } from './nodes/node.component';
import { NodeDetailComponent } from './nodes/node-detail.component';
import { NodeNewComponent } from './nodes/node-new.component';
import { NodeEditComponent } from './nodes/node-edit.component';

import { SensorComponent } from './sensors/sensor.component';
import { SensorEditComponent } from './sensors/sensor-edit.component';
import { SensorNewComponent } from './sensors/sensor-new.component';

import { SensorDataComponent } from './sensordatas/sensordata.component';
import { SensorDataNodeComponent } from './sensordatas/sensordata-node.component';
import { SensorDataSensorComponent } from './sensordatas/sensordata-sensor.component';

import { UserComponent } from './users/user.component';
import { UserDetailComponent } from './users/user-detail.component';
import { UserNewComponent } from './users/user-new.component';
import { UserEditComponent } from './users/user-edit.component';

const routes: Routes = [
    { path: '', component: MainAppComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    // node
    { path: 'nodes', component: NodeComponent, canActivate: [CanActivateResearcher] },
    { path: 'nodes/new', component: NodeNewComponent, canActivate: [CanActivateResearcher] },
    { path: 'nodes/view/:id', component: NodeDetailComponent, canActivate: [CanActivateResearcher] },
    { path: 'nodes/edit/:id', component: NodeEditComponent, canActivate: [CanActivateResearcher] },
    // sensor
    { path: 'nodes/:id/sensors', component: SensorComponent, canActivate: [CanActivateResearcher] },
    { 
        path: 'nodes/:nodeid/sensors/new', 
        component: SensorNewComponent, 
        canActivate: [CanActivateResearcher] 
    },
    { 
        path: 'nodes/:nodeid/sensors/edit/:sensorid', 
        component: SensorEditComponent, 
        canActivate: [CanActivateResearcher] 
    },
    // sensor data
    { path: 'sensordata', component: SensorDataComponent, canActivate: [CanActivateResearcher] },
    { 
        path: 'sensordata/node/:nodeid', 
        component: SensorDataNodeComponent, 
        canActivate: [CanActivateResearcher] 
    },
    { 
        path: 'sensordata/node/:nodeid/sensor/:sensorid', 
        component: SensorDataSensorComponent, 
        canActivate: [CanActivateResearcher] 
    },
    // user
    { path: 'users', component: UserComponent, canActivate: [CanActivateAdmin] },
    { path: 'users/new', component: UserNewComponent, canActivate: [CanActivateAdmin] },
    { path: 'users/view/:userid', component: UserDetailComponent, canActivate: [CanActivateAdmin] },
    { path: 'users/edit/:userid', component: UserEditComponent, canActivate: [CanActivateAdmin] },
    // otherwise
    { path: '403', component: ForbiddenComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}