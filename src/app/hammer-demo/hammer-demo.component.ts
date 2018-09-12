import { Component, ElementRef, Input } from '@angular/core';

const TextItemsToBeShown = new Map<number, number>([
  [800, 3],
  [1200, 4],
  [1280, 4],
  [640, 3],
  [962, 3]
]);

@Component({
  selector: 'hammer-demo',
  templateUrl: './hammer-demo.component.html',
  styleUrls: ['./hammer-demo.component.less']
})
export class HammerDemoComponent {

  public isSliding = false;
  public translateX = 0;

  @Input()
  public textItems: number[];

  private previousSlideValue = 0;
  private textItemsToBeShown: number;
  private minTranslateX = 0;

  constructor(private hostRef: ElementRef) {
    this.textItemsToBeShown = TextItemsToBeShown.get(window.innerWidth);
  }

  public get textItemsWidth() {
    return this.hostRef.nativeElement.clientWidth / this.textItemsToBeShown;
  }

  public get textItemSliderWidth() {
    return this.textItems.length * this.textItemsWidth;
  }

  private get maxTranslateX() {
    return -(this.textItemSliderWidth - (this.textItemsWidth * this.textItemsToBeShown));
  }

  public slideTextItems(event) {
    this.translateX = this.previousSlideValue + event.deltaX;
    if (event.isFinal) {

      this.isSliding = true;
      this.previousSlideValue += event.deltaX;

      if (this.previousSlideValue + event.deltaX > 0) {
        this.translateX = this.minTranslateX;
      } else if (this.previousSlideValue + event.deltaX < this.maxTranslateX) {
        this.translateX = this.maxTranslateX;
      } else {
        if (Math.abs(event.velocityX) >= 1) {
          let widthToAdjust;
          if (event.velocityX < 0) {
            widthToAdjust = (this.previousSlideValue - event.deltaX) - (this.textItemsWidth *  this.textItemsToBeShown);
            this.translateX =  widthToAdjust < this.maxTranslateX ? this.maxTranslateX : widthToAdjust;
          } else {
            widthToAdjust = (this.previousSlideValue - event.deltaX) + (this.textItemsWidth *  this.textItemsToBeShown);
            this.translateX = widthToAdjust > this.minTranslateX ? this.minTranslateX : widthToAdjust;
          }
        } else if (Math.abs(event.deltaX) > this.textItemsWidth / 10) {
          if (event.deltaX < 0) {
            this.translateX = this.translateX - (this.textItemsWidth - Math.abs(event.deltaX));
          } else {
            this.translateX = this.translateX + (this.textItemsWidth - Math.abs(event.deltaX));
          }
        } else {
          this.translateX = this.translateX - event.deltaX;
        }
      }

      this.previousSlideValue = this.translateX;

      if (this.isSliding) {
        const removeAnimation = setTimeout(() => {
          this.isSliding = false;
          clearTimeout(removeAnimation);
        }, 600);
      }
    }
  }
}
