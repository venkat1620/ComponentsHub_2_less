import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextItemRibbonComponent } from './text-item-ribbon.component';
import { TextItemComponent } from './text-item/text-item/text-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextItemRibbonComponent, TextItemComponent],
  exports: [
    TextItemRibbonComponent
  ]
})
export class TextItemRibbonModule { }
