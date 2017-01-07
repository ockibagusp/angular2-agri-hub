import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NodeService } from './node.service';
import { Node } from './node.model';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'node-detail',
    templateUrl: 'node-detail.tpl.html'
})
export class NodeDetailComponent implements OnInit {
    node: Node;
    links: any[]; // breadcrumb

    constructor(
        private nodeService: NodeService,
        private router: Router, 
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['id']))
            .subscribe(
                node => this.setUpNode(node),
                error => console.log(error)
            );
    }

    edit(): void {
        this.router.navigate(['/nodes/edit', this.node.id]);
    }

    private setUpNode(node: Node): void {
        this.node = node;
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: this.node.label, url: "/" , is_active: true}
        ];
    }
}