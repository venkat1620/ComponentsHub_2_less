import { Component, ElementRef, Renderer2, Input, } from '@angular/core';

const TextItemsToBeShown = new Map<number, number>([
  [800, 3],
  [1200, 4],
  [1280, 4],
  [640, 3]
]);

@Component({
  selector: 'hammer-demo',
  templateUrl: './hammer-demo.component.html',
  styleUrls: ['./hammer-demo.component.less']
})
export class HammerDemoComponent {

  public isAnimating = false;
  public translateX = 0;

  @Input()
  public innerTextItems: number[];

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
    return this.innerTextItems.length * this.textItemsWidth;
  }

  private get maxTranslateX() {
    return -(this.textItemSliderWidth - (this.textItemsWidth * this.textItemsToBeShown));
  }

  public onPan(e) {

    this.translateX = this.previousSlideValue + e.deltaX;
    if (e.isFinal) {

      this.isAnimating = true;
      this.previousSlideValue += e.deltaX;

      if (this.previousSlideValue + e.deltaX > 0) {
        this.translateX = this.minTranslateX;
      } else if (this.previousSlideValue + e.deltaX < this.maxTranslateX) {
        this.translateX = this.maxTranslateX;
      } else {
        if (Math.abs(e.velocityX) > 1.5) {
          let widthToAdjust;
          if (e.velocityX < 0) {
            widthToAdjust = (this.previousSlideValue - e.deltaX) - (this.textItemsWidth *  this.textItemsToBeShown);
            this.translateX =  widthToAdjust < this.maxTranslateX ? this.maxTranslateX : widthToAdjust;
          } else {
            widthToAdjust = (this.previousSlideValue - e.deltaX) + (this.textItemsWidth *  this.textItemsToBeShown);
            this.translateX = widthToAdjust > this.minTranslateX ? this.minTranslateX : widthToAdjust;
          }
        } else if (Math.abs(e.deltaX) > this.textItemsWidth / 10) {
          if (e.deltaX < 0) {
            this.translateX = this.translateX - (this.textItemsWidth - Math.abs(e.deltaX));
          } else {
            this.translateX = this.translateX + (this.textItemsWidth - Math.abs(e.deltaX));
          }
        } else {
          this.translateX = this.translateX - e.deltaX;
        }
      }

      this.previousSlideValue = this.translateX;

      if (this.isAnimating) {
        const removeAnimation = setTimeout(() => {
          this.isAnimating = false;
          clearTimeout(removeAnimation);
        }, 500);
      }
    }
  }
}
