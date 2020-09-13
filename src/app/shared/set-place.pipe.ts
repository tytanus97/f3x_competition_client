import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setPlace'
})
export class SetPlacePipe implements PipeTransform {

  transform(items: Array<any>, ...args: unknown[]): Array<any> {
    console.log(items);

    if(!items || items.length === 0) return;
    
    let p = 1;
    items[0].place = p;

    for(let i = 1;i<items.length;i++) {
      p += items[i].total < items[i-1].total? 1: 0;
      items[i].place = p;
    }
    
  return items; 
  }

}
