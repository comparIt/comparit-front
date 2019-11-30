import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {ProfilComponent} from './user/components/profil/profil.component';
import {NotifComponent} from './user/components/notif/notif.component';
import {GlobalConfigurationService} from './shared/services/globalConfiguration.service';
import {CompareItAPIService} from './shared/services/compareItAPI.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ModelComponent } from './admin/components/model/model.component';
import { ModelpropertyComponent } from './admin/components/model-property/model-property.component';
import { UploadCsvComponent } from './upload/csv/csv.component';
import { UploadUrlComponent } from './upload/url/url.component';
import { DropdownModule } from 'primeng/dropdown';
import {ProductComponent} from './product/product.component';
import {ResumeProductComponent} from './product/resume-product/resume-product.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import {CheckboxModule} from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {BasicAuthInterceptor} from './_helpers/basic-auth.interceptor';
import {FileSelectDirective} from 'ng2-file-upload';
import {SliderModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/fileupload';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MessageService } from 'primeng/api';
import { MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';




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
    ModelpropertyComponent,
    UploadCsvComponent,
    UploadUrlComponent,
    ProductComponent,
    ResumeProductComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SliderModule,
    FileUploadModule,
    DropdownModule,
    ReactiveFormsModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    CheckboxModule,
    FileUploadModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    PanelModule
  ],
  providers: [
    GlobalConfigurationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    },
    CompareItAPIService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
