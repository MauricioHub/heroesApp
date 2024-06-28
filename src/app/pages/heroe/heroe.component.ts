import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')!;

    if(id !== 'nuevo'){
      this.heroesService.getHeroe(id!)
      .subscribe((resp: any) => {
        console.log(resp);
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

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

    let respuesta: Observable<any>;

    if(this.heroe.id){
      respuesta = this.heroesService.actualizarHeroe(this.heroe);
    } else{
      respuesta = this.heroesService.crearHeroe(this.heroe);
    }

    respuesta
    .subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });
  }

}
