import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('id_token');

        if (token != null) {
        // var contentType;
        // if (request.headers.has('Content-Type')) {
        //     contentType = request.headers.get('Content-Type');
        // }


        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': (contentType != 'application/json' && contentType != undefined ? 'application/x-www-form-urlencoded' :  'application/json')
            }
            });
        }
        return next.handle(request);
    }
}
