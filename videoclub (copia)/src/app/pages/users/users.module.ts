import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentComponent } from './user-content/user-content.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { usersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserContentComponent,
                  UserCreateComponent,
                  UserEditComponent,
                  UserListComponent],
  imports: [
    CommonModule,
    usersRoutingModule
  ]
})
export class UsersModule { }
