import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyAR9P4ecPbiy1Ta1TrZJtXPbEOdXt-ZDCE';

  userToken: string = '';

  constructor(private http: HttpClient) { }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( (resp: any) => {
        this.guardarToken(resp['idToken']);
        return resp;
      }
      )
    );
  }

  nuevoUsuario(usuario: UsuarioModel){

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( (resp: any) => {
        this.guardarToken(resp['idToken']);
        return resp;
      }
      )
    );
  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token')!;
    } else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean{

    let condicion1 = false;
    let condicion2 = false;

    if(localStorage.getItem('token')){
      condicion1 = (localStorage.getItem('token')!.length > 2);
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()){
      condicion2 = true;
    } else{
      condicion2 = false;
    }

    return (condicion1 && condicion2)
    
  }
}
