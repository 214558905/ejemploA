import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangePasswordService } from '../services/change-password.service';
import { NgForm } from '@angular/forms';
import { ErrorService } from '../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnDestroy {
  subscriptions!:Subscription
  correo!:string
  valido:boolean=false
  message!:string;
  error:boolean=false
  visible:boolean=false
  constructor(private resetS:ChangePasswordService,private errorS:ErrorService){

  }
  enviarEmail(form:NgForm){
    if(form.valid){
      this.resetS.sendEmail(this.correo).subscribe({
        next: (data) => {
            this.visible=true
        },
        error: (e: HttpErrorResponse) => {
          this.message = this.errorS.msgError(e);
          this.error = true;
          this.onisError();
        }
      })
    }
    this.valido=true
  }
  onisError(): void {
    setTimeout(() => {
      this.error = false;
    }, 10000);
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe()
    }
  }

}
