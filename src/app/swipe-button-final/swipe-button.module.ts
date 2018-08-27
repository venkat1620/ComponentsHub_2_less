import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeButtonComponent } from './swipe-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SwipeButtonComponent,
  ],
  exports: [
    SwipeButtonComponent
  ]
})
export class SwipeButtonModule { }
