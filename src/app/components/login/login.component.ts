import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { IniciarSesionDto } from '../../models/IniciarSesionDto.model';
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BrowserModule, FormsModule, NzButtonModule, BrowserModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: IniciarSesionDto = { NombreUsuario: '', Contrasena: '' }; 
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.user).subscribe(
      (response) => {
        this.loginService.setToken(response.token);
        this.router.navigate(['/productos']);
      },
      (error) => {
        this.errorMessage = 'El usuario o la contraseña son incorrectos';
      }
    );
  }
}
