import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private resetToken!:any;
  urlUsers = 'http://localhost:3001/api/users';
  constructor(private http:HttpClient) { }


  changePassword(password:string,token:string):Observable<any> {
    let data = {
      newPassword:password ,
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reset', token);
      return this.http.put(this.urlUsers + '/resetPassword', data,{headers});
  }

  sendEmail(email:string):Observable<any>{
    let data={
      email:email
    }
    return this.http.post(this.urlUsers+'/sendlinkRecuperationPassword',data)
  }
}
