import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';


export enum LoginStatus {
  uninitialized = 0,
  success = 1,
  validating,
  hasError
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  messageResult = '';
  status: LoginStatus = LoginStatus.uninitialized;

  constructor(private authService: AuthService) {
    this.formGroup = new FormGroup({
      payrollNumber: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.formGroup.disable();
    this.status = LoginStatus.validating;
    const payrollNumber: string = this.formGroup.controls.payrollNumber.value;
    const password: string = this.formGroup.controls.password.value;
    this.authService.login(payrollNumber, password).subscribe(value => {
      if (value.status !== 'success') {
        this.formGroup.enable();
        this.status = LoginStatus.hasError;
      } else {
        this.status = LoginStatus.success;
      }
      this.messageResult = value.message;
    });
  }

  get hasError(): boolean {
    return this.status === LoginStatus.hasError;
  }

  get isValidating(): boolean {
    return this.status === LoginStatus.validating;
  }
}
