import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthUsersService } from 'src/app/services/auth-users.service';
import { SideBarService } from '../../services/side-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnDestroy{
  @Output() valorEnviado = new EventEmitter<boolean>();
  showSidebar: boolean=false;
  mostrarIconos = false;
  isClicked: boolean=false;
  isHovered:  boolean=true;
  munuItems?:any[];
  name!:string;
  subscriptions!: Subscription
  constructor(private authService: AuthUsersService, private sidebarS: SideBarService){
    this.munuItems= this.sidebarS.menu;
  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
  ngOnInit() {
    this.getName()
  }
  ontap(){
    this.showSidebar=!this.showSidebar
    this.valorEnviado.emit(this.showSidebar);
    
  }
  toggleIconos() {
    this.mostrarIconos = !this.mostrarIconos;
    
  }
  getName(){
    this.subscriptions=  this.authService.decodeToken().subscribe(data=>{
      this.name= data.name +' '+ data.lastname
      //console.log(data)
    })
  }
  logOut(){
    this.authService.logout()
  }


}
