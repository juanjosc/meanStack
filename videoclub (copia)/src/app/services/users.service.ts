import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url = 'http://localhost:3000/users/';

  constructor( private http: HttpClient) { }

  listar(): Observable<any> {
   return this.http.get(this.url + 'listar').pipe( map ( resp =>  {
      console.log(resp);
      return resp;
    }));
  }

}
