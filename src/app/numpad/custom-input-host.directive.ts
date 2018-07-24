import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[hostElement]'
})
export class CustomInputHostDirective implements OnInit {

  height: number;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
   // console.log(this.el.nativeElement.getBoundingClientRect());
  }

  setHostStyle(maxHeight) {
    // console.log(this.el.nativeElement.getBoundingClientRect());
    this.renderer.setStyle(this.el.nativeElement, 'max-height', maxHeight + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'auto');
  }

  getHostTop() {
   /* console.log(this.el.nativeElement.getBoundingClientRect().top +
                        (window.pageYOffset || document.documentElement.scrollTop)); */
    return this.el.nativeElement.getBoundingClientRect().top +
                        (window.pageYOffset || document.documentElement.scrollTop);
  }

  removeHostStyle() {
    this.renderer.removeStyle(this.el.nativeElement, 'max-height');
    this.renderer.removeStyle(this.el.nativeElement, 'overflow');
  }

  /* @HostListener('', ['$event.target']) onClick(target) {
    target.blur();
    target.select();
  }*/
}
