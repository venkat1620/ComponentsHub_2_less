import {  Component, Input, OnInit } from '@angular/core';
import { StateIndicatorAlignment, autosStateIndicatorBackground } from './state-indicator.model';

@Component({
  selector: 'autos-states-indicator',
  templateUrl: './states-indicator.component.html'
})
export class AutosStateIndicatorComponent implements OnInit {

  @Input()
  public isStateInAutos: boolean;

  @Input()
  public alignment: StateIndicatorAlignment;

  @Input()
  public alignRight: boolean;

  public backgroundImage: string;

  constructor() { }

  public ngOnInit() {
    this.backgroundImage = autosStateIndicatorBackground[this.alignment];
  }
}
