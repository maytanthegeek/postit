import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule, MatListModule } from '@angular/material';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  signInWithEmail() {
    this.authService.loginWithEmail()
    .then((res) => {
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }

  signInWithGoogle() {
  this.authService.loginWithGoogle()
  .then((res) => {
      this.router.navigate(['dashboard'])
    })
  .catch((err) => console.log(err));
  }

  ngOnInit() {
  }

}
