import { AbstractControl, ValidatorFn, AsyncValidatorFn, AsyncValidator, ValidationErrors } from '@angular/forms';
import { PilotService } from '../services/pilot.service';
import { Observable, of,  } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function invalidEmail(control: AbstractControl) {
  const invalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
  return !invalid ? { invalidEmail: { value: control.value } } : null;
}

export function emailTakenValidator(ps: PilotService, pId: number): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    console.log(c.value);
    return ps.getAllByEmail(c.value).pipe(map((pilots) => {

      console.log(pId);
      console.log(pilots);
      console.log((pilots && pilots.length > 0) && !pilots.map(pilot => pilot.pilotId).includes(pId));
      return ((pilots && pilots.length > 0) && !pilots.map(pilot => pilot.pilotId).includes(pId))
       ? { duplicateEmail: c.value } : null;
    })
    );
  };
}


