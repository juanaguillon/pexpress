import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-screen-two',
  templateUrl: './admin-screen-two.component.html',
  styleUrls: ['./admin-screen-two.component.css']
})
export class AdminScreenTwoComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  closeSesion( $e ){
    $e.preventDefault( );
    this.auth.closeSesion( );
    this.router.navigate(["/login"]);
  }

}
