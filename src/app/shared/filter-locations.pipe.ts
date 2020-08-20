import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLocations'
})
export class FilterLocationsPipe implements PipeTransform {

  transform(value: any, search: string): unknown {
    if (!search) { return value;}
    const solution = value.filter(l => {
        if (!l) {return; }
        return l.locationName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return solution;
  }

}
