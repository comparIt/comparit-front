import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {SupplierComponent} from './supplier/supplier.component';
import {UploadComponent} from './upload/upload.component';


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
    path      : 'app/supplier',
    component : SupplierComponent,
  },
  {
    path      : 'app/uploadCsv',
    component : UploadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
