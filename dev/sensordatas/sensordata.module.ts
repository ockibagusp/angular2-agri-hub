import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { SensorDataComponent } from './sensordata.component';
import { SensorDataNodeComponent } from './sensordata-node.component';
import { SensorDataService } from './sensordata.service';

@NgModule({
    imports: [ CoreModule ],
    declarations: [ 
        SensorDataComponent,
        SensorDataNodeComponent
    ],
    providers: [ SensorDataService ]
})
export class SensorDataModule {}