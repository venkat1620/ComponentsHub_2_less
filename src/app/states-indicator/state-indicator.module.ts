import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatesIndicatorComponent } from './states-indicator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatesIndicatorComponent
  ],
  exports: [
    StatesIndicatorComponent
  ]
})
export class StateIndicatorModule { }
