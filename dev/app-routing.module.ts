import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
import { PageNotFoundComponent } from './core/exceptions/page-not-found.component';
import { NodeComponent } from './nodes/node.component';
import { NodeDetailComponent } from './nodes/node-detail.component';
import { NodeNewComponent } from './nodes/node-new.component';
import { NodeEditComponent } from './nodes/node-edit.component';

import { SensorComponent } from './sensors/sensor.component';
import { SensorDetailComponent } from './sensors/sensor-detail.component';
import { SensorEditComponent } from './sensors/sensor-edit.component';
import { SensorNewComponent } from './sensors/sensor-new.component';

import { SensorDataComponent } from './sensordatas/sensordata.component';
import { SensorDataNodeComponent } from './sensordatas/sensordata-node.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    // node
    { path: 'nodes', component: NodeComponent },
    { path: 'nodes/new', component: NodeNewComponent },
    { path: 'nodes/view/:id', component: NodeDetailComponent },
    { path: 'nodes/edit/:id', component: NodeEditComponent },
    // sensor
    { path: 'nodes/:id/sensors', component: SensorComponent },
    { path: 'nodes/:nodeid/sensors/new', component: SensorNewComponent },
    { path: 'nodes/:nodeid/sensors/view/:sensorid', component: SensorDetailComponent },
    { path: 'nodes/:nodeid/sensors/edit/:sensorid', component: SensorEditComponent },
    // sensor data
    { path: 'sensordata', component: SensorDataComponent },
    { path: 'sensordata/node/:nodeid', component: SensorDataNodeComponent },
    // otherwise
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}