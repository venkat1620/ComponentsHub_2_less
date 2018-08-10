import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonDemoComponent implements OnInit {

  isDisabled: boolean;
  constructor() { }

  ngOnInit() {
    this.isDisabled = false;
  }

  toggle() {
    this.isDisabled = !this.isDisabled;
  }
}
