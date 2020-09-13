import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMarkPosition]'
})
export class MarkPositionDirective implements OnInit {

  @Input('place') 
  private place: number;

  constructor(private elRef:ElementRef) { }

   ngOnInit() {
    switch(this.place) {
      case 1: this.elRef.nativeElement.style.color ='#FFD700'; break;
      case 2: this.elRef.nativeElement.style.color ='#C0C0C0'; break;
      case 3: this.elRef.nativeElement.style.color ='#CD7F32 '; break;
    }
   }

  

}
