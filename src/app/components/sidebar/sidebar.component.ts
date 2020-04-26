import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public token;
  public identity;
  public nombre;

  constructor(private userService: UserService) {
    this.identity = this.userService.getIdentity();
    // console.log(this.identity);
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
  }

}
