import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  @Output() userEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }

  changeUSer(email) {
    if ( email === null || email === undefined || email.length < 1) {
      const user = {
        status: false,
        email: '',
      };
      this.userEmitter.emit( user );
    } else {
      const user = {
        status: true,
        email,
      };
      this.userEmitter.emit(user);
    }


  }
}
