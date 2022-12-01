import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, JWTToken, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { catchError, of } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.createRegisterForm();
  }

  public onRegisterSubmit() {
    this.authService
      .register(this.registerForm.value)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.toastr.error(response.error.message);
          return of(response);
        })
      )
      .subscribe((token: JWTToken) => {
        if (token?.jwtToken !== undefined && token?.jwtToken !== "") {
          this.userService.getCurrentUser().subscribe((_) => {
            this.router.navigateByUrl("");
            this.toastr.success("Register succesful");
          });
        }
      });
  }

  private createRegisterForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
