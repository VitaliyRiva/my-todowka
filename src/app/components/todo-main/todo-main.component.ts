import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../enums/filter-enum';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent {

  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todoService: TodosService) {
    this.isAllTodosSelected$ = this.todoService.todos$
        .pipe(map(todos => todos
            .every((todo) => todo.isChecked))
    );
    this.noTodoClass$ = this.todoService.todos$
        .pipe(map((todos) => todos.length === 0));
    this.visibleTodos$ = combineLatest(
        this.todoService.todos$,
        this.todoService.filter$
    ).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter(todo => !todo.isChecked)
      } else if (filter === FilterEnum.completed) {
        return todos.filter(todo => todo.isChecked)
      }
      return todos;
    }));
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked)
  }

  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }
}
