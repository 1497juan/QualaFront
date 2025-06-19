import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';
import { IniciarSesionDto } from '../../models/IniciarSesionDto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzCardModule, NzAlertModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  validateForm: FormGroup<{
    NombreUsuario: FormControl<string>;
    Contrasena: FormControl<string>;
  }> = this.fb.group({
    NombreUsuario: ['', [Validators.required]],
    Contrasena: ['', [Validators.required]],
  });

  showAlert = false;
  errorMessage = '';
  constructor(private fb: NonNullableFormBuilder, private loginService: LoginService, private router: Router) { }

  submitForm(): void {
    if (this.validateForm.valid) {
      let user: IniciarSesionDto = {
        NombreUsuario: this.validateForm.value.NombreUsuario ?? '',
        Contrasena: this.validateForm.value.Contrasena ?? ''
      };
      this.loginService.login(user).subscribe(
        (response) => {
          this.loginService.setToken(response.token);
          this.router.navigate(['/products']);
        },
        (error) => {
          this.errorMessage = 'El usuario o la contraseña son incorrectos';
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false; // Cierra la alerta en 3 segundos
          }, 3000);
        }
      );
    }
    else {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';

      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
