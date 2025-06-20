import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IniciarSesionDto } from '../models/IniciarSesionDto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiUrl}/Autenticacion`;

  constructor(private http: HttpClient, private router: Router) { }

  login(iniciarSesionDto: IniciarSesionDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, iniciarSesionDto);
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
