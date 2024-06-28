import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-c316e-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      }
      )
    );
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      map( resp => this.crearArreglo(resp))
    );
  }

  private crearArreglo(heroesObj: object){
    const heroes: HeroeModel[] = [];

    Object.keys(heroesObj).forEach(key =>{
      const heroe: HeroeModel = heroesObj[key as keyof object];
      heroe.id = key;

      heroes.push(heroe);
    });
    return heroes;
  }
}
