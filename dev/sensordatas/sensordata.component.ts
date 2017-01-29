import { Component, OnInit } from '@angular/core';
import { SensorDataService } from './sensordata.service';
import { SensorData } from './sensordata.model';

import { Router} from '@angular/router';
import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsResearcherComponent } from '../core/authenticate/authenticate.component';

@Component({
    moduleId: module.id,
    selector: 'sensordata-list',
    templateUrl: 'sensordata.tpl.html'
})
export class SensorDataComponent extends IsResearcherComponent implements OnInit {
    sensordatas: SensorData[];
    links: any[];
    title = "All";
    page = 1;
    maxSize = 10;
    collectionSize: number;

    constructor(
        private sensorDataService: SensorDataService,
        public router: Router,
        public authenticateService: AuthenticateService
    ) {
        super(router, authenticateService);
        super.ngOnInit();
    }
    
    ngOnInit() {
        this.getSensorData();
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: "Sensor Data", is_active: true }
        ];
    }

    getSensorData(): void {
        this.sensorDataService.getSensorDataByUser(this.page)
            .subscribe(
                sensordatas => {
                    this.collectionSize = sensordatas.count;
                    this.sensordatas = sensordatas.results as SensorData[];
                },
                error => console.log(error)
            );
    }

    pageChange(): void {
        this.getSensorData();
    }
}