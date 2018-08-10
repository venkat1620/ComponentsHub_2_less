import {
  Component, OnInit, Input, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'states-indicator',
  templateUrl: './states-indicator.component.html',
  encapsulation: ViewEncapsulation.None
})
export class StatesIndicatorComponent implements OnInit {

  @Input() public autosState: boolean;
  @Input() public autosSide: string;
  @Input() public displayInCenter: boolean;
  @Input() public isAlignedRight: boolean;

  constructor() { }

  ngOnInit() { }

  /**
   * background image for the indicator
   */
  public get backgroundImage(): string {
    const path = 'assets/';
    return (this.displayInCenter) ? path + 'autos-state-background.svg#image' : path + 'autos-state-background-left.svg#image';
  }

  public get showLeftSideIcon(): boolean {
    return false;
  }
  public get showRighSideIcon(): boolean {
    return false;
  }
}
