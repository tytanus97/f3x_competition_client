import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowTable]'
})
export class ShowTableDirective {

  constructor(private elementRef: ElementRef) { }


  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLSpanElement) {
    console.log('klik');
    console.log(target.parentElement);
    const right = document.getElementById('show');
    const down = document.getElementById('hide');

    if (this.elementRef.nativeElement.contains(target)) {
      if (target.id === 'hide') {
        target.style.display = 'none';
        right.style.display = 'block';
      } else if (target.id === 'show') {
        target.style.display = 'none';
        down.style.display = 'block';
      }
    }
  }
}
