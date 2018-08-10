import { Component } from '@angular/core';
import * as less from 'less';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'app';
    value = '123456789012345678901234567890123456789012345678901234567890';
    theme = 'caterpillar';
   
    autoSide = 'both';

    alignCenter = false;
    isAlignedRight = true;
    autosState = false;
    displayInCenter = true;


    toggleTheme() {
      this.theme = (this.theme === 'trimble') ? 'caterpillar' : 'trimble';
      less.modifyVars({
        '@theme': this.theme
      });
      // Have less refresh the stylesheets
      less.refreshStyles();
    }

    constructor() {
      less.watch();
    }
}
