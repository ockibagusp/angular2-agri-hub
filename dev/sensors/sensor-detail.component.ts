import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { NodeService } from '../nodes/node.service';
import { SensorService } from './sensor.service';
import { Node } from '../nodes/node.model';
import { Sensor } from './sensor.model';

import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsResearcherComponent } from '../core/authenticate/authenticate.component';

@Component({
    moduleId: module.id,
    selector: 'sensor-detail',
    templateUrl: 'sensor-detail.tpl.html'
})
export class SensorDetailComponent extends IsResearcherComponent implements OnInit {
    parentNode: Node;
    sensor: Sensor;
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
        this.getNode();
    }

    getNode() {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['nodeid']))
            .subscribe(
                node => {
                    this.setUpNode(node);
                    this.getSensor();
                },
                error => console.log(error)
            );
    }

    getSensor() {
        this.route.params
            .switchMap((params: Params) => this.sensorService.getSensor(params['nodeid'], params['sensorid']))
            .subscribe(
                sensor => {
                    // console.log(sensor);
                    this.setUpSensor(sensor);
                },
                error => console.log(error)    
            );
    }

    edit() {
        this.router.navigate([`/nodes/${this.parentNode.id}/sensors/edit`, this.sensor.id]);
    }

    private setUpNode(node: Node): void {
        this.parentNode = node;
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: node.label, url: `/nodes/view/${node.id}`},
            { label: "Sensors", url: `/nodes/${node.id}/sensors`}
        ];
    }

    private setUpSensor(sensor: Sensor) {
        this.sensor = sensor;
        this.links.push(
            { label: sensor.label, is_active: true }
        );
    }
}