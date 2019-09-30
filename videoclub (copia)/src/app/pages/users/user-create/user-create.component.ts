import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public create = false;
  public createForm: FormGroup;
  public message = '';
  public errores = false;

  constructor( private usersService: UsersService) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      role: new FormControl('')
    });
  }

  public onSubmit() {
    this.usersService.createUser(this.createForm.value).toPromise().then( (resp: any) => {

      console.log('respuesta', resp);
      this.create = true;
      this.errores = false;
      setTimeout( () => {
        this.create = false;
      }, 4000);

    }).catch( error => {
      console.log('error', error);
      this.errores = true;
      this.message = JSON.stringify(error.error);
    });
  }

}
