import { Pilot } from './Pilot';
import { Image } from './Image';

export class Plane {
  constructor(public planeId: number, public planeWingSpan: number,public planeColor: string,
              public planeName: string, public planeWeight: number, public pilot?: Pilot, public imageList?: Array<Image>) {
  }
}
