import { Component, ViewChild } from '@angular/core';
import { AuthUsersService } from '../services/auth-users.service';
import { Router } from '@angular/router';
import { singInUser } from '../models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from '../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword = false;
  message: any = '';
  loginForm!: FormGroup;
  error: boolean = false;
  subscriptions!: Subscription
  constructor(
    private loginService: AuthUsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorS: ErrorService
  ) {}
  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.loginForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      password: ['',Validators.required]
    });
  }
  getNameRol(){
    this.loginService.decodeToken().subscribe((data:any)=>{
      if(data.rol === 'Administrador'){
        this.router.navigateByUrl('/admin')
      }
    })
  }
  onLogin(): void {
    if (this.loginForm.invalid) {
        return Object.values(this.loginForm.controls).forEach(control=>{
          control.markAllAsTouched()
        })
    }
    const loginData = {
      cedula: this.loginForm.value.cedula,
      password: this.loginForm.value.password
    };
    this.subscriptions = this.loginService.login(loginData).pipe(
      switchMap(() => {
        return this.loginService.decodeToken() 
      })
    ).subscribe({
      next: (data: any) => {
        if(data.rol==='Administrador'){
          this.router.navigateByUrl('/admin')
        }
        if(data.rol==='Docente'){
          this.router.navigateByUrl('/docente')
        }
        if(!data){
          console.log('Hola')
          this.router.navigateByUrl('/docente')
        }
      },
      error: (e: HttpErrorResponse) => {
        this.message = this.errorS.msgError(e);
        this.error = true;
        this.onisError();
      }
    });
    
  }

  onLogout(): void {
    this.loginService.logout();
  }

  onisError(): void {
    setTimeout(() => {
      this.error = false;
    }, 10000);
  }

  get cedulaValid(){
    return this.loginForm.get('cedula')?.invalid && this.loginForm.get('cedula')?.touched
  }
  get passwordValid(){
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched
  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
