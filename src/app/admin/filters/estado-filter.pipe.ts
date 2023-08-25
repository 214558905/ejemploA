import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoFilter'
})
export class EstadoFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(!arg) return value; 
    const resultPorposals = [];
    for(const porposal of value){
      if(porposal.state.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPorposals.push(porposal)
      }
    }
    return resultPorposals;
  }

}
