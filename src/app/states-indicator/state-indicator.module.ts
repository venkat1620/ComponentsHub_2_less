import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosStateIndicatorComponent } from './states-indicator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AutosStateIndicatorComponent
  ],
  exports: [
    AutosStateIndicatorComponent
  ]
})
export class AutosStateIndicatorModule { }
