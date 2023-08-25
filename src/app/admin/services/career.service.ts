import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Careers } from 'src/app/models/careers';
import { Events } from 'src/app/models/events';
import { Faculty } from 'src/app/models/faculty';
import { Roles } from 'src/app/models/roles';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private url = "http://localhost:3001/api/careers"
  private urlF= "http://localhost:3001/api/faculties"
  private urlE = "http://localhost:3001/api/events"
  constructor(private http: HttpClient) { }

  getAllCareers():Observable<Careers[]>{
    return this.http.get<Careers[]>(this.url + '/getCareers');
  }
  createCareer(name:string){
    let data={
      name:name
    }
    return this.http.post(this.url+'/createCareer',data)
  }
  editCareer(id:string,name:string){

    let data={
      name:name
    }

    return this.http.put(this.url+'/editCareer/'+id,data)

  }

  getAllFaculties():Observable<Faculty[]>{
    return this.http.get<Faculty[]>(this.urlF + '/getAllFaculties');
  }
  createFaculty(name:string){
    let data={
      name:name
    }
    return this.http.post(this.urlF+'/createFaculty',data)
  }
  editFaculty(id:string,name:string){

    let data={
      name:name
    }

    return this.http.put(this.urlF+'/editFaculty/'+id,data)

  }

  //-------

  
  getAllEvents():Observable<Events[]>{
    return this.http.get<Events[]>(this.urlE + '/getAllEvents');
  }
  createEvent(name:string){
    let data={
      name:name
    }
    return this.http.post(this.urlE+'/createEvent',data)
  }
  editEvent(id:string,name:string){
    let data={
      name:name
    }
    return this.http.put(this.urlE+'/editEvent/'+id,data)

  }
}
