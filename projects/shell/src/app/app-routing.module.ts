import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/shared/src/lib/guard/auth.guard';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', loadChildren: () => import('mfeAccount/Module').then(m => m.AccountModule)},
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('mfeProfile/Module').then(m => m.ProfileModule)},
  { path: 'chat', canActivate: [AuthGuard], loadChildren: () => import('mfeChat/Module').then(m => m.ChatModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
