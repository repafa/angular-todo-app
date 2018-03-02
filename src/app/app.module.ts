import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';
import { TodoEditMessageComponent } from './todos/todo-edit-message/todo-edit-message.component';

import { TodoService } from './_shared/todo.service';
import { PriorityPipe } from './_shared/priority.pipe';
import { SearchFilterPipe } from './_shared/search-filter.pipe';
import { DateValidatorDirective } from './_shared/date-validator.directive';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'todo', component: TodoEditComponent },
  { path: 'todo/:id', component: TodoEditComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];


export function todoServiceFactory(todoService: TodoService) {
  return  () => todoService.initData();
}

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    MenuComponent,
    HomeComponent,
    PriorityPipe,
    SearchFilterPipe,
    TodoEditComponent,
    DateValidatorDirective,
    TodoEditMessageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
  ],
  providers: [
    TodoService,
    { provide: APP_INITIALIZER, useFactory: todoServiceFactory, deps: [TodoService], multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
