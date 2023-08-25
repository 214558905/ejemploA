import { Component } from '@angular/core';
import { Users } from '../models/users';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  /* template: `
  <app-registrar-usuarios (valorEnviado)="recibirValor($event)"></app-registrar-usuarios>
  ` */
})
export class AdminComponent {
  users!: Users[];
  constructor(private route: ActivatedRoute, private usuarioS: UsuariosService){
  }
  valorRecibido!: boolean;

  recibirValor(valor: boolean) {
    this.valorRecibido = valor;
  }
  
}
