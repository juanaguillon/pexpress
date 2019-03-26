import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  indexUser = {
    email: "",
    password: ""
  }
  currentUser = {}
  constructor(
    private auth:AuthService
  ) { 
    this.auth.getCurrentUser( ).subscribe( user => {
      this.currentUser = user;
    } )
  }

  ngOnInit() {}

  createLogin( ){
    if (this.indexUser.email == "" || this.indexUser.password == "" ){
      alert('Todos los campos son necesarios');
      return false;
    }

    this.auth.loginUser(this.indexUser.email, this.indexUser.password ).then( user => {
      
      alert('Usuario logeado correctamente')
      
    }).catch( err => {
      console.log(err)
    })
  }

  closeSesion( e ){
    e.preventDefault();
    this.auth.closeSesion();
  }
 

}
