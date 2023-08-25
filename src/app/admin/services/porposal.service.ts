import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Porposal } from 'src/app/models/porposal';

@Injectable({
  providedIn: 'root'
})
export class PorposalService {
  private url = "http://localhost:3001/api/proposal"
  constructor(private http: HttpClient) { }

  getAllPorposals():Observable<Porposal[]>{
    return this.http.get<Porposal[]>(this.url+'/getAllPorposals')
  }
  checkPorposal(data:any, id:string):Observable<any>{
    return this.http.put(this.url+'/checkPorposa/'+id,data)
  }
  getPorposalsbyYear(data:any):Observable<any>{
    return this.http.post(this.url+'/getPorposalByYear',data)
  }
  getPorposalById(id:string){
    return this.http.get(this.url+'/searchPorposal/'+id)
  }
}