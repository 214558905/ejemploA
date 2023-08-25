import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private url = 'http://localhost:3001/api/files';
  constructor(private http: HttpClient) {}
  uploadFile(data:any):Observable<any>{
    return this.http.post(this.url+'/subir-archivo',data)
  }
  deleteFile(id:string):Observable<any>{
    return this.http.delete(this.url+'/deleteFile/'+id)
  }
  uploadFileEs(data:any):Observable<any>{
    return this.http.post(this.url+'/subir-archivoEs',data)
  }
  crearPdf(el:ElementRef): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        putOnlyUsedFonts: true,
      });
      const img = '../../../../assets/encabezado.png';
      const contenido = el.nativeElement; 
      doc.html(contenido, {
        callback: (doc) => {
          const totalPages = doc.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.addImage(img, 'PNG', 0, 0, 410, 45);
          }
          const pdfOutput = doc.output('blob');
          resolve(pdfOutput);
        },
        margin: [60, 50, 50, 50],
        autoPaging: 'text',
      });
    });
  }
  crearPdfPerfil(el:ElementRef): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        putOnlyUsedFonts: true,
      });
      const img = '../../../../assets/facilitador.png';
      const contenido = el.nativeElement; 
      doc.html(contenido, {
        callback: (doc) => {
          const totalPages = doc.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.addImage(img, 'PNG', 60, 10, 310, 57);
          }
          const pdfOutput = doc.output('blob');
          resolve(pdfOutput);
        },
        margin: [80, 50, 50, 50],
        autoPaging: 'text',
      });
    });
  }
  actualizarFileFacilitador(data:any,id:string):Observable<any>{
    return this.http.put(this.url+'/subir-archivoFacilitador/'+id,data)
  }
 
}
