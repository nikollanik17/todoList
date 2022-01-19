import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(items: Task[], filterValue: string): any[] {
    if (!items) return [];
    if (filterValue === 'completed') {
      return items.filter((el: Task) => el.completed);
    } else if (filterValue === 'not-completed') {
      return items.filter((el: Task) => !el.completed);
    } else {
      return items;
    }
  }
}
