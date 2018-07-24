import {Directive, OnInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Directive({
  selector:  '[toggleComponent]'
})
export class ToggleComponentDirective implements OnInit, OnDestroy {
  private globalClick: Observable<Event>;
  private subscribe;

  @Output('toggleComponent') toggleComponent: EventEmitter<Object>;

  constructor(private _elRef: ElementRef) {
     this.toggleComponent = new EventEmitter();
   }

  ngOnInit() {
    this.globalClick = fromEvent(document, 'click');
    this.subscribe = this.globalClick.subscribe((event: MouseEvent) => {
                        this.onGlobalClick(event);
                      });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  onGlobalClick(event: MouseEvent) {
    if (event instanceof MouseEvent) {
      if ( this.isDescendant(this._elRef.nativeElement, event.target) === true ) {
        this.toggleComponent.emit({
          target:  (event.target || null),
          value:  false
        });
      } else {
        this.toggleComponent.emit({
          target:  (event.target || null),
          value:  true
        });
      }
    }
  }

  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }
}

