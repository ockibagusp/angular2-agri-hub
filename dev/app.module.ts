import { NgModule }      from '@angular/core';
import { NodeModule } from './nodes/node.module';
import { SensorModule } from './sensors/sensor.module';
import { SensorDataModule } from './sensordatas/sensordata.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';

@NgModule({
    imports: [
        AppRoutingModule,
        NodeModule,
        SensorModule,
        SensorDataModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
