import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './utils/auth.guard';
import { LoggedGuard } from './utils/logged.guard';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';;
import { DocentesRouteModule} from './docentes/docentes-routing.module';
import { AdminRouteModule } from './admin/admin-route.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'director',
    component: DirectorComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'changePassword/:token',
    component:ChangePasswordComponent
  },
  {
    path:'recuperarContraseña',
    component:ForgetPasswordComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  DocentesRouteModule,
  AdminRouteModule
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
