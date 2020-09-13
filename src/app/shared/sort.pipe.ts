import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';

@Pipe({
  name: 'sort'
}) 
export class SortPipe implements PipeTransform {

  transform(items: Array<any>, property:string): Array<Flight> {
    if (!items || items.length <= 1) {
      return items;
    }
    return items.sort((a: any, b: any) => b[property] - a[property]);
  }

}
