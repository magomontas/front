import {Component, OnInit} from '@angular/core';
import {GLOBAL} from '../../services/GLOBAL';
import {UserService} from '../../services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users;
  public mensaje;
  public p;
  public url;

  constructor(private userService: UserService) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res.usuarios;
    }, error => {
      console.log(error); });
  }

  delete(id) {
    Swal.fire({
      title: '¿Está Seguro?',
      text: '¡Al presionar el botón de Eliminar, no hay forma de retroceder!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
      confirmButtonColor: '#01BF39',
      cancelButtonColor: 'red'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Registro Eliminado!',
          'El registro se eliminó con éxito.',
          'success'
        );
        this.userService.delete(id).subscribe(res => {
          if (res) {
            this.mensaje = 'El usuario se ha eliminado con éxito!';
            this.getUsers();
          }
        }, error => {
          console.log(error);
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se ha cancelado la eliminación :)',
          'error'
        );
      }
    });
  }
}
