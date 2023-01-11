import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { of, tap, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private urlBase:string=environment.baseUrlApi
  private _auth:Auth | undefined;

  get auth():Auth{
    return {...this._auth!}
  }

  constructor(private http:HttpClient) {}

  verificaAutenticacion():Observable<boolean>{

    if(!localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.urlBase}/usuarios/1`)
            .pipe(
              map(auth=>{
                console.log('map',auth)
                this._auth=auth
                return true
              } )
            )

  }

  login(){

    return this.http.get<Auth>(`${this.urlBase}/usuarios/1`)
    .pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem('token',auth.id)) //guardamos el id en local storage para manetener la session
    )
  }

  logout(){
    this._auth = undefined;
    localStorage.removeItem('token')
  }

}
