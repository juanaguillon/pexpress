import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.component.html',
  styleUrls: ['./screen-two.component.css']
})
export class ScreenTwoComponent implements OnInit {

  compActive = 1;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  closeSesion($e) {
    $e.preventDefault();
    this.auth.closeSesion();
    this.router.navigate(["/login"]);
  }

  toggleComponent(number: number) {
    this.compActive = number;
  }

}
