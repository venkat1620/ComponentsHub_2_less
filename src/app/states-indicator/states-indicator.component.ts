import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-states-indicator',
  templateUrl: './states-indicator.component.html',
  styleUrls: ['./states-indicator.component.less']
})
export class StatesIndicatorComponent implements OnInit {
  @Input() leftAutos: boolean;
  @Input() rightAutos: boolean;
  @Input() dualAutos: boolean;

  constructor() { }

  ngOnInit() {
  }

}
