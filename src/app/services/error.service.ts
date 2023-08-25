import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  msgError(e: HttpErrorResponse){
    let mensaje="";
    if(e.error.message){
      return mensaje = e.error.message
      
    }else{
      mensaje = "Upps! Ha ocurrido un error contactate con el administrador"
    }
  }
}
