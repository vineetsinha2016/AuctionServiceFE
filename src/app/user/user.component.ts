import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  model: any = {};
  constructor() { }

  ngOnInit() {
  }

  public onSubmitUser() {
    alert('Your information has been submitted successfully. :-)\n\n' + JSON.stringify(this.model))
  }

}
