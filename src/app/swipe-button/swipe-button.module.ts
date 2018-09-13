import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeButtonComponent } from './swipe-button.component';
import { ButtonSliderDirective } from './button-slider.directive';
import { SwipeButtonService } from './swipe-button.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SwipeButtonComponent,
    ButtonSliderDirective,
  ],
  exports: [
    SwipeButtonComponent
  ],
  providers: [ SwipeButtonService ]

})
export class SwipeButtonModuleOrg { }
