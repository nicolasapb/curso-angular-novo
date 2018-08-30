import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogServer } from './log-server';
import { environment } from '../../../environments/environment';

const API = environment.logServerUrl;

@Injectable({
    providedIn: 'root'
})
export class LogServerService {

    constructor(
        private http: HttpClient
    ) {}

    log(logServer: LogServer) {
        return this.http.post(API + '/infra/log', logServer);
    }

}
