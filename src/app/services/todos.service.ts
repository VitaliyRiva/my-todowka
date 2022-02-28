import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../enums/filter-enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addToDo(text: string):void {
    const newTodo: TodoInterface = {
      text,
      id: Math.random().toString(16),
      isChecked: false
    };
    const updateTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updateTodos);
  }

  toggleAll(isChecked: boolean) {
    const updateTodos = this.todos$.getValue().map( todo => {
      return {
        ...todo,
        isChecked
      }
    });
    this.todos$.next(updateTodos);
  }

  changeFilter(filterName: FilterEnum) {
    this.filter$.next(filterName);
  }

  changeTodo(id: string | undefined, text: string | undefined) {
    const updateTodos = this.todos$.getValue().map((todo) => {
     if (todo.id === id) {
       return {
         ...todo,
         text,
       };
     }
     return todo;
    });
    // @ts-ignore
    this.todos$.next(updateTodos);
  }

  removeTodo(id: string | undefined) {
    const updateTodos = this.todos$
        .getValue()
        .filter(todo => todo.id !== id);
    this.todos$.next(updateTodos);
  }

  toggleTodo(id: string | undefined) {
    const updateTodos = this.todos$.getValue().map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isChecked: !todo.isChecked
        }
      }
      return todo
    });
    this.todos$.next(updateTodos);
  }

  constructor() { }

}
