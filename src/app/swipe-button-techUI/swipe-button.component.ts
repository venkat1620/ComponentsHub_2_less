import { Component, OnInit, Input, HostBinding, ElementRef, Renderer2, OnDestroy, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'swipe-button-tech',
  templateUrl: './swipe-button.component.html',
  styleUrls: ['./swipe-button.component.less']
})
export class SwipeButtonComponent implements OnInit, OnDestroy {

  private startPosition = 0;
  private totalSlideDistance = 0;
  private hostEl;
  private listeners: Function[] = [];
  private defSliderLeftPos = 7;

  public reset: boolean;
  public textOpacity: number;
  public sliderLeftPos: number;

  @Input()
  public btnText = 'swipe to accept';

  @Input()
  public accptedText = 'accepted';

  @Input()
  public isDisabled = false;

  @Output()
  public click: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.accepted') public isAccepted: boolean;

  @HostBinding('class.active') public isActive: boolean;

  @HostBinding('class.disabled')
  public get disable(): boolean {
    return this.isDisabled;
  }

  constructor(private hostRef: ElementRef, private renderer: Renderer2) {
    this.hostEl = this.hostRef.nativeElement;
  }

  public ngOnInit() {
    this.listeners.push(
      this.renderer.listen('body', 'touchend', ($event) => {
        this.resetOrAccept($event);
      }),
      this.renderer.listen('body', 'touchmove', ($event) => {
        this.moveSlider($event);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.listeners.forEach(listenerFunc => listenerFunc());
  }

  public initSliderPosition(event) {
    if (this.isDisabled) { return; }
    this.isActive = true;
    this.totalSlideDistance = this.hostEl.clientWidth - this.hostEl.children['slider'].clientWidth;
    this.startPosition = event.touches[0].pageX;
    this.reset = false;
    if (this.totalSlideDistance > 0) {
      this.textOpacity = 1;
      this.sliderLeftPos = this.defSliderLeftPos;
    }
  }

  private resetOrAccept(event) {
    if (!this.isActive) { return; }
    this.isActive = false;
    const currentPosition = event.changedTouches[0].pageX;
    const relativePosition = currentPosition - this.startPosition;

    if (relativePosition - this.defSliderLeftPos < this.totalSlideDistance && !this.isAccepted) {
      this.reset = true;
       return;
    }

    if (this.totalSlideDistance > 0) {
      this.isAccepted = true;
      this.click.emit();
    }
  }

  private moveSlider(event) {
    if (!this.isActive) { return; }
    const currentPosition = event.changedTouches[0].pageX;
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
