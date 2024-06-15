import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../../vista-admin/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registroForm: FormGroup;
  errorMessage: string = '';
  errorMessageRegistro: string = '';
  mostrarLoginVar: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private dbService: DatabaseService) {
    this.loginForm = this.fb.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      passwordLogin: ['', Validators.required]
    });

    this.registroForm = this.fb.group({
      emailRegistro: ['', [Validators.required, Validators.email]],
      passwordRegistro: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      tipoRegistro: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      const { emailLogin, passwordLogin } = this.loginForm.value;
      try {
        const tipoUsuario = await this.dbService.verificarCredenciales(emailLogin, passwordLogin);
        if (tipoUsuario) {
          this.redirigirSegunTipoUsuario(tipoUsuario);
        } else {
          this.errorMessage = 'Credenciales incorrectas.';
        }
      } catch (error) {
        console.error('Error en login:', error);
        this.errorMessage = 'Error en el proceso. Por favor, inténtalo de nuevo más tarde.';
      }
    }
  }

  async registrar(): Promise<void> {
    if (this.registroForm.valid) {
      const { emailRegistro, passwordRegistro, tipoRegistro } = this.registroForm.value;
      try {
        const tipoUsuario = await this.dbService.registrarUsuario(emailRegistro, passwordRegistro, tipoRegistro);
        if (tipoUsuario) {
          this.redirigirSegunTipoUsuario(tipoUsuario);
        } else {
          this.errorMessageRegistro = 'Error al registrar usuario.';
        }
      } catch (error) {
        console.error('Error en registro:', error);
        this.errorMessageRegistro = 'Error en el proceso de registro. Por favor, inténtalo de nuevo más tarde.';
      }
    }
  }

  private redirigirSegunTipoUsuario(tipoUsuario: string): void {
    switch (tipoUsuario) {
      case 'admin':
        this.router.navigate(['/vista-admin']);
        break;
      case 'estudiante':
        //this.router.navigate(['/vista-usuario']);
        this.errorMessage = 'No hay vista usuario';
        break;
      case 'centro':
        //this.router.navigate(['/vista-centro']);
        this.errorMessage = 'No hay vista centro';
        break;
      default:
        this.errorMessage = 'Redirección fallida.';
        break;
    }
  }



}
