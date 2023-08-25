import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from 'src/app/models/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private url = "http://localhost:3001/api/events"
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Events[]>{
    return this.http.get<Events[]>(this.url+'/getAllEvents')

  }
}
