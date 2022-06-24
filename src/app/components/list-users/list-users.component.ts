import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from './user';
import { Router } from '@angular/router';
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
    constructor(private usersService: UsersService, private router:Router) { }
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
        this.router.navigate(['details/'+this.currentUser?.id]);
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

    
      public searchUsers(key: string): void {
        console.log(key);
        console.log(this.users);
        const results: User[] | undefined = [];
        if(this.users)
        for (const user of this.users) {
          if (user.name==key){
              results.push(user);
          }
        }
        this.users = results;
        if (results.length === 0 || !key) {
          this.retrieveUsers();
        }
      }
  

}


