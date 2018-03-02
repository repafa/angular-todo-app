import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value === 1 ? 'alacsony' : (value === 2 ? 'magas' : '');
  }
}
