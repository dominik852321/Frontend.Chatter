import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  UserService,
  User,
  ChangeUserName,
  UserPasswordChange,
  AuthService,
} from "@shared";
import { ToastrService } from "ngx-toastr";
import { catchError, finalize, map, Observable, of, tap } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class ProfileComponent implements OnInit {
  public updatePasswordForm: FormGroup;
  public currentUser$: Observable<User>;

  @ViewChild("userName") userName: ElementRef;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.updatePasswordForm = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPasswordConfirm: ["", Validators.required],
    });
  }

  public ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
  }

  public onUpdateProfile() {
    const userName = this.userName.nativeElement.value;
    if (userName.length === 0) {
      this.toastr.error("Please fill user name");
      return;
    }
    const changeUserName = {} as ChangeUserName;
    changeUserName.userName = userName;

    this.userService
      .updateUserProfile(changeUserName)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.toastr.error("Problem with update");
          return of(response);
        })
      )
      .subscribe((_) => {
        this.userService.getCurrentUser().subscribe();
        this.toastr.success("Update user is complete!");
      });
  }

  public onUpdatePassword() {
    if (this.updatePasswordForm.invalid) {
      this.toastr.error("Please fill all fields");
      return;
    }
    const newUserPassword = {} as UserPasswordChange;
    newUserPassword.currentPassword =
      this.updatePasswordForm.get("currentPassword").value;
    newUserPassword.newPassword =
      this.updatePasswordForm.get("newPassword").value;
    newUserPassword.newPasswordConfirm =
      this.updatePasswordForm.get("newPasswordConfirm").value;

    this.authService
      .updateUserPassword(newUserPassword)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.toastr.error(response?.error?.message);
          return of(response);
        })
      )
      .subscribe((_) => {
        this.userService.getCurrentUser().subscribe();
        this.toastr.success("Password was changed");
      });
  }
}
