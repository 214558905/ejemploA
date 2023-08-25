import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthUsersService } from '../services/auth-users.service';
import { NgForm } from '@angular/forms';
import { ChangePasswordService } from '../services/change-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnDestroy{
  subscriptions!: Subscription
  showPassword = false;
  showResetPassword =false
  contrasena!:string
  confirmContrasena!:string
  valido:boolean=false
  visible:boolean=false
  dir!:string;
  constructor(private changeS:ChangePasswordService,private ruta: ActivatedRoute){
    this.dir = this.ruta.snapshot.params['token'];
    console.log(this.dir)
  }
  changePassword(form:NgForm){
    if(form.valid && (this.contrasena===this.confirmContrasena) ){
      this.subscriptions= this.changeS.changePassword(this.contrasena, this.dir).subscribe(data=>{
        console.log('Hecho')
        this.visible=true
      }) 
    }
   
    
  }
    ngOnDestroy(): void {
      if(this.subscriptions){
        this.subscriptions.unsubscribe()
      }
    }
}
