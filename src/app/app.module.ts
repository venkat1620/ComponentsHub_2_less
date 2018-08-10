import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NumpadModule } from './numpad/numpad.module';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { StateIndicatorModule } from './states-indicator/state-indicator.module';
import { AutosStateIndicatorModule } from './autos-state-indicator/autos-state-indicator.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NumpadModule,
    StateIndicatorModule,
    AutosStateIndicatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
