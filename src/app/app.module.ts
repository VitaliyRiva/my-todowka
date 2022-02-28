import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosModule } from './module/todos.module';
import { TodosComponent } from './components/todos/todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';
import { CommonModule } from '@angular/common';
import { TodoElementComponent } from './components/todo-element/todo-element.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoListComponent,
    TodoHeaderComponent,
    TodoMainComponent,
    TodoElementComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodosModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
