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
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .pipe(
          catchError((error) => {
            this.toastr.error("Problem on API side");
            return of(error);
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
    } else {
      this.toastr.error("Wrong email or password");
    }
  }

  private createRegisterForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;?/&gt;.&lt;,])(?!.*\\s).*$"
        ),
      ]),
    });
  }
}
