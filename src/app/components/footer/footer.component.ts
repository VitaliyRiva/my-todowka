import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../enums/filter-enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;

  constructor(private todoService: TodosService) {
    this.activeCount$ = this.todoService.todos$.pipe(
        map((todos => todos.filter(todo => !todo.isChecked).length))
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
        map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    )
    this.noTodoClass$ = this.todoService.todos$
        .pipe(
            map((todos) => todos.length === 0)
        );
    this.filter$ = this.todoService.filter$
  }

  ngOnInit(): void {
  }

  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todoService.changeFilter(filterName)
  }
}
