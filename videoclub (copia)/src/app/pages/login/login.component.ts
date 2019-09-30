import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {


  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsersService,
    private menuService: MenuService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email : new FormControl(''),
      password : new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngDoCheck(): void {
     console.log('login form', this.loginForm.controls.password.value);

  }
  onSubmit() {
    this.usuarioService.login(this.loginForm.value).toPromise()
    .then( (dataLogin: any) => {

      console.log('dataLogin', dataLogin);
      if ( dataLogin.error === false) {
        localStorage.clear();
        // return;
      } else {
      localStorage.setItem('token', dataLogin.token);
      localStorage.setItem('id_user', dataLogin.usuario._id);
      localStorage.setItem('email', this.loginForm.controls.email.value);

      this.menuService.changeUSer(this.loginForm.controls.email.value);
      setTimeout(() => {

        this.router.navigate(['/']);
      }, 2000 );
    }
    }).catch( error => {
      console.log('error', error);
    });
  }

}
