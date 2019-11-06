import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HeaderComponent} from './shared/components/header/header.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './user/components/profil/profil.component';
import { NotifComponent } from './user/components/notif/notif.component';
import { FilterComponent } from './user/components/filter/filter.component';
import {GlobalConfigurationService} from './shared/services/globalConfiguration.service';
import {CompareItAPIService} from './shared/services/compareItAPI.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ModelComponent } from './admin/components/model/model.component';
import { ModelpropertyComponent } from './admin/components/model-property/model-property.component';
import {BasicAuthInterceptor} from './_helpers/basic-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    AdminComponent,
    ProfilComponent,
    NotifComponent,
    FilterComponent,
    LoginComponent,
    ModelComponent,
    ModelpropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    GlobalConfigurationService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: BasicAuthInterceptor,
          multi: true
      },
    CompareItAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
