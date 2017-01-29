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
    selector: 'sensor-edit',
    templateUrl: 'sensor-form.tpl.html'
})
export class SensorEditComponent extends IsResearcherComponent implements OnInit {
    parentNode: Node;
    sensor: Sensor;
    links: any[];

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
                sensor => this.setUpSensor(sensor),
                error => console.log(error)
            );
    }

    save(): void {
        this.sensorService.save(this.parentNode, this.sensor)
            .subscribe(
                sensor => this.router.navigate(['/nodes/', this.parentNode.id, 'sensors']),
                error => console.log(error)
            );
    }

    delete(): void {
        if(confirm("Are you sure?")) {
            this.sensorService.delete(this.sensor.url)
                .subscribe(
                    () => this.router.navigate(['/nodes/', this.parentNode.id, 'sensors']),
                    error => console.log(error)
                );
        }
    }

    private setUpNode(node: Node) {
        this.parentNode = node;
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: node.label, url: `/nodes/view/${node.id}` },
            { label: "Sensors", url: `/nodes/${node.id}/sensors` },
        ];
    }

    private setUpSensor(sensor: Sensor) {
        this.sensor = sensor as Sensor;
        this.links.push(
            { label: sensor.label, url: `/nodes/${this.parentNode.id}/sensors/view/${sensor.id}` },
            { label: "Edit", is_active: true }
        );
    }
}