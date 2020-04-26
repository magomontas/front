import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public token;
  public identity;
  public nombre;

  constructor(private userService: UserService) {
    this.identity = this.userService.getIdentity();
    console.log(this.identity.nombres);
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
  }

}
