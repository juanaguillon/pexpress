import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-screen-one',
  templateUrl: './admin-screen-one.component.html',
  styleUrls: ['./admin-screen-one.component.css']
})
export class AdminScreenOneComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  closeSesion(e) {
    e.preventDefault();
    this.auth.closeSesion();
    this.route.navigate(["/login"])
  }

}
