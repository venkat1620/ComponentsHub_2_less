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

    public innerTextItems =  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    public velocity: number;

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
      this.innerTextItems.push(this.innerTextItems.length + 1);
    }

    public updateVelocity(e) {
      this.velocity = e.velocityX;
    }
}
