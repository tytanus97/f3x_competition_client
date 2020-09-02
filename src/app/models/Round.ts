import { Flight } from './Flight';

export class Round {
  constructor(public roundId: number,public  roundNumber?: number, public roundStatus?: boolean,
              public flightList?: Array<Flight> ) {}
}
