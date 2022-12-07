import { from, Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '@shared';




@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private busyService: BusyService) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'POST') {
            return next.handle(req);
        }
        if (req.method === 'DELETE') {
            return next.handle(req);
        }
       
        return next.handle(req).pipe(
          finalize(() => {
              this.busyService.idle();
          })
      );
    }
}