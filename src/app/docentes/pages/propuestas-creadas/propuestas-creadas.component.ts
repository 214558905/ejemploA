import { Subscription, map, switchMap } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthUsersService } from 'src/app/services/auth-users.service';
import { PorposalService } from '../../services/porposal.service';
import { Porposal } from 'src/app/models/porposal';
import { FilterPorposalsPipe } from '../../filters/filter-porposals.pipe';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-propuestas-creadas',
  templateUrl: './propuestas-creadas.component.html',
  styleUrls: ['./propuestas-creadas.component.scss'],
  providers:[MessageService]
})
export class PropuestasCreadasComponent implements OnInit, OnDestroy {
  @Output() valorEnviado = new EventEmitter<string>();
  private subscriptions!: Subscription;
  idUser: string = '';
  proposals!: Porposal[];
  searchText=''
  visible: boolean = false;
  position: string = 'center';
  confirmModal:boolean=false
  constructor(
    private authS: AuthUsersService,
    private proposalS: PorposalService,
    private router: Router,
    private messageService: MessageService,
  ) {}
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
  ngOnInit() {
    this.getPorposal();
    this.startTimer()
  }
  startTimer() {
    setInterval(() => {
      this.getPorposal();
    }, 30000);
  }
  getPorposal() {
    this.subscriptions = this.authS
      .decodeToken()
      .pipe(
        map((data) => {
          this.idUser = data.id;
          return data.id;
        }),
        switchMap((id) => this.proposalS.getAllPorposal(id))
      )
      .subscribe((data) => {
        this.proposals = data;
        console.log(this.proposals);
      });
  }
  obtenerFecha(fechaCompleta: string): string {
    const fecha = new Date(fechaCompleta);
    const fechaSolo = fecha.toISOString().split('T')[0];
    return fechaSolo;
  }
  getStatusPorposal(status: string) {
    switch (status) {
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'danger';
      case 'En Revisión':
        return 'primary';
      case 'Corregido':
          return 'warning';
      default:
        return '';
    }
  }
  actualPorposal:any;
  showDialog(position: string, actualPorposal:any) {
    this.position = position;
    this.visible = true;
    this.actualPorposal=actualPorposal
  } 
  editar(id:string){
    this.router.navigate(['/docente/propuesta/'+id])   
  } 
  duplicar(id:string){
    this.router.navigate(['/docente/propuesta/crear'+id])   
  } 
  actualPorposalDe!:Porposal;
  onHide(){
    this.confirmModal=false
  }
  openConfirmDialog(porposal:Porposal){
    this.actualPorposalDe=porposal
    this.confirmModal=true
 
  }
  deletePorposal(){
       this.subscriptions = this.proposalS.deletePorposal(this.actualPorposalDe.porposalId).subscribe({
      next:()=>{
        this.getPorposal();
        this.onHide()
        this.messageService.add({
          severity: 'success',
          summary: 'OK',
          detail: 'Propuesta Eliminada',
        });
      }
    })
  }
}
