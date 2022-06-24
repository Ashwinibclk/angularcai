import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    user = {
        name: '',
      email: '',
     isactive: false,
     role:''
      };
      submitted = false;
      constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }






  saveuser() {
    const data = {
      name: this.user.name,
     email: this.user.email
    };
    this.usersService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newuser() {
    this.submitted = false;
    this.user = {
      name: '',
      email: '',
     isactive: false,
     role:'',

    };
  }
}
