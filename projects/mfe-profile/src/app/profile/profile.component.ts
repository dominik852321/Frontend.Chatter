import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService, User, UserProfile, UserPhoto, UserPasswordChange } from "@shared";
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
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.userService.currentUser$.subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
        this.createProfileForm();
      }
    });
  }

  public onUpdateProfile() {
    const newProfileInformation = {} as UserProfile;
    newProfileInformation.id = this.currentUser.id;
    newProfileInformation.userName = this.updateProfileForm.get('userName').value;

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
    newUserPassword.currentPassword = this.getValueForm('currentPassword').value;
    newUserPassword.newPassword = this.getValueForm('newPassword').value;
    newUserPassword.newPasswordConfirm = this.getValueForm('newPasswordConfirm').value;

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

  public onUpdatePhoto() {
    const newUserPhoto = {} as UserPhoto;
    newUserPhoto.id = this.currentUser.id;
    newUserPhoto.photo = this.getValueForm('photo').value;

    this.userService
      .updateUserPhoto(newUserPhoto)
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

  private createProfileForm() {
    this.updateProfileForm = new FormGroup({
      userName: new FormControl(this.currentUser.userName, Validators.required),
      photo: new FormControl("" , Validators.required),
      currentPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", Validators.required),
      confirmNewPassword: new FormControl("", Validators.required),
    });
  }

  private getValueForm(formControl: string) {
    return this.updateProfileForm.get(formControl).value;
  }
}
