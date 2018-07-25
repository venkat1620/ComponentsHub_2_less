import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NumpadModule } from './numpad/numpad.module';
import { ButtonDemoComponent } from './button-demo/button-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NumpadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
