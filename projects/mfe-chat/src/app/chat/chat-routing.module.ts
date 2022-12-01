import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';

const routes: Routes = [{ path: '', component: LeftSidebarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
