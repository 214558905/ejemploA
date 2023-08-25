import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUsersService} from '../../services/auth-users.service'
import { Users } from 'src/app/models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = "http://localhost:3001/api/users"
  token:any;
  
  constructor(private http: HttpClient, private authS: AuthUsersService) {
    this.token=this.authS.getToken();
  }

  getAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.url + '/getallUsers');
  }
  registerUser(user: Users): Observable<any>{
    return this.http.post(this.url + '/signup', user)
  }
  deleteUser(id:string): Observable<any>{
    return this.http.delete(this.url+'/'+id)
  }
  getOneUser(id:string):Observable<Users>{
    return this.http.get<Users>(this.url+'/getOneUser/'+id)
  }
  editUser(id:any, user:Users):Observable<any>{
    return this.http.post(this.url+'/editUser/'+id, user)
  }
}
