import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "@shared";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
      ]),
      password: new FormControl("", Validators.required),
    });
  }

  public onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigateByUrl("/");
        this.toastr.success('Zalogowano pomyślnie');
      },
      (error) => {
        this.toastr.error('Błędne dane');
        console.log(error);
      }
    );
  }
}
