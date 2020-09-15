import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

  transform(items: Array<any>, property: string): Array<any> {
    if (!items || items.length === 0) return;

    return items.sort((a: any, b: any) => {
      if (a[property] === b[property]) return 0;
      if (a[property] > b[property]) return -1;
      return 1;
    });
  }

}
