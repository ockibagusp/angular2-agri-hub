import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Node } from './node.model';
import { NodeService } from './node.service';

import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsResearcherComponent } from '../core/authenticate/authenticate.component';

interface Errors {
    field: string,
    message: string
}

@Component({
    moduleId: module.id,
    selector: 'node-new',
    templateUrl: 'node-form.tpl.html'
})
export class NodeNewComponent extends IsResearcherComponent {
    is_new: boolean = true;
    links: any[];
    node: Node;
    unlimited: boolean;

    errors: Errors[];

    constructor(
        private nodeService: NodeService,
        public router: Router,
        public authenticateService: AuthenticateService
    ) {
        super(router, authenticateService);
        super.ngOnInit();
    }

    ngOnInit() {
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: "New", is_active: true }
        ];
        this.node = new Node;
        this.node.label = "FILKOM_1";
        this.node.secretkey = "rahasia";
        this.node.subsperday = 20;
    }

    unlimitedStateChange(): void {
        if (this.unlimited) {
            this.node.subsperday = -1;
        } else {
            this.node.subsperday = 0;
        }
    }

    save(): void {
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
                    message: errorsParse[index][0]
                })
            }
        }
    }
}