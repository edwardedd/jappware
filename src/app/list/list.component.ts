import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('elem', {static: false})
  elem: ElementRef;
  listMembers: {firstName:string, lastName:string,status: boolean,id:number}[] = [];
  activateMember:boolean = true;
  active: string = 'active';
  activeButton: string = 'deactivate';
  constructor(private service: MembersService) { }

  ngOnInit(): void {
    this.getData()
  };

  removeMember(index) {
    console.log(index);
    this.listMembers.splice(index,1)
    localStorage.setItem('member', JSON.stringify(this.listMembers))
  };

  deacivateMeber(e,status,member) {
    // for (let member of this.listMembers){
      console.log(member)
      
      if(e.target.id==status){
        member.status = !member.status
        console.log('st',member)
      }
    // }
  }

  updateMember(firstName,lastName, index){

    const memberData={
      firstName,
      lastName
    };
    // localStorage.clear()
    // this.listMembers = this.service.getFromStorage()
    

  };

  ngAfterContentInit() {
    this.getData()
  };
  getData() {
    if ("member" in localStorage){
      this.listMembers = this.service.getFromStorage()
    }else {
      this.listMembers = this.service.getMemberList()
    }
  }
  ngOnDestroy() {
    console.log('uytrewq')
    localStorage.clear();
  }

}
