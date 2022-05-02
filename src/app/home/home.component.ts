import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionModel } from '../models/seesion.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: SessionModel = new SessionModel();

  constructor(
    private loginService: LoginService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getSessionInfo();
  }

  getSessionInfo() {
    let sessionAux = JSON.parse(this.loginService.session ? this.loginService.session : "");
    this.user = new Object(sessionAux);

    switch (this.user.rol) {
      case 'adm':
        this.router.navigate(['/home/adm']);
        break;

      default:
        break;
    }
  }



}
