import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { SensorDataComponent } from './sensordata.component';
import { SensorDataService } from './sensordata.service';

@NgModule({
    imports: [ CoreModule ],
    declarations: [ SensorDataComponent ],
    providers: [ SensorDataService ]
})
export class SensorDataModule {}