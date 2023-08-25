import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Users, singInUser } from '../models/users';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { JwtResponseI } from '../models/jwt-response-i';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from './error.service';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthUsersService {
  urlLogin = 'http://localhost:3001/api/users/signin';
  url = 'http://localhost:3001/api/users/decode';
  private token: any;
  idUser!:string;
  private resetToken!:any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router, private errorS : ErrorService) {
    this.checkToken();
    this.ver()
  }
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
    
  }
  login(user: singInUser): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(this.urlLogin, user).pipe(
      tap((res: JwtResponseI) => {
        if (res) {  
          if(res.token){
            this.saveToken(res.token);
            this.loggedIn.next(true);
          }
          if (res.reset) {
            this.router.navigateByUrl('/changePassword/'+res.reset);
          } 
        }
      }
      )
    );
  }

  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('ACCESS_TOKEN');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpire=>', isExpired);
    if (isExpired) {
      this.logout();
    } else {
      this.loggedIn.next(true);
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }
  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }
  decodeToken():Observable<any>{
    if(this.getToken()){
      return this.http.get(this.url)
    }
    return EMPTY
  }
  rol:string=''
  getNameRol():string{
    this.decodeToken().subscribe((data: any)=>{
      return this.rol=data.rol
    })
    return this.rol
  }
  ver(){
    this.isLogged.subscribe((data)=>{
     console.log(data)
    })
  }

  /* decodeToken(): Observable<any> {
    const token = localStorage.getItem('ACCESS_TOKEN');
  
    if (token) {
      return this.http.get(this.url).pipe(
        map((response: any) => {
          console.log(response)
          return response.token;
        }),
        catchError((error: any) => {
          console.error('Error al decodificar el token:', error);
          throw error;
        })
      );
    } else {
      return EMPTY;
    }
  } */
  
}
