import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {UploadCsvComponent} from './admin/components/upload/csv/csv.component';
import {UploadUrlComponent} from './admin/components/upload/url/url.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import {GlobalConfigurationService} from './shared/services/globalConfiguration.service';
import {ErrorComponent} from './shared/components/errors/error.component';


export const routes: Routes = [
  {
    path      : '',
    redirectTo: 'home',
    pathMatch : 'full'
  },
  {
    path      : 'home',
    component : HomeComponent,
    resolve   : {
      config: GlobalConfigurationService
    }
  },
  {
    path      : 'user/:userid',
    component : UserComponent,
  },
  {
    path      : 'admin/website',
    component : AdminComponent,
    resolve   : {
      config: GlobalConfigurationService
    }

  },
  {
    path      : 'admin/upload/url',
    component : UploadUrlComponent,
  },
  {
    path      : 'admin/upload/csv',
    component : UploadCsvComponent,
  },
  {
    path      : 'login',
    component : LoginComponent,
  },
  {
    path      : 'error/:errorCode',
    component : ErrorComponent,
  },
  {
    path      : 'register-user',
    component : RegisterUserComponent,
  },
  {
    path      : 'products/:type',
    component : ProductComponent,
    resolve   : {
      config: GlobalConfigurationService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GlobalConfigurationService]
})
export class AppRoutingModule { }
