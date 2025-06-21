import { Component, inject } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  commonService: CommonService = inject(CommonService);
  router: Router = inject(Router);

  redirect(value: string){
    let url: string | undefined = undefined;
    switch(value){
      case 'transactions': 
        url = 'transactions';
        break;
      case 'logout': 
        if (confirm('Are you sure you want to Logout?\nLogging out will clear all transactions.')) {
          url = 'landing';
          this.commonService.destroySession();
        } else {
          url = undefined;
        }
        break;
      case 'home':
        url = 'home';
        break;
      default:
        url = undefined;
        break;
    }
    if(url){
      this.router.navigate([url]);
    }
    return;
  }
}
