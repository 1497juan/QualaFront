import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    constructor(private authService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Interceptor de autenticación activo');

        const token = this.authService.getToken();

        if (token) {
            const clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(clonedRequest);
        }

        return next.handle(req);
    }
}
