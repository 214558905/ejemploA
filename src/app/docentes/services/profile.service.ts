import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = "http://localhost:3001/api/users"
  constructor(private http:HttpClient) { }

  getOneUser(id:string):Observable<any>{
    return this.http.get(this.url+'/getOneUser/'+id)
  }
  updateProfile(data:any, idUser:string):Observable<any>{
    return this.http.put(this.url+'/updateProfile/'+idUser,data)
  }
}
