import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.scss']
})
export class UpdateMemberComponent implements OnInit {
  @Input() member:{firstName:string, lastName:string,id:number}[] = []
  @Output() onChanged = new EventEmitter<{firstName:string, lastName:string}[]>()
  updateMember:{firstName, lastName}[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(this.member);
    if(form.value.firstName === "" && form.value.lastName === ""){
      form.value.firstName = this.member[0]
      form.value.lastName = this.member[1]
      this.onChanged.emit([form.value.firstName, form.value.lastName]);
      // this.updateMember=[
      //   form.value.firstName,
      //   form.value.lastName
      // ];
      // localStorage.setItem('member', JSON.stringify(this.listMembers));
    }else if(form.value.firstName === ""){
      form.value.firstName = this.member[0]
      this.onChanged.emit([form.value.firstName, form.value.lastName]);
    }else if(form.value.lastName === ""){
      form.value.lastName = this.member[0]
      this.onChanged.emit([form.value.firstName, form.value.lastName]);
    }else {
      this.onChanged.emit([form.value.firstName, form.value.lastName]);
      // localStorage.setItem('member', JSON.stringify(this.listMembers));

    }

    form.reset();
  }

}
