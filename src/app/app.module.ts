import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NumpadModule } from './numpad/numpad.module';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { AutosStateIndicatorModule } from './states-indicator/state-indicator.module';
import { SwipeButtonModule } from './swipe-button-final/swipe-button.module';
import { HammerDemoModule } from './hammer-demo/hammer-demo.module';
import { TextItemRibbonModule } from './text-item-ribbon/text-item-ribbon.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NumpadModule,
    AutosStateIndicatorModule,
    AutosStateIndicatorModule,
    SwipeButtonModule,
    HammerDemoModule,
    TextItemRibbonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
