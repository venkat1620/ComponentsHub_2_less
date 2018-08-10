import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosStateIndicatorComponent } from './autos-state-indicator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AutosStateIndicatorComponent],
  exports: [AutosStateIndicatorComponent]
})
export class AutosStateIndicatorModule { }
