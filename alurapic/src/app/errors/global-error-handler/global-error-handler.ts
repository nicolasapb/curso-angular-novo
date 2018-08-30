import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from '../../core/user/user.service';
import { LogServerService } from './log-server.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {}

    handleError(error: any): void {

        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const logServerService = this.injector.get(LogServerService);

        const url = location instanceof PathLocationStrategy ? location.path() : '';

        const message = error.message ? error.message : error.toString();

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames.map(sf => sf.toString()).join('\n');
                console.log(message);
                console.log(stackAsString);
                logServerService.log({
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString
                }).subscribe(
                    () => console.log('Error logged on server'),
                    err => console.log('Fail to send log error to servce', err)
                );
            });
    }
}
