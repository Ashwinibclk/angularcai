import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
const routes: Routes = [{ path: '', redirectTo: 'tutorials', pathMatch: 'full' },
{ path: 'users', component: ListUsersComponent },
{ path: 'update/:id', component: UserDetailsComponent },
{ path: 'add', component: AddUserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
