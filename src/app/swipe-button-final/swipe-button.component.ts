import { Component, OnInit, OnDestroy, ElementRef, Renderer2, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'swipe-button',
  templateUrl: './swipe-button.component.html',
  styleUrls: ['./swipe-button.less']
})
export class SwipeButtonComponent implements OnInit, OnDestroy {
  private startPosition = 0;
  private totalSlideDistance = 0;
  private isMouseDown = false;
  private hostEl;
  private listeners: Function[] = [];
  // default css property values of Swipe button
  private defSliderLeftPos = 7;

  public resetText: boolean;
  public resetSlider: boolean;
  public textOpacity: number;
  public sliderLeftPos: number;
  public selected = false;

  @Input()
  public btnText = 'swipe to accept' ;

  @Output()
  public click: EventEmitter<any> = new EventEmitter();

  constructor(private hostRef: ElementRef, private renderer: Renderer2) {
    this.hostEl = this.hostRef.nativeElement;
  }

  public ngOnInit() {
    this.listeners.push(
      this.renderer.listen('body', 'touchend', ($event) => {
        this.resetOrSelect($event);
      }),
      this.renderer.listen('body', 'touchmove', ($event) => {
        this.moveSlider($event);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.listeners.forEach(listenerFunc => listenerFunc());
  }

  public initSlider(event) {
    this.isMouseDown = true;
    this.totalSlideDistance = this.hostEl.clientWidth - this.hostEl.children['slider'].clientWidth;
    this.startPosition = event.clientX || event.touches[0].pageX;
    this.resetText = false;
    this.resetSlider = false;
    if (this.totalSlideDistance > 0) {
       this.textOpacity = 1;
       this.sliderLeftPos = this.defSliderLeftPos;
    }
  }

  private resetOrSelect(event) {
    if (!this.isMouseDown) { return; }
    this.isMouseDown = false;
    const currentPosition = event.clientX || event.changedTouches[0].pageX;
    const relativePosition = currentPosition - this.startPosition;

    if (relativePosition - this.defSliderLeftPos < this.totalSlideDistance && !this.selected) {
      this.resetSlider = true;
      this.resetText = true;
      return;
    }

    if (this.totalSlideDistance > 0) {
      this.selected = true;
      this.click.emit();
    }
  }

  private moveSlider(event) {
    if (!this.isMouseDown) { return; }
    const currentPosition = event.clientX || event.changedTouches[0].pageX;
    const relativePosition = currentPosition - this.startPosition;
    this.textOpacity = 1 - (relativePosition / this.totalSlideDistance);

    if (relativePosition <= 0) {
      this.sliderLeftPos = this.defSliderLeftPos;
      return;
    }

    if (relativePosition >= this.totalSlideDistance) {
      this.sliderLeftPos = this.totalSlideDistance;
      return;
    }

    this.sliderLeftPos = relativePosition;
  }
}
