import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {UploadCsvComponent} from './admin/components/upload/csv/csv.component';
import {UploadUrlComponent} from './admin/components/upload/url/url.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {GlobalConfigurationService} from './shared/services/globalConfiguration.service';
import {ErrorComponent} from './shared/components/errors/error.component';
import {IsAuthenticatedGuardService} from './shared/services/is-authenticated-guard.service';
import {CompleteProductComponent} from './product/complete-product/complete-product.component';
import {FilterComponent} from './filter/filter.component';
import {IsAdminGuardService} from './shared/services/is-admin-guard.service';
import {CategoryNavigatorComponent} from './home/category-navigator/category-navigator.component';


export const routes: Routes = [
  {
    path: '',
    resolve: {
      config: GlobalConfigurationService
    },
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'error/:errorCode', component: ErrorComponent},
      {path: 'register', component: RegisterUserComponent},
      {
        path: 'products',
        children: [
          {path: ':type', component: ProductComponent},
          {path: ':type/:id', component: CompleteProductComponent},
        ]
      },
      {
        path: 'admin',
        canActivate: [IsAdminGuardService],
        children: [
          {path: 'website', component: AdminComponent},
          {path: 'upload/url', component: UploadUrlComponent},
          {path: 'upload/csv', component: UploadCsvComponent},
        ]
      },
      {
        path: 'user',
        canActivate: [IsAuthenticatedGuardService],
        children: [
          {path: 'filter', component: FilterComponent},
          {path: ':userid', component: UserComponent},
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GlobalConfigurationService],
})
export class AppRoutingModule {
}
