import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CareerService } from '../../services/career.service';
import { Careers } from 'src/app/models/careers';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Faculty } from 'src/app/models/faculty';
import { Events } from 'src/app/models/events';

@Component({
  selector: 'app-agregar-datos',
  templateUrl: './agregar-datos.component.html',
  styleUrls: ['./agregar-datos.component.scss'],
  providers: [MessageService],
})
export class AgregarDatosComponent implements OnDestroy, OnInit {
  careers!:Careers[]
  faculties!:Faculty[];
  events!:Events[]
  subscriptions!:Subscription
  displayDialog:boolean=false
  dialogF:boolean=false
  nombreCarrera:string='';
  nombreFaculty:string='';
  nombreEvent:string=''
  tipoEventC!:string
  validoForm:boolean=false
  errorMessage!:string
  actualFaculty!:Faculty;
  actualEvent!:Events
  dialogE:boolean=false
  constructor(private careerS:CareerService,private messageService: MessageService, private errorS:ErrorService){

  }
  ngOnInit(): void {
    this.getAllEvents()
    this.getAllFaculties()
    this.getAllCareers()
  }
  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe()
    }
  }
  actualCareer!:Careers
  openDialogCareer(header:string,career?:Careers){
    if(career){
      this.actualCareer=career
      this.nombreCarrera = career.name
    }
    this.tipoEventC=header
    this.displayDialog=true
  }
  openDialogE(header:string,event?:Events){
    if(event){
      this.actualEvent=event
      this.nombreEvent = event.name
    }
    this.tipoEventC=header
    this.dialogE=true
  }
  openDialogFaculty(header:string,faculty?:Faculty){
    if(faculty){
      this.actualFaculty=faculty
      this.nombreFaculty = faculty.name
    }
    this.tipoEventC=header
    this.dialogF=true
  } 
  onHide(){
    this.displayDialog=false
    this.dialogF=false
    this.dialogE=false
    this.nombreCarrera=''
    this.nombreFaculty=''
  }
  getAllFaculties(){
    this.subscriptions = this.careerS.getAllFaculties().subscribe(data=>{
      this.faculties = data
    }) 
  }
  getAllCareers(){
    this.subscriptions = this.careerS.getAllCareers().subscribe(data=>{
      this.careers = data
    })
  }
  getAllEvents(){
    this.subscriptions = this.careerS.getAllEvents().subscribe(data=>{
      this.events = data
    })
  }
  guardar(form:NgForm){
    if(form.valid){
      this.validoForm=false
      if(this.tipoEventC==='Nueva Carrera'){
        this.careerS.createCareer(this.nombreCarrera).subscribe({
          next:()=>{
            this.onHide()
            this.getAllCareers()
            this.messageService.add({
              severity: 'success',
              summary: 'OK',
              detail: 'Nueva Carrera Agregada',
            });
          },
          error:(e: HttpErrorResponse)=>{
            this.errorMessage = this.errorS.msgError(e)
            this.messageService.add({
              severity: 'warn',
              detail: this.errorMessage,
            });

          }
        })
      }else{
        if(this.actualCareer.careerId){
          this.careerS.editCareer(this.actualCareer.careerId,this.nombreCarrera).subscribe({
            next:()=>{
              this.onHide()
              this.getAllCareers()
              this.messageService.add({
                severity: 'success',
                summary: 'OK',
                detail: 'Carrera Editada',
              });
            },
            error:(e: HttpErrorResponse)=>{
              this.errorMessage = this.errorS.msgError(e)
              this.messageService.add({
                severity: 'warn',
                detail: this.errorMessage,
              });
  
            }
          })
        }
        
      }
     
    }else{
      this.validoForm=true
    }
   
  }

  guardarFaculty(form:NgForm){
    if(form.valid){
      this.validoForm=false
      if(this.tipoEventC==='Nueva Facultad'){
        this.careerS.createFaculty(this.nombreFaculty).subscribe({
          next:()=>{
            this.onHide()
            this.getAllFaculties()
            this.messageService.add({
              severity: 'success',
              summary: 'OK',
              detail: 'Nueva Facultad Agregada',
            });
          },
          error:(e: HttpErrorResponse)=>{
            this.errorMessage = this.errorS.msgError(e)
            this.messageService.add({
              severity: 'warn',
              detail: this.errorMessage,
            });

          }
        })
      }else{
        if(this.actualFaculty.facultyId){
          this.careerS.editFaculty(this.actualFaculty.facultyId,this.nombreFaculty).subscribe({
            next:()=>{
              this.onHide()
              this.getAllFaculties()
              this.messageService.add({
                severity: 'success',
                summary: 'OK',
                detail: 'Carrera Editada',
              });
            },
            error:(e: HttpErrorResponse)=>{
              this.errorMessage = this.errorS.msgError(e)
              this.messageService.add({
                severity: 'warn',
                detail: this.errorMessage,
              });
  
            }
          })
        }
        
      }
     
    }else{
      this.validoForm=true
    }
   
  }
  guardarEvent(form:NgForm){
    if(form.valid){
      this.validoForm=false
      if(this.tipoEventC==='Nuevo Evento'){
        this.careerS.createEvent(this.nombreEvent).subscribe({
          next:()=>{
            this.onHide()
            this.getAllFaculties()
            this.messageService.add({
              severity: 'success',
              summary: 'OK',
              detail: 'Nuevo Evento Agregado',
            });
          },
          error:(e: HttpErrorResponse)=>{
            this.errorMessage = this.errorS.msgError(e)
            this.messageService.add({
              severity: 'warn',
              detail: this.errorMessage,
            });

          }
        })
      }else{
        if(this.actualEvent.eventId){
          this.careerS.editEvent(this.actualEvent.eventId,this.nombreEvent).subscribe({
            next:()=>{
              this.onHide()
              this.getAllEvents()
              this.messageService.add({
                severity: 'success',
                summary: 'OK',
                detail: 'Evento Editado',
              });
            },
            error:(e: HttpErrorResponse)=>{
              this.errorMessage = this.errorS.msgError(e)
              this.messageService.add({
                severity: 'warn',
                detail: this.errorMessage,
              });
  
            }
          })
        }
        
      }
     
    }else{
      this.validoForm=true
    }
   
  }
}
