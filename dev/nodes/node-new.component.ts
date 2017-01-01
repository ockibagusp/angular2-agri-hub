import { Component, OnInit } from '@angular/core';
import { Node } from './node.model';

@Component({
    moduleId: module.id,
    selector: 'node-new',
    templateUrl: 'node-form.tpl.html'
})
export class NodeNewComponent {
    is_new: boolean = true;
    links: any[];
    node: Node;
    unlimited: boolean;

    constructor() {}

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
        console.log(this.node)
    }
}