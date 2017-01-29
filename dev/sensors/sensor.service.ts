import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AgriHub } from '../global/agrihub';
import { Node } from '../nodes/node.model';
import { Sensor } from './sensor.model';

import { CredentialsService } from '../core/authenticate/credentials.service';

@Injectable()
export class SensorService {
    private nodeUrl = AgriHub.BASE_API_URL+'/nodes';
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.credentialsService.getToken()
    });

    constructor(
        private http: Http,
        private credentialsService: CredentialsService
    ) {}

    getSensors(nodeid: string): Observable<any> {
        return this.http.get(`${this.nodeUrl}/${nodeid}/sensor/`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSensor(nodeid: string, sensorid: string): Observable<any> {
        return this.http.get(`${this.nodeUrl}/${nodeid}/sensor/${sensorid}/`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    save(node: Node, sensor: Sensor): Observable<any> {
        const url = sensor.id ? `${this.nodeUrl}/${node.id}/sensor/${sensor.id}/` : 
            `${this.nodeUrl}/${node.id}/sensor/`;
        var promise: Observable<Response>;

        if(url == `${this.nodeUrl}/${node.id}/sensor/`) {
            promise = this.http.post(url, JSON.stringify(sensor), {headers: this.headers});
        } else {
            promise = this.http.put(url, JSON.stringify(sensor), {headers: this.headers});
        }

        return promise.map(this.extractData).catch(this.handleError);
    }

    delete(url: string): Observable<void> {
        return this.http.delete(url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    
    private handleError(error: any) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
} 