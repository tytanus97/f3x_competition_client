import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';

@Pipe({
  name: 'sortTotal'
})
export class SortTotalPipe implements PipeTransform {

  transform(flights: Array<Flight>, ...args: unknown[]): Array<Flight> {
    if (!flights) {
      return;
    }
    return flights.sort((a: Flight, b: Flight) => b.total - a.total);
  }

}
