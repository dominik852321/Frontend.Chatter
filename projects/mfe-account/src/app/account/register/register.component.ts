import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { map, of, switchMap, timer } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.createRegisterForm();
  }

  public createRegisterForm() {
    this.registerForm = this.fb.group({
      userName: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;?/&gt;.&lt;,])(?!.*\\s).*$"
          ),
        ],
      ],
    });
  }

  public onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigateByUrl("");
        this.toastr.success("Zarejestrowano pomyślnie");
      },
      (error) => {
        this.toastr.error("Niepoprawne dane");
      }
    );
  }
}
