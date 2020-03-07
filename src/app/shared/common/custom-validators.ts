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

export function letterValidator(control: FormControl) {
  let value = control.value as string;
  if (!value.match('^[a-zA-Z]+$')) {
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
