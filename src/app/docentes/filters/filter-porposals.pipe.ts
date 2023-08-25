import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPorposals'
})
export class FilterPorposalsPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    if(arg === ''  || arg.length  <2) return value; 
    const resultPorposals = [];
    for(const porposal of value){
      if(porposal.nameEvent.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPorposals.push(porposal)
      }
    }
    return resultPorposals;
  }
  
}
