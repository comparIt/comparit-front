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
import {LoginComponent} from './login/login.component';
import {ModelComponent} from './admin/components/model/model.component';
import {ModelpropertyComponent} from './admin/components/model-property/model-property.component';
import {UploadCsvComponent} from './admin/components/upload/csv/csv.component';
import {UploadUrlComponent} from './admin/components/upload/url/url.component';
import {DropdownModule} from 'primeng/dropdown';
import {ProductComponent} from './product/product.component';
import {ResumeProductComponent} from './product/resume-product/resume-product.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import {CheckboxModule} from 'primeng/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {BasicAuthInterceptor} from './_helpers/basic-auth.interceptor';
import {FileSelectDirective} from 'ng2-file-upload';
import {FileUploadModule} from 'primeng/fileupload';
import {TopFilterComponent} from './product/top-filter/top-filter.component';
import {AbstractFilterComponent} from './product/abstract-filter/abstract-filter.component';
import {MultiSelectModule} from './product/dropdown-filter/multiselect.component';
import {SliderModule} from './product/slider-filter/slider.component';



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
    TopFilterComponent,
    AbstractFilterComponent
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
    MultiSelectModule,
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
export class AppModule {
}
