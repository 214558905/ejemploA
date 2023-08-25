import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/auth.guard';
import { RegistrarUsuariosComponent } from './pages/registrar-usuarios/registrar-usuarios.component';
import { AdminComponent } from './admin.component';
import { PorposalsComponent } from './pages/porposals/porposals.component';
import { AgregarDatosComponent } from './pages/agregar-datos/agregar-datos.component';


const routes: Routes=[
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {
        path:'usuarios',
        component:RegistrarUsuariosComponent,
        data: {showSideBar:true},
      },
      {
        path:'porposals',
        component: PorposalsComponent,
      },{
        path:'agregarDatos',
        component:AgregarDatosComponent
      }
    ]
  }
]

@NgModule({
  declarations: [], 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule
  ],
  exports:[
  ]
})
export class AdminRouteModule { }
