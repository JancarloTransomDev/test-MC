import { Component, OnInit } from '@angular/core';
import {UserType} from '../../../types/response/user-type';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user: UserType | null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

}
