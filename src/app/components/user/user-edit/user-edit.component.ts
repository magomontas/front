import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public mensaje;
  public mensajeError;
  public usuario;
  public id;


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.usuario = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUsuario(this.id).subscribe(
        res => {
          this.usuario = res.usuario;
        }, error => {
          console.log(error);
        });
    });
  }

  onSubmit(form) {
    if (form.valid) {
     this.userService.editar(this.usuario).subscribe(res => {
       this.mensaje = 'Usuario Editado correctamente';
       this.getUsers();
       this.router.navigate(['/usuarios']);
     }, error => {
       console.log(error); });
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.usuario = res.usuarios;
    }, error => {
      console.log(error); });
  }
}
