import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../_shared/todo';
import { TodoService } from '../../_shared/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  id: number;
  todo: Todo = null;
  priorities = [ , 'alacsony', 'magas'];
  saved: boolean;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) {
    this.route.params.subscribe( params => { this.id = +params.id; } );
  }

  ngOnInit() {
    this.todo = this.id && this.todoService.getTodo(this.id) ? this.todoService.getTodo(this.id) : new Todo();
  }

  onSubmitTodoForm(todoForm) {
    let isNew = !this.todo.id;
    this.todo.deadline = Date.parse(todoForm.value.deadline);
    this.todoService.saveTodo(this.todo);
    this.todo = new Todo();
    if (isNew) {
      todoForm.reset();
      this.saved = true;
    } else {
      this.router.navigate(['/todos']);
    }
  }

  onMessageClicked(message: boolean): void {
    this.saved = false;
  }
}
