import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'autos-state-indicator',
  templateUrl: './autos-state-indicator.component.html',
  styleUrls: ['./autos-state-indicator.component.less']
})
export class AutosStateIndicatorComponent implements OnInit {

  @Input() public alignCenter: boolean;

  constructor() { }

  ngOnInit() {
  }

  /**
   * background image for the indicator
   */
  public get backgroundImage(): string {
      const path = 'assets/';
      return (this.alignCenter) ? path + 'autos-state-background.svg#image' : path + 'autos-state-background-left.svg#image';
  }

}
