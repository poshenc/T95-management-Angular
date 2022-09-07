import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'objectArrayFilter' })

export class ObjectArrayFilterPipe implements PipeTransform {

  //search any fields in an array
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter((item: any) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }
}