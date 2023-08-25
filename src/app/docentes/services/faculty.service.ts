import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faculty } from 'src/app/models/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private url = "http://localhost:3001/api/faculties"
  constructor(private http:HttpClient) { }

  getAllFalties():Observable<Faculty[]>{
    return this.http.get<Faculty[]>(this.url+'/getAllFaculties')
  }
}
