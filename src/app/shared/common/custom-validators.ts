import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

export function hourDomainValidator(control: FormControl) {
  let hourValue = control.value;
  if (hourValue && hourValue.indexOf(':') != -1) {
    let [hour, minute] = hourValue.split(':').map((d: string) => parseInt(d));
    if (!(hour < 24 && hour >= 0) || !(minute < 60 && minute >= 0)) {
      return {
        hourDomain: {
          domain: hour
        }
      };
    }
  }
  return null;
}

export function notOnlyNumbersValidator(control: FormControl) {
  const value = control.value as string;
  const regex = /^[0-9]+$/;
  if(value != null && regex.test(value)) {
    return {
      notOnlyNumbers: {
        domain: value
      }
    }
  }
  return null;
}

export function letterValidator(control: FormControl) {
  const value = control.value as string;
  const regex = /^[a-zA-Z\u00E0-\u00FC\s]*$/;
  console.log(value);
  console.log(regex.test(value));
  if (value != null && !regex.test(value)) {
    return {
      letter: {
        domain: value
      }
    };
  }
  return null;
}

@Directive({
  selector: '[hourDomain][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: hourDomainValidator,
      multi: true
    }
  ]
})
export class HourDomainValidator {}

@Directive({
  selector: '[letter][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: letterValidator,
      multi: true
    }
  ]
})
export class LetterValidator {}

@Directive({
  selector: '[notOnlyNumbers][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: notOnlyNumbersValidator,
      multi: true
    }
  ]
})
export class NotOnlyNumbersValidator {}
