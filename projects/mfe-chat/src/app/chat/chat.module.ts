import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';

@NgModule({
  declarations: [
    ChatComponent,
    LeftSidebarComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
  ]
})
export class ChatModule { }
