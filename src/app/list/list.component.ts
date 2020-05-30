import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listMembers: {firstName:string, lastName:string, status: boolean,id:number}[] = [];
  deactivateMembers: number = 0;
  activateMember:boolean = true;
  updateIndex:number = 0;
  updatedMember: number = 0;
  member:{firstName:string, lastName:string,id:number}[] = [];
  constructor(private service: MembersService) { }

  ngOnInit(): void {
    this.getData();
    this.getUpdatedMember();
    this.deactivateList()
  };

  removeMember(index) {
    console.log(index);
    this.listMembers.splice(index,1);
    localStorage.setItem('member', JSON.stringify(this.listMembers));
  };

  deacivateMeber(e,status,member) {
    if(e.target.id==status){
      member.status = !member.status;
      this.deactivateList();
      localStorage.setItem('member', JSON.stringify(this.listMembers));
    }

  }

  updateMember(e,index,member){
    this.member = [member.firstName, member.lastName,e.target.id];
    this.updateIndex = index;
    console.log(
      this.updateIndex
    )
  };

  ngDoCheck() {
    if(this.listMembers.length==0){
      this.updatedMember = 0;
    };
  };

  getData() {
    if ("member" in localStorage){
      this.listMembers = this.service.getFromStorage();
    }else {
      this.listMembers = this.service.getMemberList();
    }
  };

  onChanged([firstName,lastName]){
    let innerName = document.getElementById(`name${this.updateIndex}`);
    let innerLastName = document.getElementById(`lastName${this.updateIndex}`);
    innerName.innerHTML = firstName;
    innerLastName.innerHTML = lastName;
    this.member = [];
    this.updatedMember ++;
    localStorage.setItem('updatedMember', JSON.stringify(this.updatedMember));
  };

  getUpdatedMember() {
    if("updatedMember" in localStorage){
      this.updatedMember = JSON.parse(localStorage.getItem('updatedMember'))
    } else{
      this.updatedMember = 0;
    }
  }

  deactivateList(){
    // if(member==false){
    //   this.deactivateMembers = this.deactivateMembers +1
    //   localStorage.setItem('deactivateMembers', JSON.stringify(this.deactivateMembers));
    // }else if(member==true){
    //   this.deactivateMembers = this.deactivateMembers -1
    // }
    
  };

  clearStorage(){
    localStorage.clear();
    this.listMembers = this.service.getFromStorage();
    location.reload()
  }

  ngOnDestroy() {
    console.log('uytrewq')
    localStorage.clear();
  }

}
