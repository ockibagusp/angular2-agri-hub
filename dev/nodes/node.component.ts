import { Component, OnInit } from '@angular/core';
import { NodeService } from './node.service';
import { Node } from './node.model';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    moduleId: '../views/nodes/',
    selector: 'node-list',
    templateUrl: 'node.tpl.html',
})
export class NodeComponent implements OnInit {
    
    nodes: Node[];
    links: any[]; // breadcrumb
    activeId = "all";

    constructor(
        private nodeService: NodeService,
        private router: Router,
    ) {}
    
    ngOnInit(): void {
        this.links = [
            { label: "Home", url: "/"  },
            { label: "Nodes", is_active: true}
        ]
        this.getNodes();
    }

    getNodes(role: string=""): void {
        this.nodeService.getNodes(role)
            .subscribe(
                res => this.nodes = res.results as Node[],
                error => console.log(error)
            );
    }

    tabChange($event: NgbTabChangeEvent): void {
        this.router.navigateByUrl(`/nodes?visibility=${$event.nextId}`);
        this.getNodes($event.nextId);
    }
}