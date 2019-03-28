import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-listing',
  templateUrl: './admin-listing.component.html',
  styleUrls: ['./admin-listing.component.css']
})
export class AdminListingComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private route:Router
    ) { }

  ngOnInit() {
  }

  closeSesion(e) {
    e.preventDefault();
    this.auth.closeSesion();
    this.route.navigate(["/login"])
  }

}
