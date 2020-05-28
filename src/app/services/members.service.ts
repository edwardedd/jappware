import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Items } from './Items';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  mockUrl = 'http://localhost:3000/members'
  memberList: {firstName:string, lastName:string}[] = [];

  constructor(private http: HttpClient){}
  getAllItems() {
    return this.http.get<Items[]>(this.mockUrl )
  };

  postItems(firstName: string, lastName: string) {
    return this.http.post<Items[]>(this.mockUrl, {
      firstName: firstName,
      lastName: lastName
    })
  };

  addMemberList(firstName: string, lastName: string){
    this.memberList.push({firstName, lastName})
    localStorage.setItem('member', JSON.stringify(this.memberList))
  }

  getMemberList() {
    return this.memberList
  }

  getFromStorage() {
    return this.memberList = JSON.parse(localStorage.getItem('member'))
  }
}