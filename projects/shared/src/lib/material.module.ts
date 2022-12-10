import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
