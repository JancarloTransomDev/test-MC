import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  navigate =
    [
      {
        title : 'Home',
        url   : '/admin/home',
        icon  : 'home'
      },
      {
        title : 'Users',
        url   : '/admin/users',
        icon  : 'people-outline'
      }
    ];
  constructor(private authService: AuthService) { }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
