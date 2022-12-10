import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { FindFriendsComponent } from "./components/find-friends/find-friends.component";
import { ListInviteComponent } from "./components/list-invite/list-invite.component";
import { MaterialModule } from "./material.module";
import { AuthService } from "./services/auth.service";
import { ChatService } from "./services/chat.service";
import { SignalrService } from "./services/signalr.service";
import { UserService } from "./services/user.service";
import { UpdatePhotoComponent } from "./components/update-photo/update-photo.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    FindFriendsComponent,
    ListInviteComponent,
    UpdatePhotoComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [AuthService, ChatService, SignalrService, UserService],
  exports: [
    FindFriendsComponent,
    ListInviteComponent,
    UpdatePhotoComponent,
    ToastrModule,
  ],
})
export class SharedModule {}
