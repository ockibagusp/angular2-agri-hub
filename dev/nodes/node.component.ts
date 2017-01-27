import { Component, OnInit } from '@angular/core';
import { NodeService } from './node.service';
import { Node } from './node.model';

import { Router } from '@angular/router';
import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsResearcherComponent } from '../core/authenticate/authenticate.component';

@Component({
    moduleId: module.id,
    selector: 'node-list',
    templateUrl: 'node.tpl.html'
})
export class NodeComponent extends IsResearcherComponent implements OnInit {
    nodes: Node[];
    links: any[]; // breadcrumb
    
    constructor(
        private nodeService: NodeService,
        public router: Router,
        public authenticateService: AuthenticateService
    ) {
        super(router, authenticateService);
        super.ngOnInit();
    }
    
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