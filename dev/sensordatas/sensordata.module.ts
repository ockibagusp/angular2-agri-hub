import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import { SensorDataComponent } from './sensordata.component';
import { SensorDataNodeComponent } from './sensordata-node.component';
import { SensorDataSensorComponent } from './sensordata-sensor.component';
import { SensorDataService } from './sensordata.service';

@NgModule({
    imports: [ CoreModule, Ng2DatetimePickerModule ],
    declarations: [ 
        SensorDataComponent,
        SensorDataNodeComponent,
        SensorDataSensorComponent
    ],
    providers: [ SensorDataService ]
})
export class SensorDataModule {}