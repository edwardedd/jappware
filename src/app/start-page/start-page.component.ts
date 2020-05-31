import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  constructor(private service: MembersService, private router: Router) { }

  ngOnInit(): void {
  }

  goTo(){
    this.service.goToMainPage();
    this.router.navigate(['/main'])
  }

}
