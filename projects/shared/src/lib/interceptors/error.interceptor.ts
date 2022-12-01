import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          if (error.status === 400) {
            console.log(error);
          }
          if (error.status === 401) {
            localStorage.removeItem("jwtToken");
            console.log(error);
          }
          if (error.status === 404) {
            console.log(error);
          }
          if (error.status === 500) {
            console.log(error);
          }
          return throwError(error);
        }
        return null;
      })
    );
  }
}
