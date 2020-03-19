import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByTime'
})
export class SortByTimePipe implements PipeTransform {

  transform(array: any, field: string, order: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    if (order === 'desc') {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return 1;
        } else if (a[field] > b[field]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    if (order === 'asc') {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }

}
