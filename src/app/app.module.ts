import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HeaderComponent} from './shared/components/header/header.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './user/components/profil/profil.component';
import { NotifComponent } from './user/components/notif/notif.component';
import {GlobalConfigurationService} from './shared/services/globalConfiguration.service';
import {CompareItAPIService} from './shared/services/compareItAPI.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ModelComponent } from './admin/components/model/model.component';
import {BasicAuthInterceptor} from './_helpers/basic-auth.interceptor';
import { ProductComponent } from './product/product.component';
import {ResumeProductComponent} from './product/resume-product/resume-product.component';
import { FileSelectDirective } from 'ng2-file-upload';
import {SliderModule} from 'primeng/primeng';
import { FilterComponent } from './user/components/filter/filter.component';
import { GlobalConfigurationService} from './shared/services/globalConfiguration.service';
import { compareItAPIService} from './shared/services/compareItAPI.service';
import { FormsModule} from '@angular/forms';
import { SupplierComponent } from './supplier/supplier.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import {SliderModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    AdminComponent,
    ProfilComponent,
    NotifComponent,
    FileSelectDirective,
    LoginComponent,
    ModelComponent,
    ProductComponent,
    ResumeProductComponent,
    FilterComponent,
    SupplierComponent,
    FileSelectDirective,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SliderModule,
    ReactiveFormsModule
    SliderModule,
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
