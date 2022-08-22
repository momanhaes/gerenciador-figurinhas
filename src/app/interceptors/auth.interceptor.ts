import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userService = this.injector.get(UserService);

    if (userService.isLoggedIn()) {
      const accessToken = userService.getToken().token;
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });

      return next.handle(authRequest);
    } else return next.handle(request);
  }
}
