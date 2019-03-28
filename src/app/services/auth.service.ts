import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth:AngularFireAuth) { }

  loginUser( email:string, password:string ){

    return this.auth.auth.signInWithEmailAndPassword( email, password );
    
  }

  createUser( email:string, password:string ){
    this.auth.auth.createUserWithEmailAndPassword( email, password ).then( newUser => {
      
      alert('Usuario creado correctamente.')
      
    })
    .catch( error => {

      console.log( error );
      alert('Error al crear un nuevo usuario.')
      
    })
  }

  getCurrentUser( ){
    return this.auth.authState;
  }

  closeSesion( ){
    this.auth.auth.signOut();
  }

  isLogged( ){
    return this.auth.auth.currentUser;
  }

}
