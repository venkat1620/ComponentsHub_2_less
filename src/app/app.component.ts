import { Component } from '@angular/core';
import { StateIndicatorAlignment } from './states-indicator/state-indicator.model';
import { TextItem } from './text-item-ribbon/text-item-ribbon.registry';

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

    public textItems: TextItem[] = [ new TextItem(1),
                                     new TextItem(2),
                                     new TextItem(3),
                                     new TextItem(4),
                                     new TextItem(5),
                                     new TextItem(6),
                                     new TextItem(7),
                                     new TextItem(8),
                                     new TextItem(9),
                                     new TextItem(10),
                                     new TextItem(11),
                                     new TextItem(12),
                                     new TextItem(13),
                                     new TextItem(14),
                                    ];
                       // [ { text : 1 }, { text : 2 }, { text : 3 }, { text : 4 }, { text : 5 }, { text : 6 }, { text : 7 },
                       // { text : 8 }, { text : 9 }, { text : 10 }, { text : 11 }, { text : 12 }, { text : 13 }, { text : 14 }];
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
      this.textItems.push( new TextItem(this.textItems.length + 1) );
    }

    public updateVelocity(e) {
      this.velocity = e.velocityX;
    }
}
