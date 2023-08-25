import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  constructor() { }
  menu : any[]=[
    {
      titulo:'Perfil',
      icono:'fa-solid fa-user fa-xl',
      url: 'mi-perfil',
    },
    {
      titulo:'Crear Propuesta',
      icono:'fa-solid fa-calendar-plus fa-xl',
      url: 'propuesta/crearPropuesta',
    },
    {
      titulo:'Mis Propuestas',
      icono:'fa-solid fa-eye fa-xl',
      url: 'misPropuestas',
    }
    
  ]
}

