import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { NodeService } from '../nodes/node.service';
import { SensorService } from './sensor.service';
import { Node } from '../nodes/node.model';
import { Sensor } from './sensor.model';

@Component({
    moduleId: module.id,
    selector: 'sensor-new',
    templateUrl: 'sensor-form.tpl.html'
})
export class SensorNewComponent implements OnInit {
    parentNode: Node;
    sensor: Sensor;
    is_new: boolean = true;
    links: any[];

    constructor(
        private nodeService: NodeService,
        private sensorService: SensorService,
        private router: Router,
        private route: ActivatedRoute 
    ){}

    ngOnInit() {
        this.getNodes();
        this.sensor = new Sensor;
    }

    getNodes(): void {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['nodeid']))
            .subscribe(
                node => {
                    this.setUpNode(node);
                },
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

    private setUpNode(node: Node): void {
        this.parentNode = node;
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: node.label, url: `/nodes/view/${node.id}` },
            { label: "Sensors", url: `/nodes/${node.id}/sensors` },
            { label: "New", is_active: true }
        ];
    }
}