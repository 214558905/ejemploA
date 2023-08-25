

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { DocentesComponent } from './docentes.component';
import { RouterModule } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';

import { ArchivosComponent } from './pages/archivos/archivos.component';
import { PropuestasCreadasComponent } from './pages/propuestas-creadas/propuestas-creadas.component';

import { FilterPorposalsPipe } from './filters/filter-porposals.pipe';
import { PerfilComponent } from './pages/perfil/perfil.component';

@NgModule({
  declarations: [
   DocentesComponent,
   SideBarComponent,
   EventosComponent,
   ArchivosComponent,
   PropuestasCreadasComponent,
   FilterPorposalsPipe,
   PerfilComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    
  ],
  exports: [ 
    DocentesComponent,
    SideBarComponent,
    EventosComponent
  ]
  
})
export class DocentesModule { }
