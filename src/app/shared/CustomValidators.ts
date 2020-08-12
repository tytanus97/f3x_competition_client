import { AbstractControl, FormGroup, FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { PilotService } from '../services/pilot.service';
import { Observable, of } from 'rxjs';
import { map,debounceTime, first, take, switchMap, catchError } from 'rxjs/operators';
import { Pilot } from '../models/Pilot';

export function ImageMaxValidator(control: AbstractControl) {
  const fileList: FileList = control.value;
  if (fileList !== null) {
     return Array.from(fileList).length > 4 ? {filesCount: 'Too many files'} : null;
    }
  return null;
}

export function passwordMatch(passwordControllName: string, passwordConfirmControllName: string) {
  return (formGroup: FormGroup) => {
    const passControll = formGroup.controls[passwordControllName];
    const passConfirmControll = formGroup.controls[passwordConfirmControllName];

    if (passConfirmControll.errors) {
        return;
    }
    if (passControll.value !== passConfirmControll.value) {
      passConfirmControll.setErrors({mustMatch: 'true'});
    } else {
      passConfirmControll.setErrors(null);
    }
  };

}

export function invalidEmail(control: AbstractControl) {
  const invalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
  return !invalid ? { invalidEmail: { value: control.value } } : null;
}

export function emailTakenValidator(ps: PilotService, pId: number): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return ps.emailExist(c.value, pId).pipe(map((result) => {
      return (result ? { duplicateEmail: c.value } : null);
    })); };
}

export function usernameTaken(ps: PilotService, pId: number): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return ps.usernameExist(c.value, pId).pipe(map((result) => {
        return (result ? {usernameTaken: c.value} : null);
      })); };
}

