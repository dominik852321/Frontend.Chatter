import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared';

const routes: Routes = [
  { path: '', redirectTo: 'chat' },
  { path: 'account', loadChildren: () => import('mfeAccount/Module').then(m => m.AccountModule)},
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('mfeProfile/Module').then(m => m.ProfileModule)},
  { path: 'chat', canActivate: [AuthGuard], loadChildren: () => import('mfeChat/Module').then(m => m.ChatModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
