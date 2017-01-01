import { Component, OnInit } from '@angular/core';
import { NodeService } from './node.service';
import { Node } from './node.model';

@Component({
    moduleId: module.id,
    selector: 'node-list',
    templateUrl: 'node.tpl.html'
})
export class NodeComponent implements OnInit {
    nodes: Node[];
    links: any[]; // breadcrumb
    
    constructor(private nodeService: NodeService) {}
    
    ngOnInit(): void {
        this.links = [
            { label: "Home", url: "/" , is_active: true}
        ]
        this.getNodes();
    }

    getNodes(): void {
        this.nodeService.getNodes()
            .subscribe(
                res => this.nodes = res.results as Node[],
                error => console.log(error)
            );
    }
}