import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Porposal } from 'src/app/models/porposal';

@Injectable({
  providedIn: 'root'
})
export class PorposalService {
  private url='http://localhost:3001/api/proposal'
  constructor(private http: HttpClient) { }

  createProposal(proposal:Porposal):Observable<any>{
    return this.http.post(this.url+'/createProposal',proposal)
  }
  getAllPorposal(id:string):Observable<any>{
    return this.http.get(this.url+'/getPorposal/'+id)
  }
  searchPorposal(id:string):Observable<any>{
    return this.http.get(this.url+'/searchPorposal/'+id)
  }
  searchParticipants(id:string):Observable<any>{
    return this.http.get(this.url+'/searchParticipants/'+id)
  }
  updadePorposal(id:string,data:Porposal):Observable<any>{
    return this.http.put(this.url+'/updatePorposal/'+id, data)
  }
  updadePorposalFileId(id:string,data:any):Observable<any>{
    return this.http.put(this.url+'/updatefileId/'+id, data)
  }
  searchHorario(id:string):Observable<any>{
    return this.http.get(this.url+'/searchHorario/'+id)
  }
  deletePorposal(id:string){
    return this.http.delete(this.url+'/deletePorposal/'+id)
  }
  
}
