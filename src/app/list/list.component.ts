import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listMembers: {firstName:string, lastName:string}[] = [];
  activateMember:boolean = true;
  active: string = 'active';
  activeButton: string = 'deactivate';
  constructor(private service: MembersService) { }

  ngOnInit(): void {
    // this.listMembers = this.service.getMemberList()
    this.listMembers = this.service.getFromStorage()
  };

  removeMember(index) {
    console.log(index);
    this.listMembers.splice(index,1)
    localStorage.setItem('member', JSON.stringify(this.listMembers))
  };

  deacivateMeber() {
    this.activateMember = !this.activateMember
    this.activateMember ? this.active = 'active' : this.active = 'inactive'
  }

  updateMember(firstName,lastName){
    
    const memberData={
      firstName,
      lastName
    };
    
  }

  ngOnDestroy() {
    console.log('uytrewq')
    localStorage.clear();
  }

}
