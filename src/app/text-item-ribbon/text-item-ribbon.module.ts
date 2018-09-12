import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextItemRibbonComponent } from './text-item-ribbon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextItemRibbonComponent],
  exports: [
    TextItemRibbonComponent
  ]
})
export class TextItemRibbonModule { }
