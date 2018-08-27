import { Component } from '@angular/core';
import { StateIndicatorAlignment } from './states-indicator/state-indicator.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'app';
    value = '123456789012345678901234567890123456789012345678901234567890';
    theme = 'caterpillar';

    isAlignedRight = true;
    autosState = true;
    alignment = StateIndicatorAlignment.Center;
    show = true;


    alignCenter = false;
    displayInCenter = true;

    left: boolean;
    right: boolean;


    constructor() {
      this.left = false;
      this.right = false;
    }

    showLeftSideIcon() {
      return this.left = !this.left;
    }

    showRighSideIcon() {
      return this.right = !this.right;
    }

    public clicked() {
      console.log('accepted');
    }
}
