import { Component,Output,EventEmitter } from '@angular/core';
import { SideBarService } from '../../services/side-bar.service';
import { AuthUsersService } from 'src/app/services/auth-users.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() valorEnviado = new EventEmitter<boolean>();
  showSidebar: boolean=false;
  mostrarIconos = false;
  isClicked: boolean=false;
  isHovered:  boolean=true;
  munuItems?:any[];
  constructor(private sidebarS: SideBarService, private authService: AuthUsersService){
    this.munuItems= this.sidebarS.menu;
  }
  ontap(){
    this.showSidebar=!this.showSidebar
    this.valorEnviado.emit(this.showSidebar);
    
  }
  toggleIconos() {
    this.mostrarIconos = !this.mostrarIconos;
    
  }
  
  logOut(){
    this.authService.logout()
  }
}
