import { Component, ElementRef, Input, OnInit, HostListener } from '@angular/core';
import { TextItem, textItemsCapacity } from './text-item-ribbon.registry';

@Component({
  selector: 'text-item-ribbon',
  templateUrl: './text-item-ribbon.component.html',
  styleUrls: ['./text-item-ribbon.component.less']
})
export class TextItemRibbonComponent implements OnInit {

  public isSliding = false;
  public sliderPosition = 0;

  @Input()
  public textItems: TextItem[];

  private sliderPrevPosition = 0;
  private sliderInitialPosition = 0;
  private maxSwipeVelocity = 1;
  private maxPanThreshold = 8;
  private textItemsCapacity = textItemsCapacity.get(window.innerWidth);

  constructor(private hostRef: ElementRef) {

  }

  @HostListener('pan', ['$event']) public onPan(event) {
     this.slideTextItems(event);
  }

  public ngOnInit() {
    this.markActiveTextItems();
  }

  public get textItemsWidth() {
    return this.hostRef.nativeElement.clientWidth / this.textItemsCapacity;
  }

  public get sliderWidth() {
    return this.textItems.length * this.textItemsWidth;
  }

  public resetSlider() {
    if (this.isSliding) {
      this.isSliding = false;
    }
  }

  private slideTextItems(event) {

    this.sliderPosition = this.sliderPrevPosition + event.deltaX;

    if (event.isFinal) {
      this.isSliding = true;
      this.sliderPrevPosition += event.deltaX;

      if (this.sliderPrevPosition + event.deltaX > this.sliderInitialPosition) {
        this.sliderPosition = this.sliderInitialPosition;
      } else if (this.sliderPrevPosition + event.deltaX < this.maxSliderPosition) {
        this.sliderPosition = this.maxSliderPosition;
      } else {
        this.calculateSliderPosition(event);
      }

      this.sliderPrevPosition = this.sliderPosition;
      this.markActiveTextItems();
    }
  }

  private calculateSliderPosition(event) {
    if (Math.abs(event.velocityX) >= this.maxSwipeVelocity) {
       this.sliderPositionOnSwipe(event);
    } else if (Math.abs(event.deltaX) > this.textItemsWidth / this.maxPanThreshold) {
       this.sliderPositionOnDrag(event);
    } else {
      this.sliderPosition = this.sliderPosition - event.deltaX;
    }
  }

  private sliderPositionOnSwipe(event) {
      let widthToAdjust;
      if (event.velocityX <= 0) {
        widthToAdjust = (this.sliderPrevPosition - event.deltaX) - (this.textItemsWidth *  this.textItemsCapacity);
        this.sliderPosition =  widthToAdjust < this.maxSliderPosition ? this.maxSliderPosition : widthToAdjust;
      } else {
        widthToAdjust = (this.sliderPrevPosition - event.deltaX) + (this.textItemsWidth *  this.textItemsCapacity);
        this.sliderPosition = widthToAdjust > this.sliderInitialPosition ? this.sliderInitialPosition : widthToAdjust;
      }
  }

  private sliderPositionOnDrag(event) {
    if (event.deltaX <= 0) {
      this.sliderPosition = this.sliderPosition - (this.textItemsWidth - Math.abs(event.deltaX));
    } else {
      this.sliderPosition = this.sliderPosition + (this.textItemsWidth - Math.abs(event.deltaX));
    }
  }

  private get maxSliderPosition() {
    return -(this.sliderWidth - (this.textItemsWidth * this.textItemsCapacity));
  }

  private markActiveTextItems() {
    const startingTextItem = Math.ceil((Math.abs(this.sliderPosition) / this.textItemsWidth));
    const endTextItem = startingTextItem + this.textItemsCapacity - 1;
    this.textItems.map((textItem, key) => {
       textItem.active = (key >= startingTextItem && key <= endTextItem) ? true : false;
    });

  }
}
