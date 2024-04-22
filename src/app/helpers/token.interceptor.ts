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

  static accessToken: string;
  static refreshToken: string;
  static decodedToken: any = '';
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
    const storedAccessToken = localStorage.getItem('Access');
    const storedRefreshToken = localStorage.getItem('Refresh');

    if (storedAccessToken && storedRefreshToken) {
      TokenInterceptor.accessToken = storedAccessToken;
      TokenInterceptor.refreshToken = storedRefreshToken;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const req = this.addAuthorizationHeader(request);

    const isUnauthenticatedURL = request.url.includes('/api/v1/auth/token/') || request.url.includes('/api/v1/auth/create_user/');

    if (isUnauthenticatedURL) {
      return next.handle(request);
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const decodedToken = TokenInterceptor.decodedToken;
        const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;

        if (err.status === 401 && isExpired && TokenInterceptor.refreshToken) {
          return this.http.post(this.baseUrl + 'api/v1/auth/refresh_token/' + TokenInterceptor.refreshToken, {}).pipe(
            switchMap((res: any) => {
              TokenInterceptor.accessToken = res.tokens.access;

              localStorage.setItem('Access', TokenInterceptor.accessToken);
              localStorage.setItem('Refresh', TokenInterceptor.refreshToken);

              const authReq = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${TokenInterceptor.accessToken}`
                }
              });
              return next.handle(authReq);
            }),
            catchError((error: any) => {
              return throwError(error);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {

    const accessToken = localStorage.getItem('Access');

    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return request;
  }
}
