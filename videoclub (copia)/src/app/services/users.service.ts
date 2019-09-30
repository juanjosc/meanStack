import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url = 'http://localhost:3000/users/';

/*
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
 */
  constructor( private http: HttpClient) { }

  listar(): Observable<any> {
   return this.http.get(this.url + 'listar').pipe( map ( resp =>  {
      console.log(resp);
      return resp;
    }));
  }

  public createUser(usuario){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = {
      user: usuario
    };

    return this.http.post(this.url + 'crear', body, {headers});

  }

  public updateUser(value, id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const user = {
      user: value
    };

    return this.http.put(this.url + 'update?id=' + id, user, {headers}).pipe( map (resp => resp ));

  }

  updateUserPassword( value, id ): Observable<any> {
    // tslint:disable-next-line: prefer-const
    let headers = new HttpHeaders();
    const body = {
      password: value
    };
    console.log('update User', body );
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url + 'updatePassword?id=' + id, body , { headers }).pipe( map (resp => resp ));
  }

  getUser(id) {

    return this.http.get( this.url + 'usuario?id=' + id).pipe( map ( resp => {
      return resp;
    }));
  }

  deleteUser(id) {

    return this.http.delete( this.url + 'borrar?id=' + id).pipe( map ( resp => {
      return resp;
    }));
  }

  login( userForm ) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      user: userForm,
    };

    return this.http.post(this.url + 'login', body , { headers }).pipe( map( resp => resp));
  }


}
