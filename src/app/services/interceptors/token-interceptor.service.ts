import { UsuarioService } from '../usuario/usuario.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(public _usuarioService: UsuarioService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this._usuarioService.getToken();

    // modify request
    request = request.clone({
      setHeaders: {
        authorization: 'Bearer ' + token
      }
    });

    console.log(request);

     return next.handle(request)
     .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          console.log('Check Your Internet Connection And Try again Later');
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
          // auth.setToken(null);
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );

   }


}

