import { Directive, ElementRef, Renderer2, HostListener, OnInit, Input } from '@angular/core';
import { SwipeButtonService } from './swipe-button.service';

@Directive({
  selector: '[btnSlider]',
})
export class ButtonSliderDirective implements OnInit {

  @Input() public btnSlider: { [id: string]: HTMLElement };

  private startPosition: number;
  private totalSlideDistance: number;
  private isMouseDown: boolean;
  private hostEl;

  constructor(private hostRef: ElementRef, private renderer: Renderer2, private swipebuttonService: SwipeButtonService) {
    this.startPosition = 0;
    this.totalSlideDistance = 0;
    this.isMouseDown = false;
    this.hostEl = this.hostRef.nativeElement;
  }

  public ngOnInit() {
    this.renderer.listen('body', 'mouseup', ($event) => {
      this.resetOrSelect($event);
    });
    this.renderer.listen('body', 'touchend', ($event) => {
      this.resetOrSelect($event);
    });

    this.renderer.listen('body', 'mousemove', ($event) => {
      this.moveSlider($event);
    });
    this.renderer.listen('body', 'touchmove', ($event) => {
      this.moveSlider($event);
    });
  }

  @HostListener('mousedown', ['$event'])
  public onmousedown = ($event) => this.setInitialSliderData($event)

  @HostListener('touchstart' , ['$event'])
  public ontouchstart = ($event) => this.setInitialSliderData($event)

  private setInitialSliderData(event) {
    this.isMouseDown = true;
    this.totalSlideDistance =  this.hostEl.parentElement.clientWidth - this.hostEl.clientWidth;
    this.startPosition = event.clientX || event.touches[0].pageX;
    this.renderer.removeClass(this.btnSlider.textElm, 'resetText');
    this.renderer.removeClass(this.hostEl, 'resetSlider');
    this.renderer.setStyle(this.hostEl, 'left', 7 + 'px');
    this.renderer.setStyle(this.btnSlider.textElm, 'opacity', 1);
  }

  private resetOrSelect(event) {
    if (!this.isMouseDown) {  return; }
    this.isMouseDown = false;
    const currentPosition = event.clientX || event.changedTouches[0].pageX;
    const relativePosition = currentPosition - this.startPosition;

    if (relativePosition - 7 < this.totalSlideDistance && !this.hostEl.classList.contains('selected')) {
      this.renderer.addClass(this.btnSlider.textElm, 'resetText');
      this.renderer.addClass(this.hostEl, 'resetSlider');
      return;
    }

    this.renderer.addClass(this.hostEl, 'selected');
    this.renderer.removeClass(this.btnSlider.iconElm, 'icon-arrow-right');
    this.renderer.addClass(this.btnSlider.iconElm, 'icon-accept');

    // setTimeout(() => {
    //   const resetTouchendListener = this.renderer.listen(this.hostEl, 'click', ($event) => {
    //     this.reset(resetTouchendListener);
    //   });
    // }, 0);
  }

  private reset(resetListener) {
    if (!this.hostEl.classList.contains('selected')) { return; }
    this.renderer.removeClass(this.hostEl, 'selected');
    this.renderer.removeClass(this.btnSlider.iconElm, 'icon-accept');
    this.renderer.addClass(this.btnSlider.iconElm, 'icon-arrow-right');
    resetListener();
  }

  private moveSlider(event) {
    if (!this.isMouseDown) {  return; }
    const currentPosition = event.clientX || event.changedTouches[0].pageX;
    const relativePosition = currentPosition - this.startPosition;
    const slidePercent = 1 - (relativePosition / this.totalSlideDistance);

    this.renderer.setStyle(this.btnSlider.textElm, 'opacity', slidePercent);

    if (relativePosition <= 0) {
      this.renderer.setStyle(this.hostEl, 'left', 7 + 'px');
      return;
    }

    if (relativePosition >= this.totalSlideDistance) {
      this.renderer.setStyle(this.hostEl, 'left', this.totalSlideDistance + 'px');
      return;
    }

    this.renderer.setStyle(this.hostEl, 'left', relativePosition + 'px');
  }
}
