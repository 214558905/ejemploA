import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeEventFilter'
})
export class TypeEventFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(!arg) return value; 
    const resultPorposals = [];
    for(const porposal of value){
      if(porposal.evento.name .toLowerCase().indexOf(arg.name.toLowerCase()) > -1){
        resultPorposals.push(porposal)
      }
    }
    return resultPorposals;
  }

}
