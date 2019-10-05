import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/home',
    pathMatch: 'full',
  },
  {
    path: 'app/home',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
