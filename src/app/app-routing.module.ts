import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { TodoComponent } from '../component/todo/todo.component';
import { AuthGuard } from '../share/services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'todo-list', component: TodoComponent, canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
