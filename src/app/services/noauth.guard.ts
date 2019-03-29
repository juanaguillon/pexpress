import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate, CanActivateChild {
  constructor( 
    private auth:AuthService,
    private router:Router
     ){}
  
  canActivate(){
    
    if ( this.auth.isLogged() ){
      this.router.navigate(["/admin/listing"]);
    }

    return true;
  }
  canActivateChild( ) {
    if ( this.auth.isLogged()) {
      this.router.navigate(["/admin/listing"]);
      return false;
    }

    return true;
  }
  
}
