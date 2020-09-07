import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';
import { Pilot } from '../models/Pilot';

@Pipe({
  name: 'combinePilots'
})
export class CombinePilotsPipe implements PipeTransform {

  transform(pilots: Array<Pilot>, flights: Array<Flight>): Array<Pilot> {
    if (!pilots) {
      return;
    }
    if (!flights) {
      return pilots;
    }
    const alreadyFlew = flights.map(flight => flight.pilot.pilotId);
    const result = pilots.filter(pilot => {
      if (!alreadyFlew.find(id => id === pilot.pilotId)) {
        return pilot;
      }
      return;
    });
    return result;
  }

}
