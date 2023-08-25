import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ConfirmationService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AddTokenInterceptor } from '../utils/add-token.interceptor';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { FooterComponent } from './footer/footer.component';

import { SelectButtonModule } from 'primeng/selectbutton';


const modulos = [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    RouterModule,
    TableModule,
    TagModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    RadioButtonModule,
    InputSwitchModule,
    TabViewModule,
    InputTextareaModule,
    FileUploadModule,
    FormsModule,
    SelectButtonModule
]

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    modulos
  ],
  exports: [
    modulos,
    FooterComponent
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi:true},
    ConfirmationService
  ]
})
export class SharedModule { }
