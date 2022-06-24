import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from './user';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})


export class ListUsersComponent implements OnInit {
    users: any;
    currentUser:User | undefined;
    currentIndex = -1;
    name = '';
    constructor(private usersService: UsersService) { }
    ngOnInit() {
      this.retrieveUsers();
    }
    retrieveUsers() {
      this.usersService.getAll()
        .subscribe(
          data => {
            this.users = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
    refreshList() {
        this.retrieveUsers();
      
        this.currentIndex = -1;
      }
      setActiveUser(user: any, index: number) {
        this.currentUser = user;
        this.currentIndex = index;
      }
      removeAllUsers() {
        this.usersService.deleteAll()
          .subscribe(
            response => {
              console.log(response);
              this.retrieveUsers();
            },
            error => {
              console.log(error);
            });
      }

      searchName() {
        this.usersService.findByName(this.name)
          .subscribe(
            data => {
              this.users = data;
              console.log(data);
            },
            error => {
              console.log(error);
            });
      }

  

}


