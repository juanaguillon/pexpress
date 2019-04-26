import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  indexUser = {
    email: "",
    password: ""
  }
  currentUser = {}
  constructor(
    private auth: AuthService,
    private router:Router
  ) {

    
    this.auth.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      if (user && user.email == 'tavocreativo@gmail.com'){
        this.router.navigate(["/admin/listing"])
      }
    })
  }

  ngOnInit() { }

  createLogin() {
    if (this.indexUser.email == "" || this.indexUser.password == "") {
      alert('Todos los campos son necesarios');
      return false;
    }

    this.auth.loginUser(this.indexUser.email, this.indexUser.password).then(user => {

      alert('Usuario logeado correctamente')
      this.router.navigate(["/admin/listing"])

    }).catch(err => {
      console.log(err)
    })
  }


}
