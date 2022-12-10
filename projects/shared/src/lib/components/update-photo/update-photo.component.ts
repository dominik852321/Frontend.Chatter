import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { UserPhoto } from '../../models/Dtos/user-photo-dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'lib-update-photo',
  templateUrl: './update-photo.component.html',
  styles: [""],
})
export class UpdatePhotoComponent implements OnInit {
  @Input() public currentUserId: string;
  
  // imageURL: string;
  // uploadForm: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private userService: UserService,
  //   private toastr: ToastrService
  // ) {
  //   this.uploadForm = this.fb.group({
  //     avatar: [null],
  //     name: ['']
  //   })
  // }

  ngOnInit(): void {
  }

  // // Image Preview
  // public showPreview(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.uploadForm.patchValue({
  //     avatar: file
  //   });
  //   this.uploadForm.get('avatar').updateValueAndValidity()
  //   // File Preview
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageURL = reader.result as string;
  //   }
  //   reader.readAsDataURL(file)
  // }
  // // Submit Form
  // public submit() {
  //   console.log(this.uploadForm.value)
  // }

  // public onUpdatePhoto() {
  //   const newUserPhoto = {} as UserPhoto;
  //   newUserPhoto.id = this.currentUserId;

  //   this.userService
  //     .updateUserPhoto(newUserPhoto)
  //     .pipe(
  //       catchError((response: HttpErrorResponse) => {
  //         this.toastr.error(response.error.message);
  //         return of(response);
  //       })
  //     )
  //     .subscribe((_) => {
  //       this.toastr.success("Update password is changed!");
  //     });
  // }

}
