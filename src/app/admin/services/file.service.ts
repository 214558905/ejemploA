import { ElementRef, Injectable } from '@angular/core';
import jsPDF from 'jspdf';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  crearPdf(el:ElementRef): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF({
        orientation: 'l',
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
            doc.addImage(img, 'PNG', 130, 0, 410, 45);
          }
          const pdfOutput = doc.output('blob');
          resolve(pdfOutput);
        },
        margin: [50, 20, 60, 50],
        autoPaging: 'text',
      });
    });
  }
}
