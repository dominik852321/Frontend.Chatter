import { Component } from '@angular/core';
import { AccountService } from '@shared';
import { IUser } from 'projects/shared/src/lib/models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  public currentUser$: Observable<IUser>;

  constructor(private accountService: AccountService) { }

  public ngOnInit(): void {
   this.loadCurrentUser();
  }

  public loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
  }
}
