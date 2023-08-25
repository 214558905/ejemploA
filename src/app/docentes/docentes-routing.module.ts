import { RouterModule, Routes} from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesComponent } from './docentes.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { PropuestasCreadasComponent } from './pages/propuestas-creadas/propuestas-creadas.component';
import { AuthGuard } from '../utils/auth.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes=[
  {
    path: 'docente',
    component: DocentesComponent,
    children: [
      {
        path: 'propuesta/:rueda',
        component: EventosComponent
    
      },
      {
        path: 'misPropuestas',
        component: PropuestasCreadasComponent
      },
      {
        path: 'mi-perfil',
        component: PerfilComponent
      }
    ],
    //canActivate: [AuthGuard]

  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule
  ]
})
export class DocentesRouteModule { }
