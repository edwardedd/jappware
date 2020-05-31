import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showElem: boolean=false;
  constructor(private service: MembersService, private router: Router) { }

  ngOnInit(): void {
    this.showElem = this.service.getShow()
  };

  ngDoCheck(){
    this.showElem = this.service.getShow();
  };

  goBack() {
    this.router.navigate(['/']);
    this.service.goToStartPage()
  }

}
