import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Node } from './node.model';
import { NodeService } from './node.service';

interface Errors {
    field: string,
    message: string
}

@Component({
    moduleId: '../views/nodes/',
    selector: 'node-new',
    templateUrl: 'node-form.tpl.html'
})
export class NodeNewComponent {
    is_new: boolean = true;
    links: any[];
    node: Node;
    unlimited: boolean;

    errors: Errors[];

    constructor(
        private nodeService: NodeService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: "New", is_active: true }
        ];
        this.node = new Node;
        this.node.label = "FILKOM_1";
        this.node.secretkey = "rahasia";
        this.node.pubsperday = 20;
    }

    unlimitedStateChange(): void {
        if (this.unlimited) {
            this.node.pubsperday = -1;
        } else {
            this.node.pubsperday = 0;
        }
    }

    save(): void {
        this.node.is_public = this.node.is_public ? 1 : 0; 
        this.nodeService.save(this.node)
            .subscribe(
                node => this.router.navigate(['/nodes']),
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
                    message: typeof errorsParse[index] === 'string' ? 
                        errorsParse[index]: errorsParse[index][0]
                })
            }
        }
    }

    public closeAlert(alert: any) {
        const index: number = this.errors.indexOf(alert);
        this.errors.splice(index, 1);
    }
}