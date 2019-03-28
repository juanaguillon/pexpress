import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor( 
    private auth:AuthService,
    private router:Router
     ){}
  
  canActivate(){
    
    if ( ! this.auth.isLogged() ){
      this.router.navigate(["/login"]);
    }

    return true;
  }
  canActivateChild( ) {
    if (!this.auth.isLogged()) {
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
  
}
