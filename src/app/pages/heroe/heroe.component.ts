import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';
import { AuthService } from 'src/app/services/auth.service';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService,
    private auth: AuthService,
    private router: Router
  ){}

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  guardar(form: NgForm){
    console.log(form);
    console.log(this.heroe);

    Swal.fire({
      title: 'Espere!',
      text: 'Guardando Informacion',
      icon: 'info',
      confirmButtonText: 'Cool'
    });
    Swal.showLoading();

    this.heroesService.crearHeroe(this.heroe)
    .subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });
  }

}
