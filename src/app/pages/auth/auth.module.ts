import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {IonicModule} from '@ionic/angular';
import {AuthComponent} from './auth.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class AuthModule { }
