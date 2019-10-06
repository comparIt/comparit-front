import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HeaderComponent} from './shared/components/header/header.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './user/components/profil/profil.component';
import { NotifComponent } from './user/components/notif/notif.component';
import { FilterComponent } from './user/components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    AdminComponent,
    ProfilComponent,
    NotifComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
