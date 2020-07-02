import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PilotService } from '../services/pilot.service';
import { Pilot } from '../models/Pilot';

export function invalidEmail(control: AbstractControl) {
  const invalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
  return !invalid ? { invalidEmail: { value: control.value } } : null;
}

export function emailTaken(pilotService: PilotService, currPilotId: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null  => {
    return pilotService.getAllPilots().toPromise().then(data => {
      const pilots = data.find(p => { p.pilotEmail === control.value && p.pilotId !== currPilotId;
      });
      return (typeof pilots) !== 'undefined' ? { duplicateEmail: {value: control.value } } : null;
    });
  };
}

