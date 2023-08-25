import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  menu : any[]=[
  {
    titulo:'Gestionar Usuarios',
    icono:'fa-solid fa-users fa-xl',
    url: 'usuarios',
  },
  {
    titulo:'Propuestas',
    icono:'fa-regular fa-calendar fa-xl',
    url:'porposals'
  },{
    titulo:'Datos',
    icono:'fa-solid fa-gear fa-xl',
    url:'agregarDatos'
  }
]
}
