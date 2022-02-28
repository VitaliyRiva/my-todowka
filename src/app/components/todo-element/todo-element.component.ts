import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.scss']
})
export class TodoElementComponent implements OnInit {
  @Input('todo') todoProps: TodoInterface | undefined
  @Input('isEditing') isEditingProps: boolean | undefined;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<
      string | null
      > = new EventEmitter
  editingText: string | undefined = '';

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.editingText = this.todoProps?.text;
  }

  setTodoEditMode() {
    this.setEditingIdEvent.emit(this.todoProps?.id);
  }

  removeTodo() {
    this.todoService.removeTodo(this.todoProps?.id);
  }

  toggleTodo() {
    this.todoService.toggleTodo(this.todoProps?.id);
  }

  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo() {
    this.todoService.changeTodo(this.todoProps?.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
