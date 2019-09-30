import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public create = false;
  public createForm: FormGroup;
  public message = '';
  public errores = false;
  public id = '';

  constructor( private usersService: UsersService,
               private route: ActivatedRoute
                ) { }

  ngOnInit() {

    this.createForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      role: new FormControl('')
    });

    this.route.params.subscribe( resp => {
      console.log('resp', resp);

      this.id = resp.id;
      this.usersService.getUser(this.id).toPromise().then( (usuario: any) => {
        console.log('usuario', usuario);

        const user = usuario.usuarios;

        this.createForm = new FormGroup({
          nombre: new FormControl(user.nombre, [Validators.required, Validators.minLength(4)]),
          email: new FormControl(user.email, [Validators.required, Validators.email]),
          password: new FormControl(''),
          role: new FormControl(user.role)
        });



      }).catch( error => {
        console.log('error usuario', error);
      });
    });


  }

  public onSubmit() {
    this.usersService.updateUser(this.createForm.value, this.id).toPromise().then( (resp: any) => {
      console.log('respuesta', resp);
      this.create = true;
      this.errores = false;
      console.log('password', this.createForm.controls.password.value.length);

      if ((this.createForm.controls.password.value.length) > 0) {
        this.usersService.updateUserPassword(this.createForm.controls.password.value, this.id).toPromise()
        .then( pass =>{
          console.log('pass', pass);

        })
        .catch( error => {
          console.log('Error Password');
        });
      }

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
