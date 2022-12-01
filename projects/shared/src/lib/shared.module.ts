import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { FindFriendsComponent } from "./components/find-friends/find-friends.component";
import { AuthService } from "./services/auth.service";
import { ChatService } from "./services/chat.service";
import { ProfileService } from "./services/profile.service";
import { SignalrService } from "./services/signalr.service";
import { UserService } from "./services/user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ListInviteComponent } from './components/list-invite/list-invite.component';

@NgModule({
  declarations: [FindFriendsComponent, ListInviteComponent],
  imports: [
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    ChatService,
    ProfileService,
    SignalrService,
    UserService,
  ],
  exports: [FindFriendsComponent, ListInviteComponent, ToastrModule],
})
export class SharedModule {}
