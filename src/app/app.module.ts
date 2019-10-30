import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent} from './shared/components/header/header.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './user/components/profil/profil.component';
import { NotifComponent } from './user/components/notif/notif.component';
import { FilterComponent } from './user/components/filter/filter.component';
import { GlobalConfigurationService} from './shared/services/globalConfiguration.service';
import { compareItAPIService} from './shared/services/compareItAPI.service';
import { FormsModule} from '@angular/forms';
import { SupplierComponent } from './supplier/supplier.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';

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
    SupplierComponent,
    FileSelectDirective,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [GlobalConfigurationService, compareItAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
