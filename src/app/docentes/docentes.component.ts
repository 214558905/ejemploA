import { Component } from '@angular/core';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.scss']
})
export class DocentesComponent {
  valorRecibido!: boolean;

  recibirValor(valor: boolean) {
    this.valorRecibido = valor;
  }
}
