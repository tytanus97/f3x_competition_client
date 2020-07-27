import { AbstractControl } from '@angular/forms';

export function ImageMaxValidator(control: AbstractControl) {
  const fileList: FileList = control.value;
  if (fileList !== null) {
     return Array.from(fileList).length > 4 ? {filesCount: 'Too many files'} : null;
    }
  return null;
}
