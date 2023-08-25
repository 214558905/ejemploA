import { Component } from '@angular/core';
import { Eventos } from '../modelos/eventos';
import { AuthUsersService } from '../services/auth-users.service';


//Borrar--------------------------------------------
interface TipoEvento {
  name: string;
  code?: string;
}


//---------------------------------------------------

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent {
  tipoEventos: TipoEvento[] = []; //BORRAR
  selectedEvento!: TipoEvento; //BORRAR
  constructor(private loginService: AuthUsersService){

  }
  dialogVisible:boolean=false;
  eventoAc:Eventos={
    nombre:'',
      tipo:'',
      fecha:'',
      archivo:'',
      estado:''
  }
  eventoNuevo:Eventos={
    nombre:'',
      tipo:'',
      fecha:'',
      archivo:'',
      estado:''
  }
  eventos:Eventos[] =[
    {
      nombre:'Inteligencia Artificial',
      tipo:'taller',
      fecha:'22/3/2023',
      archivo:'vacio',
      estado:'aprovado'
    },
    {
      nombre:'Fundamentos de la programación',
      tipo:'curso',
      fecha:'22/3/2023',
      archivo:'vacio',
      estado:'rechazado'
    },
    {
      nombre:'Inteligencia Artificial',
      tipo:'taller',
      fecha:'22/3/2023',
      archivo:'vacio',
      estado:'aprovado'
    },
    {
      nombre:'Python',
      tipo:'curso',
      fecha:'22/3/2023',
      archivo:'vacio',
      estado:'rechazado'
    }
  ]
  


  
  ngOnInit() {
    this.tipoEventos= [ //BORRAR
        { name: 'Curso'},
        { name: 'Taller' },
        { name: 'Seminario'},
        { name: 'Webinar'},
    ];
}
  showDialog(evento:Eventos){
    this.eventoAc=evento;
    this.dialogVisible = true;
  }
  getColorTag(status: string){
    switch(status){
      case 'aprovado':
        return 'success';
      case 'rechazado':
        return 'danger';
    }
    return '';

  }

  getEstadoBoton(status: string){
    switch(status){
      case 'aprovado':
        return true;
      case 'rechazado':
        return false;
    }
    return false;
  }
  onLogout(): void{
    this.loginService.logout()
  }

}
