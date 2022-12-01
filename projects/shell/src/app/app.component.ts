import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, of } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  public currentUser$: Observable<User>;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {}

  public ngOnInit(): void {
    this.loadCurrentUser();
  }

  public loadCurrentUser() {
    this.userService
      .getCurrentUser()
      .pipe(
        catchError((error) => {
          this.toastr.error("Problem on API side");
          return of(error);
        })
      )
      .subscribe((_) => {
        this.currentUser$ = this.userService.currentUser$;
      });
  }
}
