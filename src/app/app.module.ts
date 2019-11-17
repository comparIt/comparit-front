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
import {TopFilterComponent} from './product/top-filter/top-filter.component';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MultiSelectModule} from './product/dropdown-filter/multiselect.component';
import {CheckboxModule} from 'primeng/primeng';



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
    LoginComponent,
    ModelComponent,
    ProductComponent,
    ResumeProductComponent,
    TopFilterComponent,
    FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiSelectModule,
    CheckboxModule
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
