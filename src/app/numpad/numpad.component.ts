import { Component, OnInit, ContentChild, ElementRef, Renderer2, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomInputHostDirective } from './custom-input-host.directive';
@Component({
  selector: 'num-pad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.less'],
})
export class NumpadComponent implements OnInit, AfterContentInit {

  @Input() public numValue: string;
  @Output() public numValueChange: EventEmitter<string>;
  @Input() public adjustMaxHeight: number;

  oldNumValue: string;

  keyValues: any[] = [
    { value: '1', disable: false },
    { value: '2', disable: false },
    { value: '3', disable: false },
    { value: '4', disable: false },
    { value: '5', disable: false },
    { value: '6', disable: false },
    { value: '7', disable: false },
    { value: '8', disable: false },
    { value: '9', disable: false },
    { value: '.', disable: false },
    { value: '0', disable: false },
    { value: '/', disable: false }];

  isNotNumBtn: boolean;

  showCustomKeyboard: boolean;

  textCaretStartPosition: number;

  startPosition: number;

  textCaretEndPosition: number;

  @ContentChild('inputEl') inputEl: ElementRef;

  private inputElStartPos: number;
  private parentElStartPos: number;
  private cursorPos: number;
  private cursorstartPos: number;



  private cursorElement;
  private inputElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2,
    private customInputDir: CustomInputHostDirective) {
    this.numValueChange = new EventEmitter<string>();
  }

  createTextCursor() {
    const parentElement = this.inputElement.parentElement;
    this.renderer.setStyle(parentElement, 'position', 'relative');

    this.cursorElement = this.renderer.createElement('span');
    this.renderer.addClass( this.cursorElement, 'text-cursor');
    this.renderer.setStyle( this.cursorElement, 'height', this.getStyle(this.inputElement, 'height') + 'px');
    const margintop = this.getStyle(this.inputElement, 'marginTop') + this.getStyle(this.inputElement, 'borderTop')
     + this.getStyle(this.inputElement, 'paddingTop');
    this.renderer.setStyle( this.cursorElement, 'marginTop', margintop + 'px');
    this.renderer.insertBefore(parentElement,  this.cursorElement , this.inputElement.nextElementSibling || this.inputElement.nextSibling);

    this.inputElStartPos = this.inputElement.getBoundingClientRect().left +
    (window.pageXOffset || document.documentElement.scrollLeft) +
    this.getStyle(this.inputElement, 'borderLeft') + this.getStyle(this.inputElement, 'paddingLeft');
    this.parentElStartPos = parentElement.getBoundingClientRect().left +
                                    (window.pageXOffset || document.documentElement.scrollLeft) || 0;
    this.cursorstartPos = this.inputElStartPos - this.parentElStartPos;
    this.getCharsWidth();
  }

  getCharsWidth() {
      console.log(this.getStyle(this.inputElement, 'width'));
      const hiddenElement = this.renderer.createElement('span');
      this.renderer.setStyle( hiddenElement, 'visibility', 'hidden');
      this.renderer.setStyle( hiddenElement, 'fontSize', this.getStyle(this.inputElement, 'fontSize') + 'px');
      this.renderer.setStyle( hiddenElement, 'fontFamily', getComputedStyle(this.inputElement).fontFamily );
      this.renderer.setStyle( hiddenElement, 'fontWeight', getComputedStyle(this.inputElement).fontWeight );
  }

  getStyle(element, style) {
    return parseFloat(getComputedStyle(element)[style].match(/(\d+(\.\d+)?)/g)[0]);
  }

  setTextCursor(event) {
    if (!this.numValue) {
      this.renderer.setStyle( this.cursorElement, 'left', this.cursorstartPos + 'px');
    } else {
      this.cursorPos = ((event.pageX - this.parentElStartPos) <= this.cursorstartPos) ?
                      this.cursorstartPos : event.pageX - this.parentElStartPos;
      this.renderer.setStyle( this.cursorElement, 'left', this.cursorPos + 'px');
    }
    this.renderer.setStyle( this.cursorElement, 'visibility', 'visible');
    console.log(this.parentElStartPos,  this.inputElStartPos, this.cursorPos);
  }

  ngOnInit() {
    this.isNotNumBtn = true;
    this.showCustomKeyboard = false;
    this.numValue = this.numValue || '';
    this.oldNumValue = '';
    this.adjustMaxHeight = this.adjustMaxHeight || 35;
  }

  ngAfterContentInit() {
    this.inputElement = this.inputEl.nativeElement;
    this.createTextCursor();
    this.renderer.listen(this.inputElement, 'click', ($event) => {
      console.log($event);
      this.setTextCaretPostion();
      this.setTextCursor($event);
    });
    this.renderer.listen(this.inputElement, 'touchend', () => {
      this.setTextCaretPostion();
    });
    this.renderer.listen(this.inputElement, 'select', () => {
      this.setTextCaretPostion();
    });
    this.renderer.listen(window, 'orientationchange', () => {
      this.customInputDir.removeHostStyle();
      this.findPositionOfInputEl();
    });
    this.renderer.setAttribute(this.inputElement, 'readonly', 'readonly');
  }

  setInputValue(key) {
    this.changeInputValue(this.startPosition, 0, key);
    this.startPosition = this.startPosition + 1;
  }

  delete() {
    if (this.startPosition > 0 || this.textCaretStartPosition !== this.textCaretEndPosition) {
      (this.textCaretStartPosition === this.textCaretEndPosition) ?
        (this.changeInputValue(this.startPosition - 1, 1, null), this.startPosition = this.startPosition - 1) :
        (this.changeInputValue(this.startPosition, this.textCaretEndPosition - this.startPosition, null),
          this.startPosition = this.startPosition);
      this.textCaretStartPosition = this.startPosition;
      this.textCaretEndPosition = this.startPosition;
    }
  }

  changeInputValue(startPosition, spliceNos, value) {
    const numValueArr = Array.from(this.numValue);
    numValueArr.splice(startPosition, spliceNos, value);
    this.numValue = numValueArr.join('');
    this.numValueChange.emit(this.numValue);
  }

  confirm() {
    this.showCustomKeyboard = false;
    this.customInputDir.removeHostStyle();
  }

  setTextCaretPostion() {
    this.textCaretStartPosition = this.inputElement.selectionStart;
    this.startPosition = this.textCaretStartPosition;
    this.textCaretEndPosition = this.inputElement.selectionEnd;
  }

  cancel() {
    this.numValue = this.oldNumValue;
    this.showCustomKeyboard = false;
    this.customInputDir.removeHostStyle();
    this.numValueChange.emit(this.numValue);
  }

  toggleKeyBoard(event: Object) {
    if (event) {
      if (event['value'] === true && this.showCustomKeyboard) {
        this.showCustomKeyboard = false;
        this.customInputDir.removeHostStyle();
      } else if (event['value'] === false && !this.showCustomKeyboard) {
        this.showCustomKeyboard = true;
        this.oldNumValue = this.numValue;
        this.findPositionOfInputEl();
      }
    }
  }

  findPositionOfInputEl() {
    setTimeout(() => {
      const inputRect = this.inputElement.getBoundingClientRect();
      const numpadContainerEl = this.elRef.nativeElement.querySelector('#numpadContainer');
      if (numpadContainerEl) {
        const numpadContainerElRect = numpadContainerEl.getBoundingClientRect();
        if ((inputRect.bottom + 20) >= numpadContainerElRect.top) {
          let maxHeight = (numpadContainerElRect.top - this.adjustMaxHeight) - this.customInputDir.getHostTop();
          maxHeight = (maxHeight <= inputRect.height + 20) ? inputRect.height + 20 : maxHeight;
          this.customInputDir.setHostStyle(maxHeight);
          this.inputElement.scrollIntoView();
        }
      }
    });
  }
}
