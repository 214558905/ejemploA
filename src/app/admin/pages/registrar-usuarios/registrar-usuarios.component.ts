import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/admin.service';
import { Users } from 'src/app/models/users';
import { Subscription } from 'rxjs';
import { Roles } from 'src/app/models/roles';
import { Careers } from 'src/app/models/careers';
import { MessageService } from 'primeng/api';
import { CareerService } from '../../services/career.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalEditUsuariosComponent } from '../modal-edit-usuarios/modal-edit-usuarios.component';
import { RolService } from '../../services/rol.service';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.scss'],
  providers: [MessageService,DialogService],
})
export class RegistrarUsuariosComponent implements OnDestroy, OnInit {
  users!: Users[];
  rUsuario!: Users;
  roles!: Roles[];
  selectedCategories: any[] = [];
  userCreate:boolean=false;
  spinner: boolean = false;
  carrers!: Careers;
  carreras!:Careers[];
  selected:boolean=false;
  rolesU!: Roles[];
  selectedCareer:any
  selectedRol:any;
  idCarrera:string=''
  idRol:string=''
  ref!: DynamicDialogRef;
  errorMessage!:string;
  formularioValido:boolean=false;
  private subscription!: Subscription;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private usuarioS: UsuariosService,
    private careerS: CareerService,
    private dialogS: DialogService,
    private roleS: RolService,
    private errorS: ErrorService
  ) {
    
    
  }
  ngOnInit(): void {
    //this.getAllRol()
    this.getCareers()
    this.get()
    this.rUsuario = {
      name: '',
      lastname: '',
      cedula: '',
      email: '',
      idRol:'',
      idCareer: '',
      
    };
  }
  showDialog(id:string) {
    let user; 
    let carreras = this.carreras
    let message = this.messageService
    let roles = this.rolesU
    this.subscription = this.usuarioS.getOneUser(id).subscribe((data:Users)=>{
      user = data;
      this.ref = this.dialogS.open(ModalEditUsuariosComponent, {
        width: '60%',
        header: 'Editar Usuarios',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data:{user, carreras, message, roles}
      });
    })
    
  }
  getCareers(){
    this.subscription= this.careerS.getAllCareers().subscribe((data:Careers[])=>{
      this.carreras=data
    })
  }
  get() {
    this.subscription = this.usuarioS
      .getAllUsers()
      .subscribe((data: Users[]) => {
        this.users = data;
      });
  }
  
  getIdCareeer(career:Careers){
    if(!career){
      return this.idCarrera
    } else{
      return this.idCarrera= this.selectedCareer.careerId
    }
  }
  getIdRol(rol:Roles){
    if(!rol){
      return this.idRol
    } else{
      return this.idRol= this.selectedRol.idRol
    }
  }
  registrarUsuario() {
    this.rUsuario.idCareer= this.getIdCareeer(this.selectedCareer)
    this.spinner = true;
    this.subscription = this.usuarioS.registerUser(this.rUsuario).subscribe({
      next: ()=>{
          this.spinner = false;
          this.cleanUser()
          this.messageService.add({
            severity: 'success',
            summary: 'OK',
            detail: 'Usuario Creado',
          });
          this.get();
      },
      error: (e: HttpErrorResponse)=>{
        this.spinner = false;
        this.errorMessage = this.errorS.msgError(e)
        this.messageService.add({
          severity: 'warn',
          detail: this.errorMessage,
        });
      }
    });   
  }
  deleteUser(id: string) {
    this.subscription = this.usuarioS.deleteUser(id).subscribe(() => {
      this.get();
      this.messageService.add({
        severity: 'success',
        summary: 'OK',
        detail: 'El Usuario ha sido eliminado correctamente',
      });
    
    });
  }
  cleanUser(){
    this.userCreate=true
    this.rUsuario = {
      name: '',
      lastname: '',
      cedula: '',
      email: '',
      password: '',
      idRol:'',
      idCareer: '',
      
    };
    this.selectedCareer={
      name:''
    }
    this.selectedRol={
      name:''
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
/*   getAllRol(){
   this.subscription = this.roleS.getAllRol().subscribe((data:Roles[])=>{
    this.rolesU = data
   })
  } */

  getStatusUser(status: boolean) {
    switch (status) {
        case true:
            return 'success';
        case false:
            return 'warming';
    }
}
getNameStatus(status: boolean){
  switch (status) {
    case true:
        return 'Activo';
    case false:
        return 'Inactivo';
}
}


}
