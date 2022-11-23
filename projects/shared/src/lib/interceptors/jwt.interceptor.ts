import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = localStorage.getItem('jwtToken');

        if (jwtToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
        }
        return next.handle(req);
    }
}