import { Events } from './../../../models/events';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { PorposalService } from '../../services/porposal.service';
import { Porposal } from 'src/app/models/porposal';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/docentes/services/events.service';
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileService } from '../../services/file.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-porposals',
  templateUrl: './porposals.component.html',
  styleUrls: ['./porposals.component.scss'],
  providers: [MessageService],
})
export class PorposalsComponent implements OnInit, OnDestroy {
  @ViewChild('generar', { static: false }) generar!: ElementRef;
  porposals: Porposal[] = [];
  events: Events[] = [];
  searchText = '';
  year!: Date;
  selectedEvent!: any;
  estado = ['En Revisión', 'Rechazado', 'Aprobado','Corregido'];
  subscriptions!: Subscription;
  visible: boolean = false;
  cronograma: boolean = false;
  yearCronograma!: Date;
  formEnviado: boolean = false;
  enviar = {
    state: '',
    comment: '',
  };
  meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  constructor(
    private porposalS: PorposalService,
    private eventS: EventsService,
    private messageService: MessageService,
    private fileS: FileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAllPorposals();
    this.getAllEvents();
    this.startTimer() 
  }
  startTimer() {
    setInterval(() => {
      this.getAllPorposals();
    }, 30000);
  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
  obtenerFecha(fechaCompleta: string): string {
    const fecha = new Date(fechaCompleta);
    const fechaSolo = fecha.toISOString().split('T')[0];
    return fechaSolo;
  }
  onHide() {
    this.enviar = {
      state: '',
      comment: '',
    };
  }
  validoCheck: boolean = false;
  checkPorposal(form: NgForm) {
    if (form.valid) {
      this.enviar = {
        state: this.actualPorposal.state,
        comment: this.actualPorposal.comment,
      };
      this.subscriptions = this.porposalS
        .checkPorposal(this.enviar, this.actualPorposal.porposalId)
        .subscribe(() => {
          this.getAllPorposals();
          this.visible = false;
          this.messageService.add({
            severity: 'success',
            summary: 'OK',
            detail: 'Propuesta Revisada',
          });
        });
    }
    this.validoCheck = true;
  }
  getStatusPorposal(status: string) {
    switch (status) {
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'warning';
      case 'En Revisión':
        return 'primary';
      case 'Corregido':
          return 'warning';
      default:
        return '';
    }
  }
  getAllPorposals() {
    this.subscriptions = this.porposalS.getAllPorposals().subscribe((data) => {
      this.porposals = data;
    });
  }
  getAllEvents() {
    this.subscriptions = this.eventS.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }
  actualPorposal!: any;
  showDialog(data: Porposal) {
    
    this.porposalS.getPorposalById(data.porposalId).subscribe(data=>{
      this.actualPorposal = data;
      this.visible = true;
    })
    
  }
  showDialogCronograma() {
    this.cronograma = true;
  }
  //-----------------------
  generarPdfReport(form: NgForm, tipo: string) {
    if (form.valid) {
      this.formEnviado = false;
      const date = this.getYearIntervalFromDate(this.yearCronograma);
      let dateS = {
        fechaInicio: date.fechaInicio,
        fechaFin: date.fechaFin,
      };
      this.subscriptions = this.porposalS
        .getPorposalsbyYear(dateS)
        .subscribe((data) => {
          this.porposalCro = data;
          if (data.length === 0) {
            this.messageService.add({
              severity: 'error',
              detail:
                'No hay eventos del año ' +
                this.getFormatDateYear(this.yearCronograma),
            });
          } else {
            setTimeout(() => {
              if (tipo === 'pdf') {
                this.fileS.crearPdf(this.generar).then((pdfOutput) => {
                  saveAs(pdfOutput, 'cronograma.pdf');
                });
              } else {
                const tableElement = document.getElementById('miTabla');
                let ws: XLSX.WorkSheet = XLSX.utils;
                const wb: XLSX.WorkBook = XLSX.utils.book_new();

                ws = XLSX.utils.table_to_sheet(tableElement, { origin: 'A3' });
                const columnWidths = [{ wch: 3 }, { wch: 12 }, { wch: 20 },{ wch: 20 },{ wch: 50 }];
                ws['!cols'] = columnWidths;
                const merge = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];
                ws['!merges'] = merge;
                ws['A1'] = { s: { bold: true }, alignment: { horizontal: 'center' } };
                ws['A1'] = { t: 's', v: 'CRONOGRAMA EDUCACIÓN CONTINUA ' +  this.getFormatDateYear(this.yearCronograma)};
                XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
                XLSX.writeFile(wb, 'reporte.xlsx');
              }
            }),
              1500;
          }
        });
    }
    this.formEnviado = true;
  }
  /* generateExcelReport(form: NgForm) {
    if (form.valid) {
      this.formEnviado = false;
      const tableElement = document.getElementById('miTabla');
      const title = XLSX.utils.aoa_to_sheet([['Título de la tabla']]);
      let ws: XLSX.WorkSheet = XLSX.utils;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      ws = XLSX.utils.table_to_sheet(tableElement, { origin: 'A3' });
      const columnWidths = [{ wch: 20 }, { wch: 20 }, { wch: 20 }];
      ws['!cols'] = columnWidths;
      const merge = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      ws['!merges'] = merge;
      ws['A1'] = { t: 's', v: 'Cronograma de eventos 2022' };
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
      XLSX.writeFile(wb, 'reporte.xlsx');
    }
    this.formEnviado = true;
  } */

  //----Eliminar----------
  pdfUrl!: SafeResourceUrl;
  verCronograma() {
    this.fileS.crearPdf(this.generar).then((pdfOutput) => {
      const pdfUrl = URL.createObjectURL(pdfOutput);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    });
  }
  porposalCro!: Porposal[];
  /* getPorposalsbyYear() {
    const date = this.getYearIntervalFromDate(this.yearCronograma);
    let dateS = {
      fechaInicio: date.fechaInicio,
      fechaFin: date.fechaFin,
    };
    this.porposalS.getPorposalsbyYear(dateS).subscribe((data) => {
      this.porposalCro = data;
      console.log(this.porposalCro);
    });
  } */
  getYearIntervalFromDate(date: Date): { fechaInicio: Date; fechaFin: Date } {
    const year = date.getFullYear();
    const fechaInicio = new Date(year, 0, 1); // 1 de enero del año
    const fechaFin = new Date(year, 11, 31); // 31 de diciembre del año

    return { fechaInicio, fechaFin };
  }
  getFormatDate(date: Date) {
    date = new Date(date);
    const mes = date.getMonth();
    return date.getDate() + ' de ' + this.meses[mes];
  }
  getFormatDateMonth(date: Date) {
    date = new Date(date);
    const mes = date.getMonth();
    return this.meses[mes];
  }
  getFormatDateYear(date: Date) {
    return date.getFullYear();
  }

  //------------------
}
