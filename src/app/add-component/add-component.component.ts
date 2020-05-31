import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {

  constructor(private service: MembersService) { }
 
  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.service.postItems(form.value.firstName, form.value.lastName).subscribe(
      call =>{
        console.log("success");
        form.reset();
        location.reload();
      }
    )
  }

}
