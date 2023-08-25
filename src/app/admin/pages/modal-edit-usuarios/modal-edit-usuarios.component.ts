import { Component, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Careers } from 'src/app/models/careers';
import { Users } from 'src/app/models/users';
import { CareerService } from '../../services/career.service';
import { Roles } from 'src/app/models/roles';
import { UsuariosService } from '../../services/admin.service';
import { MessageService } from 'primeng/api';
import { RegistrarUsuariosComponent } from '../registrar-usuarios/registrar-usuarios.component';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-edit-usuarios',
  templateUrl: './modal-edit-usuarios.component.html',
  styleUrls: ['./modal-edit-usuarios.component.scss'],
  providers:[MessageService]
})
export class ModalEditUsuariosComponent implements OnDestroy{
  userCreate:boolean=false;
  
  rUsuario!:Users
  subscription!: Subscription;
  carreras!:Careers[];
  selectedCareer!: Careers;
  selectedRol!: Roles; 
  idRol: any
  idCarrera: any;
  roles!: Roles[];
  spinner: boolean = false;
  errorMessage!:string;
  validate: boolean = true;
  stateOptions2: any[] = [
    { label: 'Habilitado', value: true },
    { label: 'Inhabilitado', value: false}
  ];
  value!: boolean;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private userS: UsuariosService, private messageService: MessageService, private registerC: RegistrarUsuariosComponent,private errorS: ErrorService){
    this.carreras = this.config.data.carreras
    this.rUsuario = this.config.data.user
    this.idCarrera = this.config.data.user.idCareer
    this.getNameidCareer(this.idCarrera)
    this.messageService = this.config.data.message;
    
    
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getNameidCareer(idCareer: string) {
    const carrera = this.carreras.find(c => c.careerId === idCareer);
    if (carrera) {
      return this.selectedCareer=carrera;
    } else {
      return '';
    }
  }

  editarUsuario(){
    let id = this.rUsuario.idUser
    this.rUsuario.idCareer= this.getIdCareeer(this.selectedCareer)
    this.rUsuario.idRol= this.getIdRol(this.selectedRol)
    this.subscription = this.userS.editUser(id, this.rUsuario).subscribe({
      next: ()=>{
          this.registerC.get()
          this.spinner = false;
          this.ref.close()
          this.messageService.add({
            severity: 'success',
            summary: 'OK',
            detail: 'El Usuario fue actualizado correctamente',
          });
      },
      error: (e:HttpErrorResponse)=>{
        this.validate=false;
        this.spinner = false;
        this.errorMessage = this.errorS.msgError(e)
        this.messageService.add({
          severity: 'warn',
          detail: this.errorMessage,
        });
      }
    })  
  }
  getIdCareeer(career:Careers){
    
    if(!career){
      return this.idCarrera
    } else{
      return this.idCarrera= this.selectedCareer.careerId
    }
    
  }
  getIdRol(rol:Careers){
    
    if(!rol){
      return this.idRol
    } else{
      return this.idCarrera= this.selectedRol.idRol
    }
    
  }

}
