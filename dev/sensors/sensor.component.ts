import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';

import { NodeService } from '../nodes/node.service';
import { SensorService } from './sensor.service';
import { Node } from '../nodes/node.model';
import { Sensor } from './sensor.model';

import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsResearcherComponent } from '../core/authenticate/authenticate.component';

@Component({
    moduleId: '../views/sensors/',
    selector: 'sensor-list',
    templateUrl: 'sensor.tpl.html'
})
export class SensorComponent extends IsResearcherComponent implements OnInit {
    parentNode: Node;
    sensors: Sensor[];
    links: any[]; // breadcrumb

    constructor(
        private nodeService: NodeService,
        private sensorService: SensorService, 
        private route: ActivatedRoute,
        public router: Router,
        public authenticateService: AuthenticateService
    ) {
        super(router, authenticateService);
        super.ngOnInit();
    }

    ngOnInit() {
        this.getParentNode();
        this.getSensors();
    }

    getParentNode() {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['id']))
            .subscribe(
                node => {
                    this.parentNode = node as Node;
                    this.links = [
                        { label: "Home", url: "/" },
                        { label: "Nodes", url: "/nodes/" },
                        { label: this.parentNode.label, url: `/nodes/view/${this.parentNode.id}` },
                        { label: "Sensors", is_active: true }
                    ];
                },
                error => console.log(error)
            );
    }

    getSensors() {
        this.route.params
            .switchMap((params: Params) => this.sensorService.getSensors(params['id']))
            .subscribe(
                sensors => this.sensors = sensors.results as Sensor[],
                error => console.log(error)
            );
    }
}