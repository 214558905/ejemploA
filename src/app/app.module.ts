import { DocentesModule } from './docentes/docentes.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DirectorComponent } from './director/director.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { AdminModule } from "./admin/admin.module";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DirectorComponent,
        AdminComponent,
        HeaderComponent,
        NotPageFoundComponent,
        ChangePasswordComponent,
        ForgetPasswordComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        SharedModule,
        AdminModule
    ]
})
export class AppModule { }
