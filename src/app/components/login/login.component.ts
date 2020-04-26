import {Component, OnInit, DoCheck} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user;
  public token;
  public identity;
  public data_error;

  constructor(private userService: UserService, private router: Router, private routerAc: ActivatedRoute) {
    this.user = new User('', '', '', '', '', '');
  }
  // ngDoCheck(): void {
  //   this.identity = this.userService.getIdentity();
  //   this.token = this.userService.getToken();
  // }

  ngOnInit(): void {
    this.logout();
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }



  close_alert() {
    this.data_error = '';
  }

  login(loginForm) {
    if (loginForm.valid) {
      this.userService.login(this.user).subscribe(
        response => {
          console.log(response);
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this.userService.login(this.user, true).subscribe(
            res => {
              localStorage.setItem('identity', JSON.stringify(response.user));
              this.router.navigate(['dashboard']);
            }, err => {

            });
        },
        error => {
          this.data_error = error.error.mensaje;
        }
      );
    } else {
    }
  }


  // Cerrar Sesion
  logout() {
    this.routerAc.params.subscribe(params => {
      const logout = +params.id;
      if (logout === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redireccion
        this.router.navigate(['login']);
      }
    });
  }

}
