import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentComponent } from './user-content/user-content.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { usersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserContentComponent,
                  UserCreateComponent,
                  UserEditComponent,
                  UserListComponent],
  imports: [
    CommonModule,
    usersRoutingModule,
    //Son necesarios importarlos para trabajar con formularios
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersModule { }
