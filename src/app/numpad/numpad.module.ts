import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumpadComponent } from './numpad.component';
import { NumpadBtnComponent } from './numpad-btn.component';
import { ToggleComponentDirective } from './toggle-component.directive';
import { CustomInputHostDirective } from './custom-input-host.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NumpadComponent,
    NumpadBtnComponent,
    ToggleComponentDirective,
    CustomInputHostDirective
  ],
  exports: [
    NumpadComponent,
    NumpadBtnComponent,
    ToggleComponentDirective,
    CustomInputHostDirective
  ],
})
export class NumpadModule { }
