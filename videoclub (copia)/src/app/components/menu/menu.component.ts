import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public user: any = {
    status: false,
    email: '',
  };
  public loginMenu = true;

  constructor(
    private menuService: MenuService,
    private router: Router
    ) { }

  ngOnInit() {
    this.menuService.userEmitter.subscribe( (data: any) => {
      if (data === null) {
          this.user.status = false;
          this.user.email = '';
          this.loginMenu = true;
      } else {
        this.user.status = true;
        this.user.email = data.email;
        this.loginMenu = false;
      }
    });

    if ( (localStorage.getItem('token') != null && localStorage.getItem('token').length > 1 )
    && (localStorage.getItem('email') != null && localStorage.getItem('email').length > 1 )) {

    }
  }

  logout() {
    localStorage.clear();
    this.user.status = false;
    this.user.email = '';
    this.loginMenu = true;
  }


}
