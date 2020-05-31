import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listMembers: {firstName:string, lastName:string, status: boolean,id:number,updated:boolean}[] = [];
  deactivateMembers: number = 0;
  activateMember:boolean = true;
  updateIndex:number = 0;
  updatedMember: number = 0;
  member:{firstName:string, lastName:string,id:number}[] = [];
  constructor(private service: MembersService) { }

  ngOnInit(): void {
    this.getData();
    this.getUpdatedMember();
    this.getDeactivateList();
    this.service.goToMainPage();
  };

  removeMember(index,status,member) {
    this.listMembers.splice(index,1);
    localStorage.setItem('member', JSON.stringify(this.listMembers));
    if(member.updated == true){
      this.updatedMember --;
    }
  };

  deacivateMeber(e,status,member) {
    if(e.target.id==status){
      member.status = !member.status;
      this.deactivateList(member.status);
      localStorage.setItem('member', JSON.stringify(this.listMembers));
    }

  }

  updateMember(e,index,member){
    this.member = [member.firstName, member.lastName,e.target.id];
    this.updateIndex = index;
    if(member.updated == false){

      this.updatedMember ++;
    }
    member.updated = true;
    localStorage.setItem('member', JSON.stringify(this.listMembers));
    this.service.openUpdateWindow()
  };

  ngDoCheck() {
    if(this.listMembers.length==0){
      this.updatedMember = 0;
      this.deactivateMembers = 0;
      localStorage.setItem('deactivateMembers', JSON.stringify(this.deactivateMembers));
      localStorage.setItem('updatedMember', JSON.stringify(this.updatedMember));
    };
    this.getData()
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
      this.listMembers[this.updateIndex].firstName = firstName;
      this.listMembers[this.updateIndex].lastName = lastName;
      localStorage.setItem('member', JSON.stringify(this.listMembers));
      this.getData()
      this.member = [];
      
      this.listMembers[this.updateIndex].updated = true;
      localStorage.setItem('updatedMember', JSON.stringify(this.updatedMember));
    };

  getUpdatedMember() {
    if("updatedMember" in localStorage){
      this.updatedMember = JSON.parse(localStorage.getItem('updatedMember'))
    } else{
      this.updatedMember = 0;
    }
  };

  deactivateList(member){
    if(member==false){
      this.deactivateMembers = this.deactivateMembers +1
      localStorage.setItem('deactivateMembers', JSON.stringify(this.deactivateMembers));
    }else if(member==true){
      this.deactivateMembers = this.deactivateMembers -1
    }
  };

  getDeactivateList() {
    if("deactivateMembers" in localStorage){
      this.deactivateMembers = JSON.parse(localStorage.getItem('deactivateMembers'))
    } else{
      this.deactivateMembers = 0;
    }
  };

  clearStorage(){
    localStorage.clear();
    this.listMembers = this.service.getFromStorage();
    location.reload()
  };

  ngOnDestroy() {
    localStorage.clear();
  };

}
