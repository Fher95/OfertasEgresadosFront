import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egcapitalize'
})
export class EgCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
