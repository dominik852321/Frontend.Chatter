import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, of } from "rxjs";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "lib-update-photo",
  templateUrl: "./update-photo.component.html",
  styles: [".file-input { display: none;}"],
})
export class UpdatePhotoComponent implements OnInit {
  @Input() public currentUser: User;
  @ViewChild("modalClose") modalClose;
  public newPhoto: File;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {}

  public showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newPhoto = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.currentUser.profilePictureUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  public onUpdatePhoto() {
    if (!this.newPhoto) {
      this.toastr.error("Please set new photo!");
      return;
    }

    this.userService
      .updateUserPhoto(this.newPhoto)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.toastr.error(response.error.message);
          return of(response);
        })
      )
      .subscribe((_) => {
        this.modalClose.nativeElement.click();
        this.toastr.success("Update photo is succesful!");
      });
  }
}
