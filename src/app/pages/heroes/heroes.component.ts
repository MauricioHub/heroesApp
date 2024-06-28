import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{
  
  heroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService,
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.heroesService.getHeroes()
    .subscribe(resp => {
      console.log(resp);
      this.heroes = resp;
    })
  }

  borrarHeroe(heroe:HeroeModel, i: number){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if(resp.value){
        this.heroesService.borrarHeroe(heroe.id!)
        .subscribe(resp => {
          console.log(resp);
          this.heroes.splice(i, 1);
        });
      }
    });
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
