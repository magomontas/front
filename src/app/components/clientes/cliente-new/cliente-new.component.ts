import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cliente-new',
  templateUrl: './cliente-new.component.html',
  styleUrls: ['./cliente-new.component.css']
})
export class ClienteNewComponent implements OnInit {
  public cliente;
  public success_message;
  public error_message;
  public clientes;

  constructor(private clienteService: ClienteService, private router: Router) {
    this.cliente = new Cliente('', '', '', '', 1);
  }

  ngOnInit(): void {
  }


  onSubmit(form) {
    if (form.valid) {
      this.clienteService.new_cliente(this.cliente).subscribe(res => {
        this.success_message = 'El registro se ha almacenado con Éxito';
        this.get_clientes();
        this.router.navigate(['/clientes']);
      }, error => {
        console.log(error);
      });
    } else {
      this.error_message = 'Llene todos los campos';
    }
  }

  get_clientes() {
    this.clienteService.get_clientes().subscribe(res => {
      this.clientes = res.clientes;
    }, error => {
      console.log(error);
    });
  }
}
