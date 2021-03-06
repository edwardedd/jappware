import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.scss']
})
export class UpdateMemberComponent implements OnInit {
  @Input() member:{firstName:string, lastName:string,id:number}[] = []
  @Output() onChanged = new EventEmitter<{firstName:string, lastName:string}[]>()
  updateMember:{firstName, lastName}[] = [];
  listMembers: {firstName:string, lastName:string, status: boolean,id:number}[] = [];
  openWindow: boolean = false;

  constructor(private service: MembersService) { }

  ngOnInit(): void {
    this.getData();
  };

  ngDoCheck() {
    this.openWindow = this.service.getUpdateWindow()
  }

  onSubmit(form: NgForm){
    if(form.value.firstName === ""){
      form.value.firstName = this.member[0]
      this.onChanged.emit([this.member[0], form.value.lastName]);
    }else if(form.value.lastName === ""){
      form.value.lastName = this.member[1]
      this.onChanged.emit([form.value.firstName, this.member[1]]);
    }else {
      this.onChanged.emit([form.value.firstName, form.value.lastName]);
    }
    form.resetForm();
    this.service.closeUpdateWindow()
  };

  getData() {
    if ("member" in localStorage){
      this.listMembers = this.service.getFromStorage();
    }else {
      this.listMembers = this.service.getMemberList();
    }
  };

}
