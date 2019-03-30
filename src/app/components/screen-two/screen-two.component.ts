import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.component.html',
  styleUrls: ['./screen-two.component.css']
})
export class ScreenTwoComponent implements OnInit {

  compActive = 1;
  presets = []
  dayWeek:any = [
    { name: "Lunes", day:1 },
    { name: "Martes", day:2 },
    { name: "Miércoles", day:3 },
    { name: "Jueves", day:4 },
    { name: "Viernes", day:5 },
    { name: "Sábado", day:6 },
    { name: "Domingo", day:0 },
  ]
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DatabaseService
  ) {
    this.getPresets();
   }

  ngOnInit() {
  }

  closeSesion($e) {
    $e.preventDefault();
    this.auth.closeSesion();
    this.router.navigate(["/login"]);
  }

  toggleComponent($e, number: number) {
    $e.preventDefault();
    this.compActive = number;
  }

  public getPresets( ){
    this.db.getFullCollection('presets').subscribe( docs => {
      this.presets = docs;
      console.log( docs );
    })
  }

}
