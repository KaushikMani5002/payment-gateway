import { Component, OnInit, inject } from '@angular/core';
import { Login } from '../login/login';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-landing',
  imports: [Login],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit {
  commonService: CommonService = inject(CommonService);

  ngOnInit(): void {
    // Clear any previous session
    this.commonService.destroySession();
  }
}
