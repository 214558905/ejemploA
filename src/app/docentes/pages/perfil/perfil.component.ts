import { Subscription, map, mergeMap } from 'rxjs';
import { Component, ElementRef, ViewChild, OnDestroy,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilesService } from '../../services/files.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProfileService } from '../../services/profile.service';
import { AuthUsersService } from 'src/app/services/auth-users.service';
import { Users } from 'src/app/models/users';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [MessageService],
})
export class PerfilComponent implements OnDestroy, OnInit {
  @ViewChild('contenidoProfile', { static: false }) contenidoProfile!: ElementRef;
  formEnviado = false;
  idUser!:string
  name2=""
  date: Date | undefined;
  usuarioData!:Users
  subsciptions!: Subscription
  existe:boolean=false;
  imagenURL: string | ArrayBuffer | null = null;
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  spinner=false;
  constructor(private fileS:FilesService,private sanitizer: DomSanitizer, private profileS: ProfileService,private authS:AuthUsersService,private http: HttpClient,private messageService: MessageService,
  
    ){
    
  }
  ngOnDestroy(): void {
    if(this.subsciptions){
      this.subsciptions.unsubscribe()
    }
  }
  ngOnInit(): void {
    this.getDataProfile()
  }
  
  submitForm(form: NgForm): void {
    if (form.valid) {
        this.spinner=true
        this.usuarioData.fechaNacimiento=this.date
        this.profileS.updateProfile(this.usuarioData,this.idUser).subscribe(data=>{
          this.fileS.crearPdfPerfil(this.contenidoProfile).then((pdfOutput)=>{
            const formData = new FormData();
            const timestamp = new Date().getTime();
            formData.append('archivo', pdfOutput, 'facilitador'+timestamp.toString() +'.pdf');
            this.subsciptions = this.fileS.actualizarFileFacilitador(formData,this.idUser).subscribe({
               next:()=>{
                this.getDataProfile()
                this.spinner=false;
                this.messageService.add({
                  severity: 'success',
                  summary: 'OK',
                  detail: 'Perfil Actualizado',
                });
               }
            })
          })
          
        }) 
    } else {
      this.formEnviado = true;
    }
  }
archivoSeleccionado: File | null = null;
  seleccionarImagen(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        this.usuarioData.foto = reader.result;
        
      };
      reader.readAsDataURL(archivo);
    }
  }
  pdfUrl!: SafeResourceUrl;
  verPerfil(){
    this.fileS.crearPdfPerfil(this.contenidoProfile).then((pdfOutput)=>{
      const formData = new FormData();
      const timestamp = new Date().getTime();
      formData.append('archivo', pdfOutput, 'facilitador'+timestamp.toString() +'.pdf');
      this.fileS.actualizarFileFacilitador(formData,this.idUser).subscribe(()=> {
        console.log('Hecho')
      })
    })
  }
  getDataProfile(){
   
   this.subsciptions=this.authS.decodeToken().pipe(mergeMap((data)=>{
    this.idUser=data.id
    return this.profileS.getOneUser(data.id)
   })).subscribe(data=>{
    this.usuarioData=data
    this.getFechaNacimiento(this.usuarioData.fechaNacimiento)
   })
 
  }
  getFechaNacimiento(date:any){
    if(!date){
      return
    }
    return this.date=new Date(date)
  }
  getFormatDate(date:Date){
    const mes = date.getMonth() 
    return date.getDate() +' de ' + this.meses[mes] +' del '+date.getFullYear()
  }
 
}
