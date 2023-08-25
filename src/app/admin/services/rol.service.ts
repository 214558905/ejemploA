import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from 'src/app/models/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = "http://localhost:3001/api/rols"
  constructor(private http: HttpClient) { }

  getAllRol():Observable<Roles[]>{
    return this.http.get<Roles[]>(this.url+'/getRols')
  }
}
