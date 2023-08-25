import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearFilter'
})
export class YearFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(!arg) return value; 
    arg = new Date(arg)
    const resultPorposals = [];
    for(const porposal of value){
      if(porposal.datePresentation.indexOf(arg.getFullYear()) > -1){
        resultPorposals.push(porposal)
      }
    }
    return resultPorposals;
  }


}
