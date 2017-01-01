import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NodeService } from './node.service';
import { Node } from './node.model';
import 'rxjs/add/operator/switchMap';

interface Errors {
    field: string,
    message: string
}

@Component({
    moduleId: module.id,
    selector: 'node-edit',
    templateUrl: 'node-form.tpl.html'
})
export class NodeEditComponent {
    links: any[];
    node: Node;
    unlimited: boolean;
    _initial_subsperday: number;

    errors: Errors[];

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
        
        this.node = new Node;
        this.node.label = "FILKOM_1";
        this.node.secretkey = "rahasia";
        this.node.subsperday = 20;
    }

    private setUpNode(node: Node): void {
        this.node = node;
        this.unlimited = (-1 == node.subsperday);
        this._initial_subsperday = node.subsperday;
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: this.node.label, url: `/nodes/view/${node.id}` },
            { label: "Edit", is_active: true }
        ];
    }

    unlimitedStateChange(): void {
        if (this.unlimited) {
            this.node.subsperday = -1;
        } else {
            this.node.subsperday = (-1 == this._initial_subsperday) ? 0 : 
                this._initial_subsperday;
        }
    }

    save(): void {
        this.nodeService.save(this.node)
            .subscribe(
                node => this.router.navigate(['/nodes/view', node.id]),
                error => this.extractErrors(error)
            );
    }

    private extractErrors(err: any): void {
        let errorsParse = JSON.parse(err._body);
        this.errors = [];
        for(let index in errorsParse) {
            if(errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: errorsParse[index][0]
                })
            }
        }
    }
}