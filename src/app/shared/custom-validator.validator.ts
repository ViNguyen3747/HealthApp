import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CityValidator(cityList: string[]): ValidatorFn {
  return (control: AbstractControl) => {
    const selection: string = control.value.toLowerCase();
    return (!(cityList.includes(selection)) ? {'requireMatch': true} : null);
    }
}

export function valueValidator(control: AbstractControl): ValidationErrors | null {
  return (control.value <= 0) ? {'isInvalid': true} : null;
}