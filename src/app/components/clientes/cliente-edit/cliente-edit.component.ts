import { Component, OnInit } from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";
import {Cliente} from "../../../models/cliente";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {
  public success_message;
  public error_message;
  public cliente;
  public id;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {
    this.cliente = new Cliente('', '', '', '', 1);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.clienteService.get_cliente(this.id).subscribe(
        res => {
          this.cliente = res.cliente;
        }, error => {
          console.log(error);
        });
    });
  }

  onSubmit(form) {
    if (form.valid) {
      this.clienteService.edit_cliente(this.cliente).subscribe(res => {
        this.router.navigate(['/clientes']);
        this.get_clientes();
      }, error => {
        console.log(error); });
    }
  }

  get_clientes() {
    this.clienteService.get_clientes().subscribe(res => {
      this.cliente = res.clientes;
    }, error => {
      console.log(error);
    });
  }
}
