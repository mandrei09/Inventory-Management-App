import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boolPipeSapValidation' })
export class BoolPipeSapValidation implements PipeTransform {
  transform(value: boolean, yesNo: string) : any {
    return value ? 'DA' : 'NU';
  }
}