import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {AuthenticationGuard} from "./guard/authentication.guard";

const routes: Routes =[
  {
    path: '',
    // canActivate: [AuthenticationGuard],
    redirectTo: 'dashboard',
    // redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginScreenComponent
  },
  {
    path: '',
    // canActivate: [AuthenticationGuard],
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
