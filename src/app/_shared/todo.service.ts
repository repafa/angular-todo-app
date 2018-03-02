import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Todo } from './todo';
import 'rxjs/add/operator/map';

const API_URI = 'assets/data/initData.json';

@Injectable()
export class TodoService {

  todos: Todo[];
  todosIndex: number;

  constructor(private http: Http) {}

  initData() {
    if (typeof(Storage) !== 'undefined') {
      let initialTodos = localStorage.getItem('todos') && JSON.parse(localStorage.getItem('todos')).length;
      if (!initialTodos) {
        return new Promise((resolve, reject) => {
          this.http
            .get(API_URI)
            .map(data => data.json())
            .subscribe(data => {
              localStorage.setItem('todos', JSON.stringify(data));
              localStorage.setItem('todosIndex', data.length.toString());
              this.todos = data;
              resolve(true);
            });
        });
      }
    } else {
      alert('Sorry! No Web Storage support...');
    }
  }

  getDataFromLocalStorage(): void {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    this.todosIndex = JSON.parse(localStorage.getItem('todosIndex'));
  }

  postDataToLocalStorage(todos: Todo[]): void {
    console.log(this.todos)
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todosIndex', JSON.stringify(this.todosIndex));
  }

  getSortedTodos(): Todo[] {
    this.todos.sort(function (a, b) {
      return b.priority - a.priority || a.deadline - b.deadline;
    });

    return this.todos;
  }

  getTodo(id: number): Todo {
    let todo = this.todos.find( elem => elem.id === id && !elem.completedAt );

    return todo;
  }

  saveTodo(todo: Todo): void {
    todo.id ? this.updateTodo(todo) : this.addTodo(todo);
    this.postDataToLocalStorage(this.todos);
  }

  updateTodo(todo: Todo): void {
    this.todos.forEach( (elem, index) => {
      if (elem.id  === todo.id) {
        this.todos[index] = todo;
      }
    });
  }

  addTodo(todo: Todo): void {
    todo.id = ++this.todosIndex;
    todo.createdAt = Date.now();
    this.todos.push(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter( elem => todo.id !== elem.id );
    this.postDataToLocalStorage(this.todos);
  }

  setCompleted(todo: Todo): void {
    todo.completedAt = Date.now();
    this.postDataToLocalStorage(this.todos);
  }
}
