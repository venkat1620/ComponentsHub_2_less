import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerDemoComponent } from './hammer-demo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HammerDemoComponent],
  exports: [
    HammerDemoComponent
  ]
})
export class HammerDemoModule { }
