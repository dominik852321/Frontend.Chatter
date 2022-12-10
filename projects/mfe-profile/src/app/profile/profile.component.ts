import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserService, User, UserProfile, UserPasswordChange } from "@shared";
import { ToastrService } from "ngx-toastr";
import { catchError, of } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class ProfileComponent implements OnInit {
  public updateProfileForm: FormGroup;
  public currentUser: User;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.updateProfileForm = this.fb.group({
      userName: ["", Validators.required],
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPasswordConfirm: ["", Validators.required],
    });
  }

  public ngOnInit(): void {
    // this.userService.currentUser$.subscribe((user: User) => {
    //   this.currentUser = user;
    //   this.fillProfileForm();
    // });

    //? not working
  }

  public onUpdateProfile() {
    const newProfileInformation = {} as UserProfile;
    newProfileInformation.id = this.currentUser.id;
    newProfileInformation.userName =
      this.updateProfileForm.get("userName").value;

    this.userService
      .updateUserProfile(newProfileInformation)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.toastr.error(response.error.message);
          return of(response);
        })
      )
      .subscribe((_) => {
        this.userService.getCurrentUser().subscribe();
        this.toastr.success("Update user is complete!");
      });
  }

  public onUpdatePassword() {
    const newUserPassword = {} as UserPasswordChange;
    newUserPassword.id = this.currentUser.id;
    newUserPassword.currentPassword =
      this.getValueForm("currentPassword").value;
    newUserPassword.newPassword = this.getValueForm("newPassword").value;
    newUserPassword.newPasswordConfirm =
      this.getValueForm("newPasswordConfirm").value;

    this.userService
      .updateUserPassword(newUserPassword)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.toastr.error(response.error.message);
          return of(response);
        })
      )
      .subscribe((_) => {
        this.toastr.success("Update password is changed!");
      });
  }

  private fillProfileForm() {
    this.updateProfileForm.setControl(this.currentUser.userName, "userName");
  }

  private getValueForm(formControl: string) {
    return this.updateProfileForm.get(formControl).value;
  }
}
