import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
      const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!isClickedInside) {
          this.clickOutside.emit(null);
      }
  }

}
