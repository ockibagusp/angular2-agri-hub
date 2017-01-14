import { Component, OnInit } from '@angular/core';
import { SensorDataService } from './sensordata.service';
import { SensorData } from './sensordata.model';

@Component({
    moduleId: module.id,
    selector: 'sensordata-list',
    templateUrl: 'sensordata.tpl.html'
})
export class SensorDataComponent implements OnInit {
    sensordatas: SensorData[];
    links: any[];
    title = "All";
    page = 1;
    maxSize = 10;
    collectionSize: number;

    constructor(private sensorDataService: SensorDataService ) {}
    
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