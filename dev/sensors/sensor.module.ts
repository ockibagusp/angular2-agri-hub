import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { SensorComponent } from './sensor.component';
import { SensorDetailComponent } from './sensor-detail.component';
import { SensorEditComponent } from './sensor-edit.component';
import { SensorNewComponent } from './sensor-new.component';

import { SensorService } from './sensor.service';

@NgModule({
    imports: [ CoreModule ],
    exports: [ ],
    declarations: [
        SensorComponent,
        SensorDetailComponent,
        SensorEditComponent,
        SensorNewComponent
    ],
    providers: [ SensorService ]
})
export class SensorModule {}