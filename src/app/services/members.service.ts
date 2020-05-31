import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Items } from './Items';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  mockUrl = 'http://localhost:3000/members'
  memberList: {firstName:string, lastName:string, status:boolean,id:number,updated:boolean}[] = [];
  showInHeader:boolean=false;

  constructor(private http: HttpClient){}
  getAllItems() {
    return this.http.get<Items[]>(this.mockUrl )
  };

  postItems(firstName: string, lastName: string) {
    return this.http.post<Items[]>(this.mockUrl, {
      firstName: firstName,
      lastName: lastName,
      status: 'active',
      updated: false
    })
  };

  addMemberList(firstName: string, lastName: string, status:boolean,id:number,updated:boolean){
    this.memberList.push({firstName, lastName, status,id,updated});
    localStorage.setItem('member', JSON.stringify(this.memberList));
  };

  getMemberList() {
    return this.memberList
  };

  getFromStorage() {
    return this.memberList = JSON.parse(localStorage.getItem('member'))
  };

  goToMainPage(){
    this.showInHeader = true;
  };

  goToStartPage() {
    this.showInHeader = false;
  }

  getShow(){
    return this.showInHeader;
  }
}