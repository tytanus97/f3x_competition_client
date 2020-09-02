import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';
import { Pilot } from '../models/Pilot';

@Pipe({
  name: 'combinePilots'
})
export class CombinePilotsPipe implements PipeTransform {

  transform(flights: Array<Flight>, pilots: Array<Pilot>): Array<Flight> {
    if (!pilots) {
      return;
    }
    const result = pilots.map(pilot => {
    const flight =  flights.find(f => f.pilot.pilotId === pilot.pilotId);

    return flight ? new Flight(flight.flightId, pilot, flight.flightDuration,
            flight.flightLanding, flight.flightPenalty) : new Flight(0, pilot, 0, 0, 0, 0);
   });

    return result;
  }

}
