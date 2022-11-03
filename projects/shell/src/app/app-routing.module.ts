import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', loadChildren: () => import('mfeProfile/Module').then(m => m.ProfileModule)},
  { path: 'account', loadChildren: () => import('mfeAccount/Module').then(m => m.AccountModule)},
  { path: 'chat', loadChildren: () => import('mfeChat/Module').then(m => m.ChatModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
