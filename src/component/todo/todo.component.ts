import { Component, OnInit } from '@angular/core';
import { CONST_LOCALSTORAGE_KEY } from 'src/share/Constant/constant';
import { ITodo } from 'src/share/models/todo.model';
import { AuthService } from 'src/share/services/auth.service';
import { TodoService } from 'src/share/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: ITodo[] = [];
  newTodoTitle = '';
  todoEdited: ITodo | undefined;
  displayedColumns = ['completed', 'title', 'actions'];
  constructor(private _todoServie: TodoService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(): void {
    const users = this._authService.getUserLogin();
    if (users.length > 0) {
      this._todoServie.get('todos', { userId: users[0].id }).subscribe(todoList => {
        this.todoList = todoList;
      });
    }
  }

  addITodo(): void {
    if (!this.newTodoTitle) {
      return;
    }
    if (this.todoEdited) {
      this._todoServie.update<ITodo>('todos', this.todoEdited.id, { ...this.todoEdited, title: this.newTodoTitle })
        .subscribe(modifiedITodo => {
          const itemIndex = this.todoList.findIndex(item => item.id === modifiedITodo.id);
          this.todoList[itemIndex] = modifiedITodo;
          this.todoList = [...this.todoList];
          this.clearModify();
        });
    } else {
      this._todoServie.add('todos', { title: this.newTodoTitle, completed: false })
        .subscribe(newITodo => {
          this.todoList.push(newITodo)
          this.todoList = [...this.todoList];
          this.newTodoTitle = '';
        });
    }
  }

  removeITodo(itemToRemove: ITodo): void {
    if (!confirm('Are you sure you want to remove this item?')) {
      return;
    }
    this._todoServie.delete('todos', itemToRemove.id).subscribe(() => {
      this.todoList = this.todoList.filter(item => item.id !== itemToRemove.id);
    });
  }

  modifyITodo(itemToModify: ITodo): void {
    this.todoEdited = { ...itemToModify };
    this.newTodoTitle = this.todoEdited.title;
  }
  clearModify() {
    this.todoEdited = undefined;
    this.newTodoTitle = '';
  }
}
