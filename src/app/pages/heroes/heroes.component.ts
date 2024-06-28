import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{
  
  heroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService){}

  ngOnInit(){
    this.heroesService.getHeroes()
    .subscribe(resp => {
      console.log(resp);
      this.heroes = resp;
    })
  }

}
