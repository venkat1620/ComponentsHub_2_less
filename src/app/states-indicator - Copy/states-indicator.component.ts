import { Component, OnInit, Input, OnChanges, ElementRef, Renderer2,
                  ViewChild, AfterViewInit, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'states-indicator',
  templateUrl: './states-indicator.component.html',
  encapsulation: ViewEncapsulation.None
})
export class StatesIndicatorComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() public side: string;
  @Input() public state: string;
  @Input() public autosSide: string;

  @ViewChild('leftright') leftRightSvgRef: ElementRef;
  @ViewChild('center') centerSvgRef: ElementRef;
  @ViewChild('stateContent') stateContentRef: ElementRef;

  private leftRightSvgEl: HTMLElement;
  private centerSvgEl: HTMLElement;
  private selectedSvgEl: HTMLElement;
  private stateContentEl: HTMLElement;
  private previousState: string;

  public showLeftSideIcon: boolean;
  public showRighSideIcon: boolean;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.side = this.side.toLocaleLowerCase() || 'left-down';
    this.state = this.state.toLocaleLowerCase() || 'manual';
    this.previousState = null;
  }

  ngAfterViewInit() {
    this.leftRightSvgEl = this.leftRightSvgRef.nativeElement;
    this.centerSvgEl = this.centerSvgRef.nativeElement;
    this.stateContentEl = this.stateContentRef.nativeElement;
    this.selectedSvgEl = this.side.includes('center') ? this.centerSvgEl : this.leftRightSvgEl;
    this.showBackGround(this.selectedSvgEl, this.side);
    this.alignStateContent();
    this.setStateClass();
  }

  private showBackGround(element: HTMLElement, side: string) {
    this.renderer.setStyle(element, 'display', 'block');
    this.renderer.addClass(element, side);
  }

  private alignStateContent() {
    this.renderer.setStyle(this.stateContentEl, 'height', this.selectedSvgEl.getBoundingClientRect().height + 'px');
    const bottom = this.side.includes('up') ?
                        this.selectedSvgEl.getBoundingClientRect().height + 1 :
                          this.selectedSvgEl.children[0].getBoundingClientRect().height + 1;
    this.renderer.setStyle(this.stateContentEl, 'bottom', bottom + 'px');
    this.renderer.setStyle(this.stateContentEl, 'fontSize', this.stateContentEl.getBoundingClientRect().width / 6 + 'px');
  }

  private setStateClass() {
      this.addRemoveClass(this.selectedSvgEl, this.previousState, this.state);
      this.addRemoveClass(this.stateContentEl.children['stateTxt'], this.previousState, this.state);
      this.previousState = this.state;
  }

  private addRemoveClass(element, classToRemove, classToAdd) {
    this.renderer.removeClass(element, classToRemove);
    this.renderer.addClass(element, classToAdd);
  }

  ngOnChanges(changes) {
    if (changes.state && !changes.state.firstChange) {
      this.setStateClass();
    }
    if ((changes.state || changes.autosSide) && this.side.includes('center') && this.state.includes('auto')) {
      this.showLeftSideIcon = (this.autosSide.toLocaleLowerCase() === 'left' || this.autosSide.toLocaleLowerCase() === 'both');
      this.showRighSideIcon = (this.autosSide.toLocaleLowerCase() === 'right' || this.autosSide.toLocaleLowerCase() === 'both');
    } else {
      this.showLeftSideIcon = false;
      this.showRighSideIcon = false;
    }
  }

  @HostListener('window:resize') onResize() {
    this.alignStateContent();
  }

}
