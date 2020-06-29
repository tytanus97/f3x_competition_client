import { AbstractControl } from '@angular/forms';

export function invalidEmail(control: AbstractControl) {
  const invalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
  return !invalid ? { invalidEmail: { value: control.value}} : null;
}
