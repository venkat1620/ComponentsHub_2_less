import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'swipe-button',
  templateUrl: './swipe-button.component.html',
})
export class SwipeButtonComponent implements OnInit, AfterViewInit {
  public btnElems: { [id: string]: HTMLElement } = {};

  @ViewChild('btnTxt') btnTxtRef: ElementRef;
  @ViewChild('btnIcon') btnIconRef: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.btnElems['textElm'] = this.btnTxtRef.nativeElement;
    this.btnElems['iconElm'] = this.btnIconRef.nativeElement;
  }
}
