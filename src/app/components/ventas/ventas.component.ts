import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {VentasService} from "../../services/ventas.service";

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  public identity;
  public ventas;
  public p;

  constructor(private userService: UserService, private router: Router, private ventasService: VentasService) {
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity) {
      this.get_ventas();
    } else {
      this.router.navigate(['/login']);
    }
  }

  get_ventas() {
    this.ventasService.get_ventas().subscribe(res => {
      this.ventas = res.ventas;
      console.log(this.ventas);
    }, error => {
      console.log(error);
    });
  }
}
