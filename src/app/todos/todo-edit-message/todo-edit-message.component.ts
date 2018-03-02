import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-edit-message',
  templateUrl: './todo-edit-message.component.html',
  styleUrls: ['./todo-edit-message.component.css']
})

export class TodoEditMessageComponent {
  @Input() todoSaved: boolean;
  @Output() messageClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClick(): void {
    this.messageClicked.emit(true);
  }
}
