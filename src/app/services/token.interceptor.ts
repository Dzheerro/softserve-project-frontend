import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  static accessToken = '';
  static refreshToken = '';
  static isExpired = '';
  baseUrl: string = environment.baseUrl;
  refresh = false;

  constructor(private http: HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${TokenInterceptor.accessToken}`
      }
    })

    if (request.url.includes('/api/v1/auth/token/')) {
      return next.handle(request);
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          return this.http.post(this.baseUrl + 'api/v1/auth/refresh_token/' + TokenInterceptor.refreshToken, {}).pipe(
            switchMap((res: any) => {
              TokenInterceptor.accessToken = res.tokens.access;
              this.refresh = false;
              const authReq = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${TokenInterceptor.accessToken}`
                }
              });
              return next.handle(authReq);
            }),
            catchError((error: any) => {
              this.refresh = false;
              return throwError(error);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
