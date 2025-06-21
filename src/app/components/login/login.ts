import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { phoneNumberType } from '../../services/common.interface';
import { OnlyNumberDirective } from '../../directives/onlynumber.directive';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, OnlyNumberDirective],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  router: Router = inject(Router);
  commonService: CommonService = inject(CommonService);

  phoneNumber: phoneNumberType = new FormControl<number | null>(null, {
    validators: [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[6-9]{1}[0-9]{9}')
    ],
    updateOn: 'blur'
  });

  proceed() {
    this.commonService.updateLoginStatus = true;
    this.router.navigate(['home']);
  }
}
