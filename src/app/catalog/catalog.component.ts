import { Component, OnInit } from '@angular/core';
import { Items } from '../services/items';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  members:any = [];

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.membersService.getAllItems().subscribe(
      (response) =>
      {
        this.members = response;
        console.log(this.members)
      }
    );
    console.log('1111',this.members)
  };

  addMember(name, lastName) {
    this.members.push({firstName:name, lastName: lastName})
  };

  addToList(firstName,lastName,status, id) {
    this.membersService.addMemberList(firstName,lastName,status,id)
  }

}
