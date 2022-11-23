import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FindFriendsComponent } from './components/find-friends/find-friends.component';
import { AuthService } from './services/auth.service';
import { BusyService } from './services/busy.service';
import { ChatService } from './services/chat.service';
import { ProfileService } from './services/profile.service';
import { SignalrService } from './services/signalR.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    FindFriendsComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
  }),
  ],
  providers: [
    AuthService,
    BusyService,
    ChatService,
    ProfileService,
    SignalrService,
    UserService
  ],
  exports: [
    FindFriendsComponent,
    ToastrModule
  ]
})
export class SharedModule { }
