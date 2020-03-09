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
import {ModelpropertyComponent} from './admin/components/model-property/model-property.component';
import {ProductComponent} from './product/product.component';
import {ResumeProductComponent} from './product/resume-product/resume-product.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import {CheckboxModule} from 'primeng/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {BasicAuthInterceptor} from './_helpers/basic-auth.interceptor';
import {FileUploadModule} from 'primeng/fileupload';
import {RegisterUserComponent} from './register-user/register-user.component';
import {ConfirmDialogModule, MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {TopFilterComponent} from './product/top-filter/top-filter.component';
import {AbstractFilterComponent} from './product/abstract-filter/abstract-filter.component';
import {MultiSelectModule} from './shared/components/multiselect/multiselect.component';
import {SliderModule} from './shared/components/slider-filter/slider.component';
import {CategoryNavigatorComponent} from './home/category-navigator/category-navigator.component';
import {ErrorComponent} from './shared/components/errors/error.component';
import {LoginComponent} from './login/login.component';
import {ModelComponent} from './admin/components/model/model.component';
import {UploadCsvComponent} from './admin/components/upload/csv/csv.component';
import {UploadUrlComponent} from './admin/components/upload/url/url.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import {IsAuthenticatedGuardService} from './shared/services/is-authenticated-guard.service';
import {PaginatorModule} from './shared/components/paginator/paginator.component';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CompleteProductComponent} from './product/complete-product/complete-product.component';
import {FeatureSwitchComponent} from './admin/components/feature-switch/feature-switch.component';
import {DropdownModule} from './shared/components/dropdown/dropdown.component';
import {FilterComponent} from './filter/filter.component';
import {DetailFilterComponent} from './filter/detail-filter/detail-filter.component';
import {AddAlertComponent} from './shared/components/add-alert/addAlert';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MatomoModule} from 'ngx-matomo';
import { NgxHotjarModule } from 'ngx-hotjar';
import {IsAdminGuardService} from './shared/services/is-admin-guard.service';
import {MatomoService} from './shared/services/Matomo.service';
import {ManageUserComponent} from './admin/components/manager-user/manage-user.component';
import { ReviewProductComponent } from './product/review-product/review-product.component';
import {FieldsetModule} from 'primeng/fieldset';
import {ComparatorComponent} from './comparator/comparator.component';
import { NgxStarsModule } from 'ngx-stars';
import {FooterComponent} from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    AdminComponent,
    ProfilComponent,
    NotifComponent,
    LoginComponent,
    ModelComponent,
    ModelpropertyComponent,
    UploadCsvComponent,
    UploadUrlComponent,
    ProductComponent,
    ResumeProductComponent,
    RegisterUserComponent,
    TopFilterComponent,
    AbstractFilterComponent,
    CategoryNavigatorComponent,
    ResumeProductComponent,
    ErrorComponent,
    CompleteProductComponent,
    FeatureSwitchComponent,
    AddAlertComponent,
    FeatureSwitchComponent,
    FilterComponent,
    DetailFilterComponent,
    ReviewProductComponent,
    ManageUserComponent,
    ComparatorComponent,
    FooterComponent
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
    PanelModule,
    MultiSelectModule,
    InputSwitchModule,
    PaginatorModule,
    FileUploadModule,
    ConfirmDialogModule,
    AccordionModule,
    ToastModule,
    DialogModule,
    RadioButtonModule,
    NgxHotjarModule.forRoot('1640364'),
    MatomoModule,
    FieldsetModule,
    NgxStarsModule
  ],
  providers: [
    GlobalConfigurationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    },
    CompareItAPIService,
    IsAuthenticatedGuardService,
    IsAdminGuardService,
    ConfirmationService,
    MatomoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
