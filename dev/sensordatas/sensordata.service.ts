import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SensorData } from './sensordata.model';
import { AgriHub } from '../global/agrihub';

import { CredentialsService } from '../core/authenticate/credentials.service';

@Injectable()
export class SensorDataService {
    private nodeUrl = AgriHub.BASE_API_URL+'/subscriptions';
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.credentialsService.getToken()
    });

    constructor(
        private http: Http,
        private credentialsService: CredentialsService
    ){}

    getSensorDataByUser(page:number=1): Observable<any> {
        var user = this.credentialsService.getUser().username;
        return this.http.get(`${this.nodeUrl}/user/${user}/?page=${page}`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSensorDataByNode(page:number=1, nodeid:string): Observable<any> {
        return this.http.get(`${this.nodeUrl}/node/${nodeid}/?page=${page}`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSensorDataBySensor(page:number=1, nodeid:string, sensorid:string): Observable<any> {
        return this.http.get(`${this.nodeUrl}/node/${nodeid}/sensor/${sensorid}/?page=${page}`, 
            {headers: this.headers})
            .map(this.extractData)
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