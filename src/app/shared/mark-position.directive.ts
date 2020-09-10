import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMarkPosition]'
})
export class MarkPositionDirective implements OnInit {

  @Input('index') 
  private index: number;

  constructor(private elRef:ElementRef) { }

   ngOnInit() {
    console.log(this.index);
    switch(this.index) {
      case 0: this.elRef.nativeElement.style.color ='#FFD700'; break;
      case 1: this.elRef.nativeElement.style.color ='#C0C0C0'; break;
      case 2: this.elRef.nativeElement.style.color ='#CD7F32 '; break;
    }
   }

  

}
