import {
  Component,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService, ProfileService, UserProfile, User } from "@shared";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public currentProfile: UserProfile = new UserProfile();

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.createProfileForm();
    this.userService.currentUser$.subscribe((user: User) => {
      if (user) {
        this.getProfile(user);
      }
    });
    this.profileForm.get("userName").valueChanges.subscribe((userName) => {
      this.currentProfile.userName = userName;
    });
    this.profileForm.get("profession").valueChanges.subscribe((profession) => {
      this.currentProfile.profession = profession;
    });
  }

  public onUpdate() {
    let newProfile = new UserProfile();
    newProfile.id = this.currentProfile.id;
    newProfile.userName = this.getControlValue("userName");
    newProfile.email = this.getControlValue("email");
    newProfile.profession = this.getControlValue("profession");
    newProfile.education = this.getControlValue("education");
    newProfile.location = this.getControlValue("location");
    newProfile.skills = this.getControlValue("skills");
    newProfile.notes = this.getControlValue("notes");

    if (this.profileForm.valid) {
      this.profileService.updateProfile(newProfile).subscribe(
        (res) => this.toastr.success("Update user is complete!"),
        (err) => this.toastr.error("Error with update user")
      );
    }
  }

  private fillForm(user: UserProfile): void {
    this.profileForm.patchValue({
      userName: user.userName,
      profession: user.profession,
      email: user.email,
      education: user.education,
      location: user.location,
      skills: user.skills,
      notes: user.notes,
    });
  }

  private getControlValue(control: string) {
    return this.profileForm.get(control).value;
  }

  private getProfile(user: User){
    this.profileService.getProfile(user.id).subscribe((profile) => {
      this.currentProfile = profile;
      if (this.currentProfile) {
        this.fillForm(this.currentProfile);
      }
    });
  }

  private createProfileForm() {
    this.profileForm = new FormGroup({
      userName: new FormControl("", Validators.required),
      profession: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
      ]),
      education: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      skills: new FormControl("", Validators.required),
      notes: new FormControl("", Validators.required),
    });
  }
}
