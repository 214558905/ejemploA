import { mergeMap } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CareerService } from 'src/app/admin/services/career.service';
import { Careers } from 'src/app/models/careers';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilesService } from '../../services/files.service';
import { EventsService } from '../../services/events.service';
import { Events } from 'src/app/models/events';
import { Faculty } from 'src/app/models/faculty';
import { FacultyService } from '../../services/faculty.service';
import { Participants } from 'src/app/models/participants';
import { AuthUsersService } from 'src/app/services/auth-users.service';
import { Porposal } from 'src/app/models/porposal';
import { PorposalService } from '../../services/porposal.service';
import {ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from 'src/app/models/horario';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers:[ConfirmationService, MessageService],
})
export class EventosComponent implements OnInit {
  date: Date;
  actualDate!: Date;
  dateEvent!:Date;
  careers!: Careers[];
  subscriptions!: Subscription;
  items: any[] = [];
  uploadedFiles: any[] = [];
  pdfUrl!: SafeResourceUrl;
  name = 'Taller';
  activo: boolean = false;
  archivoSeleccionado: File | null = null;
  events!: Events[];
  faculties!: Faculty[];
  idUser!:string;
  valido:boolean=false
  participant: Participants={
    name:"",
    activities:"",
    position:"",
  }
  participants:Participants[]=[];
  proposal!: Porposal;
  selectedCareer:any;
  selectedFaculty:any;
  selectedEvent:any;
  idCareer='';
  idFaculty='';
  idEvent='';
  editar:boolean=false;
  dir=''
  dirC=''
  spinner:boolean=false;
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  formulario!:NgForm
  dateI!:Date;
  dateF!:Date;
  dialogH:boolean=false;
  horarioSingle:Horario={
    diaSemana: '',
    horaInicio: new Date ,
    horaFin: new Date,
  }
  horarios:Horario[]=[];
  errorMessage!:string;
  validoFD:boolean=false;
  validoFDE:boolean=false
  @ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('esquemaC', { static: false }) esquemaC!: ElementRef;

