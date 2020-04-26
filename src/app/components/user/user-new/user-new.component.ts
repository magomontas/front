import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  public mensaje;
  public mensajeError;
  public usuario;

  constructor(private userService: UserService, private router: Router) {
    this.usuario = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    if (form.valid) {
      this.userService.registrar(this.usuario).subscribe(res => {
        this.mensaje = 'El usuario se registro correctamente';
        this.router.navigate(['/usuarios']);
      }, error => {
        this.mensajeError = error;
      });
    }
  }

}
