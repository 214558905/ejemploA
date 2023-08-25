import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ModalEditUsuariosComponent } from './pages/modal-edit-usuarios/modal-edit-usuarios.component';
import { RegistrarUsuariosComponent } from './pages/registrar-usuarios/registrar-usuarios.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PorposalsComponent } from './pages/porposals/porposals.component';
import { EstadoFilterPipe } from './filters/estado-filter.pipe';
import { TypeEventFilterPipe } from './filters/type-event-filter.pipe';
import { YearFilterPipe } from './filters/year-filter.pipe';
import { AgregarDatosComponent } from './pages/agregar-datos/agregar-datos.component';


@NgModule({
  declarations: [
    RegistrarUsuariosComponent,
    ModalEditUsuariosComponent,
    SidebarComponent,
    PorposalsComponent,
    EstadoFilterPipe,
    TypeEventFilterPipe,
    YearFilterPipe,
    AgregarDatosComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule, 
  ],
  exports:[
    ModalEditUsuariosComponent,
    RegistrarUsuariosComponent,
    SidebarComponent 
  ]
})
export class AdminModule { }
