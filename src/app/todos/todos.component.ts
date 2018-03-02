import {Component, OnInit} from '@angular/core';
import {TodoService} from '../_shared/todo.service';
import {Todo} from '../_shared/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  searchFilter: Todo = new Todo();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getSortedTodos();
  }

  deleteTodo(todo: Todo, index: number): void {
    this.todoService.deleteTodo(todo);
    this.todos = this.todos.filter( elem => todo.id !== elem.id );
  }

  setCompleted(todo: Todo): void {
    this.todoService.setCompleted(todo);
  }
}
