import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo';

@Pipe({
  name: 'searchFilterPipe'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Todo[], input: string) {
    if (input) {
      return value.filter(function (el: any) {
        return el.description.toLowerCase().indexOf(input.toLowerCase()) > -1;
      });
    }
    return value;
  }

}
