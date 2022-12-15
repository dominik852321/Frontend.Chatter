import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, JWTToken, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { catchError, of } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.createLoginForm();
  }

  public onLoginSubmit(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.toastr.error(response.error.message);
          return of(response);
        })
      )
      .subscribe((token: JWTToken) => {
        if (token?.jwtToken !== undefined && token?.jwtToken !== "") {
          this.userService.getCurrentUser()
          .subscribe((_) => {
            this.router.navigateByUrl("chat");
            this.toastr.success("Logged succesful");
          });
        }
      });
  }

  private createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
      ]),
      password: new FormControl("", Validators.required),
    });
  }
}
