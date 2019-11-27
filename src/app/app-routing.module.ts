import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {UploadCsvComponent} from './upload/csv/csv.component';
import {UploadUrlComponent} from './upload/url/url.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {GlobalConfigurationService} from './shared/services/globalConfiguration.service';


export const routes: Routes = [
  {
    path      : '',
    redirectTo: 'app/home',
    pathMatch : 'full',
  },
  {
    path      : 'app/home',
    component : HomeComponent,
  },
  {
    path      : 'app/user/:userid',
    component : UserComponent,
  },
  {
    path      : 'app/admin/:userid',
    component : AdminComponent,

  },
  {
    path      : 'app/uploadUrl',
    component : UploadUrlComponent,
  },
  {
    path      : 'app/uploadCsv',
    component : UploadCsvComponent,
  },
  {
    path      : 'app/login',
    component : LoginComponent,
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
