import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMomentComponent } from './add-moment/add-moment.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './guard/authguard.guard'
import { RegisterComponent } from './register/register.component';
import {MomentlistComponent} from './momentlist/momentlist.component'

const routes: Routes = [
  {
    path:'',
    component:RegisterComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'moment/:id',
    component:AddMomentComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'momentlist',
    component:MomentlistComponent,
    canActivate:[AuthguardGuard]
  },
  { path:"**", component: RegisterComponent,pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
