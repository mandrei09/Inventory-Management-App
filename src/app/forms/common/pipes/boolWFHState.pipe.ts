import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolWFHState'
})
export class BoolWFHStatePipe implements PipeTransform {

  transform(value, yesNo: string): any {
    return value.id === 89 ? 'DA' : 'NU';
  }

}
