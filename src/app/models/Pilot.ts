import { Country } from './Country';

export class Pilot {


  constructor(public pilotId?: number, public pilotFirstName?: string, public pilotLastName?: string,
              public country?: Country, public pilotEmail?: string, public pilotBirthDate?: Date, public pilotRating?) {

  }
}
