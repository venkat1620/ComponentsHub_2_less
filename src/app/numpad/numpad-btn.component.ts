import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'numpad-btn',
  templateUrl: './numpad-btn.component.html',
  styleUrls: ['./numpad-btn.component.less']
})
export class NumpadBtnComponent {

  @Input('isNotNumBtn') isNotNumBtn: boolean;
  @Output('btnClicked')  btnClicked = new EventEmitter<void>();
  @Input('disableBtn') disableBtn: boolean;

  constructor() { }

  clicked() {
   this.btnClicked.emit();
  }
}
