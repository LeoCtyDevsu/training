import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CustomTextAreaComponent } from './components/custom-text-area/custom-text-area.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { CustomLabelComponent } from './components/custom-label/custom-label.component';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox.component';
import { CustomCategoriesComponent } from './components/custom-categories/custom-categories.component';
import { CustomGalleryComponent } from './components/custom-gallery/custom-gallery.component';

@NgModule({
  declarations: [
    CustomButtonComponent,
    CustomInputComponent,
    SpinnerComponent,
    CustomTextAreaComponent,
    CustomSelectComponent,
    CustomLabelComponent,
    CustomCheckboxComponent,
    CustomCategoriesComponent,
    CustomGalleryComponent
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
