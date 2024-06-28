import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
    private router: Router
  ){
    this.usuario = new UsuarioModel();
  }

  ngOnInit(){
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email')!;
      this.recordarme = true;
    }
  }

  login(form: NgForm){
    if(form.invalid){ return; }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Info!',
      text: 'Do you want to continue',
      icon: 'info',
      confirmButtonText: 'Cool'
    });
    Swal.showLoading();

    this.auth.login(this.usuario)
    .subscribe( resp => {

      console.log(resp);
      Swal.close();

      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/heroe/nuevo');

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        text: err.error.error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
    }

}
