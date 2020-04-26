import { Component, OnInit } from '@angular/core';
import {ClienteService} from "../../services/cliente.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes;
  public mensaje;
  public p;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.get_clientes();
  }

  get_clientes() {
    this.clienteService.get_clientes().subscribe(res => {
      if (res) {
        this.clientes = res.clientes;
      } else {
        console.log('Error en la obtención de datos');
      }
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
        this.clienteService.delete(id).subscribe(res => {
          if (res) {
            this.mensaje = 'La categoria se ha eliminado con éxito!';
            this.get_clientes();
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