  constructor(
    private careerS: CareerService,
    private sanitizer: DomSanitizer,
    private eventS: EventsService,
    private facultyS: FacultyService,
    private authS: AuthUsersService,
    private proposalS: PorposalService,
    private fileS: FilesService,
    private messageService: MessageService,
    private router: Router,
    private ruta: ActivatedRoute,
    private confirmationService: ConfirmationService,
    
  ) {
    this.actualDate= new Date();
    this.date=new Date();
    this.dateEvent= new Date();
    this.proposal = this.porposalEmpty()
    this.dir = this.ruta.snapshot.params['rueda'];
    this.dirC= this.dir.replace(/crear/, '');
  }
  ngOnInit() {
    this.getIdUser()
    this.getEvents();
    this.getFaculties();
    this.getCareers();
    
    if(this.dir === 'crearPropuesta'){
      this.editar=false
      this.proposal = this.porposalEmpty()
    }else {
      this.subscriptions= this.proposalS.searchPorposal(this.dirC).subscribe(data=>{
        this.editar=true
        this.proposal=data
        this.dateI = new Date(this.proposal.dateEvent)
        this.dateF = new Date(this.proposal.dateFinEvent)
        this.getNameidCareer(this.proposal.careerId)
        this.getNameidEvent(this.proposal.eventId)
        this.getNameidFaculty(this.proposal.facultyId)
      })
      this.subscriptions= this.proposalS.searchHorario(this.dirC).subscribe(data=>{
        this.horarios= data
        this.proposal.horario = this.horarios
      })
      this.subscriptions= this.proposalS.searchParticipants(this.dirC).subscribe(data=>{
        this.participants=data
        console.log(this.dirC)
        this.proposal.participants=this.participants;
      })
    }

  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
  getdate(){
    const mes = this.dateEvent.getMonth()
    return this.dateEvent.getDate() +' de ' + this.meses[mes] +' del '+this.dateEvent.getFullYear()
  }
  getFormatDate(date:Date){
    const mes = date.getMonth() 
    return date.getDate() +' de ' + this.meses[mes] +' del '+date.getFullYear()
  }
  estado=false;
  getActualDate(){
    const mes = this.actualDate.getMonth()
    return this.actualDate.getDate() +' de ' + this.meses[mes] +' del '+this.actualDate.getFullYear()
  }
  getIdEvent(event:Events){
    if(!event){
      return this.idEvent
    } else{
      return this.idEvent= this.selectedEvent.eventId
    }
  }
  getIdCareeer(career:Careers){
    if(!career){
      return this.idCareer
    } else{
      return this.idCareer= this.selectedCareer.careerId
    }
  } 
  getIdFaculty(faculty:Faculty){
    if(!faculty){
      return this.idFaculty
    } else{
      return this.idFaculty= this.selectedFaculty.facultyId
    }
  }
  getIdUser(){
    this.subscriptions = this.authS.decodeToken().subscribe(data=>{
      this.idUser = data.id
      this.proposal.name = data.name + ' ' + data.lastname
    })
  }
  getEvents(){
    this.subscriptions = this.eventS.getAllEvents().subscribe(data=>{
      this.events= data
    })
  }
  getFaculties(){
    this.subscriptions = this.facultyS.getAllFalties().subscribe(data=>{
      this.faculties=data
    })
  }
  getCareers() {
    this.subscriptions = this.careerS.getAllCareers().subscribe((data) => {
      this.careers = data;
    });
  }
  eliminarP(index: number) {
    this.participants.splice(index, 1);
  }
  addP() {
    this.participants.push({ ...this.participant });
    this.participant.name=''
    this.participant.position=''
    this.participant.activities=''
  }
  porposalId!:string
  visible:boolean=false;
  enviarPropuesta(form:NgForm,formDi:NgForm,formDE:NgForm){
    if(form.valid && formDi.valid && formDE.valid){
      this.spinner=true
      this.crearPropuesta().then(()=>{
       this.spinner=false
       this.visible=true

      })
    }
    if(form.invalid){this.valido=true}
    if(formDi.invalid){this.validoFD=true}
    if(formDi.invalid){this.validoFDE=true}
   
    this.errorMessage='Revisa las Pestañas de color rojo'
    setTimeout(()=>{
      this.errorMessage=''
    },5000)
   
  }
  crearPropuesta(): Promise<void> {
    
    return new Promise((resolve, reject) => {
      const rueda = this.ruta.snapshot.params['rueda'];
      this.proposal.dateEvent = this.dateI;
      this.proposal.dateFinEvent = this.dateF;
      this.proposal.datePresentation = this.date;
      if (this.dir === 'crearPropuesta' || rueda.startsWith('crear')) {
        this.proposal.eventId = this.getIdEvent(this.selectedEvent);
        this.proposal.careerId = this.getIdCareeer(this.selectedCareer);
        this.proposal.facultyId = this.getIdFaculty(this.selectedFaculty);
        this.proposal.state = 'En Revisión'
        this.proposal.idUser = this.idUser;
        this.subscriptions = this.proposalS.createProposal(this.proposal).subscribe((data) => {
          this.porposalId = data;
        });
        this.fileS.crearPdf(this.el).then((pdfOutput) => {
          let fileId = {
            fileId: ''
          };
          const formData = new FormData();
          const timestamp = new Date().getTime();
          formData.append('archivo', pdfOutput, 'propuesta' + timestamp.toString() + '.pdf');
          this.subscriptions = this.fileS.uploadFile(formData).pipe(
            mergeMap((data) => {
              fileId.fileId = data;
              console.log(data);
              return this.proposalS.updadePorposalFileId(this.porposalId, fileId);
            })
          ).subscribe({
            error: (error) => {
              console.error('Ocurrió un error al ejecutar el método', error);
              reject(error);
            },
            complete: () => {
              console.log('El método se ejecutó correctamente');
              resolve();
            }
          });
        });
    
        this.fileS.crearPdf(this.esquemaC).then((pdfOutput) => {
          let fileEsquemaId = {
            fileEsquemaId: ''
          };
          const formData = new FormData();
          const timestamp = new Date().getTime();
          formData.append('archivo', pdfOutput, 'esquema' + timestamp.toString() + '.pdf');
          this.subscriptions = this.fileS.uploadFileEs(formData).pipe(
            mergeMap((data) => {
              fileEsquemaId.fileEsquemaId = data;
              console.log(data);
              return this.proposalS.updadePorposalFileId(this.porposalId, fileEsquemaId);
            })
          ).subscribe({
            error: (error) => {
              console.error('Ocurrió un error al ejecutar el método', error);
              reject(error);
            },
            complete: () => {
              console.log('El método se ejecutó correctamente');
              resolve();
            }
          });
        });
      }else{
        this.proposal.eventId = this.getIdEvent(this.selectedEvent)
        this.proposal.careerId = this.getIdCareeer(this.selectedCareer)
        this.proposal.facultyId = this.getIdFaculty(this.selectedFaculty)
        this.proposal.state = 'Corregido'
        this.proposal.idUser= this.idUser
        this.subscriptions= this.proposalS.updadePorposal(this.proposal.porposalId,this.proposal).subscribe()
        this.fileS.crearPdf(this.el).then((pdfOutput) => {
          let fileId = {
            fileId: ''
          };
          const formData = new FormData();
          const timestamp = new Date().getTime();
          formData.append('archivo', pdfOutput, 'propuesta' + timestamp.toString() + '.pdf');
          this.subscriptions = this.fileS.uploadFile(formData).pipe(
            mergeMap((data) => {
              fileId.fileId = data;
              console.log(data);
              return this.proposalS.updadePorposalFileId(this.proposal.porposalId, fileId);
            })
          ).subscribe({
            error: (error) => {
              console.error('Ocurrió un error al ejecutar el método', error);
              reject(error);
            },
            complete: () => {
              console.log('El método se ejecutó correctamente');
              resolve();
            }
          });
        }); 
        this.fileS.crearPdf(this.esquemaC).then((pdfOutput) => {
          let fileEsquemaId = {
            fileEsquemaId: ''
          };
          const formData = new FormData();
          const timestamp = new Date().getTime();
          formData.append('archivo', pdfOutput, 'esquema' + timestamp.toString() + '.pdf');
          this.subscriptions = this.fileS.uploadFileEs(formData).pipe(
            mergeMap((data) => {
              fileEsquemaId.fileEsquemaId = data;
              console.log(data);
              return this.proposalS.updadePorposalFileId(this.proposal.porposalId, fileEsquemaId);
            })
          ).subscribe({
            error: (error) => {
              console.error('Ocurrió un error al ejecutar el método', error);
              reject(error);
            },
            complete: () => {
              console.log('El método se ejecutó correctamente');
              resolve();
            }
          });
        });
      }
  
     
    });
  }
  

  crearPropuestaS() {
    const rueda = this.ruta.snapshot.params['rueda'];
    this.fileS.crearPdf(this.el).then((pdfOutput)=>{
      const formData = new FormData();
      const timestamp = new Date().getTime();
      formData.append('archivo', pdfOutput, 'propuesta'+timestamp.toString() +'.pdf');
      this.fileS.uploadFile(formData).subscribe(data=>{
        this.proposal.fileId = data
        console.log(this.proposal)
      })
    })
    this.fileS.crearPdf(this.esquemaC).then((pdfOutput)=>{
      const formData = new FormData();
      const timestamp = new Date().getTime();
      formData.append('archivo', pdfOutput, 'esquema'+timestamp.toString() +'.pdf');
        this.proposal.dateEvent = this.dateI
        this.proposal.dateFinEvent = this.dateF
        this.proposal.datePresentation=this.date
      if(this.dir ==='crearPropuesta' || rueda.startsWith('crear')){
        this.proposal.dateEvent = this.dateEvent
        this.proposal.eventId = this.getIdEvent(this.selectedEvent)
        this.proposal.careerId = this.getIdCareeer(this.selectedCareer)
        this.proposal.facultyId = this.getIdFaculty(this.selectedFaculty)
        this.proposal.idUser= this.idUser
        this.fileS.uploadFileEs(formData).pipe(
        mergeMap((data) => {
          this.proposal.fileEsquemaId = data;
          return this.proposalS.createProposal(this.proposal);
        })
      ).subscribe({
        next: ()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'OK',
            detail: 'Propuesta Creada Correctamente',
          });
          this.router.navigateByUrl('/docente/misPropuestas')

        }
      }) 
      
      }else{
       // this.fileS.deleteFile(this.proposal.porposalId)
        this.proposal.dateEvent = this.dateEvent
        this.proposal.eventId = this.getIdEvent(this.selectedEvent)
        this.proposal.careerId = this.getIdCareeer(this.selectedCareer)
        this.proposal.facultyId = this.getIdFaculty(this.selectedFaculty)
        this.proposal.idUser= this.idUser
        this.fileS.uploadFile(formData).pipe(
        mergeMap((data) => {
          this.proposal.fileId = data;
          return this.proposalS.updadePorposal(this.proposal.porposalId,this.proposal);
        })
      ).subscribe({
        next: ()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'OK',
            detail: 'Propuesta Editada correctamente',
          });
          this.router.navigateByUrl('/docente/misPropuestas')

        }
      }) 
      } 
    })
  } 
  mostrarPropuesta(){
    this.fileS.crearPdf(this.el).then((pdfOutput)=>{
      const pdfUrl = URL.createObjectURL(pdfOutput);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  })
  }
  mostrarEs(){
    this.fileS.crearPdf(this.esquemaC).then((pdfOutput)=>{
      const pdfUrl = URL.createObjectURL(pdfOutput);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  })
  }


  getNameidCareer(idCareer: string) {
    const carrera = this.careers.find(c => c.careerId === idCareer);
    if (carrera) {
      return this.selectedCareer=carrera;
    } else {
      return '';
    }
  }
  getNameidEvent(eventId: string) {
    const event = this.events.find(c => c.eventId === eventId);
    if (event) {
      return this.selectedEvent=event;
    } else {
      return '';
    }
  }
  getNameidFaculty(facultyId: string) {
    const faculty = this.faculties.find(c => c.facultyId === facultyId);
    if (faculty) {
      return this.selectedFaculty=faculty;
    } else {
      return '';
    }
  }
  dias=['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
  showDialogHorario() {  
    this.dialogH = true;
  }
  //--------------------
  getHour(date:any){
    let dateA = new Date(date)
    if(dateA.getMinutes()<10){
      return dateA.getHours() + ':0' + dateA.getUTCMinutes()
    }else{
      return dateA.getHours() + ':' + dateA.getUTCMinutes()
    }
  }
  addSchedule(){
      this.horarios.push({ ...this.horarioSingle });
      this.horarioSingle.diaSemana='' 
  }
  deleteSchedule(index: number){
    this.horarios.splice(index, 1);
  }
  //------------------- TO DO send to proposal service
   porposalEmpty(): Porposal{
    return {
      porposalId: '',
      nameEvent: '',
      titleEvent: '',
      provincia: '',
      canton: '',
      sector: '',
      institution: 'Universidad Iberoamericana del Ecuador',
      dateFinEvent: this.dateI,
      linkZoom: '',
      instroduction: '',
      justification: '',
      goals: '',
      generalObjective: '',
      specificObjective: '',
      objectivePublic: '',
      guests: '',
      dateEvent: this.dateF,
      contentEvent: '',
      duration: '',
      activitiesEvent: '',
      name: '',
      datePresentation: this.actualDate,
      participants: this.participants,
      idUser: this.idUser,
      fileId: '',
      careerId: '',
      facultyId: '',
      eventId: '',
      costo:'Gratuito',
      dirigidoA:'',
      habilidades:'',
      descriptionEvent:'',
      metodologiaE:'',
      evaluacion:'',
      facilitador:'',
      fileEsquemaId:'',
      horario:this.horarios
    }
   }
   //------------------------
   
}
