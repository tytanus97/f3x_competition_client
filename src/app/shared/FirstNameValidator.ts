import { ValidatorFn, AbstractControl } from "@angular/forms";


export function firstNameValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = regex.test(control.value);
    return valid ? {invalidFirstName: control.value} : null;
  };
}
