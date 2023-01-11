import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrlApi:string = environment.baseUrlApi;

  constructor( private http: HttpClient) {}

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrlApi}/heroes`)
  }
  getHeroePorId(id:string):Observable<Heroe>{

    return this.http.get<Heroe>(`${this.baseUrlApi}/heroes/${id}`)

  }

  getSugerencias(termino:string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrlApi}/heroes?q=${termino}&_limit=6`)
  }

  guardarHeroe(heroe:Heroe):Observable<Heroe>{
    console.log(heroe)
    return this.http.post<Heroe>(`${this.baseUrlApi}/heroes`,heroe)
  }

  actualizarHeroe(heroe:Heroe):Observable<Heroe>{
    //console.log(heroe)
    return this.http.put<Heroe>(`${this.baseUrlApi}/heroes/${ heroe.id }`,heroe)
  }

  borrarHeroe(id:string):Observable<any>{
    //console.log(heroe)
    return this.http.delete<any>(`${this.baseUrlApi}/heroes/${ id }`)
  }
  
  
}
