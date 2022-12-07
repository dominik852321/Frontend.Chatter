import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService, ChatService, FindFriendsComponent, ListInviteComponent, MaterialModule, SignalrService, UserService } from "@shared";
import { ToastrModule } from "ngx-toastr";

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
    SignalrService,
    UserService,
  ],
  exports: [FindFriendsComponent, ListInviteComponent, ToastrModule],
})
export class SharedModule {}
