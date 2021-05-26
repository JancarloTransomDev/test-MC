import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin.component';
import {IonicModule} from '@ionic/angular';
import {UserEndpointService} from '../../services/endpoints/user-endpoint.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '../../interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    HttpClientModule
  ],
  providers: [
    UserEndpointService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AdminModule {
}
