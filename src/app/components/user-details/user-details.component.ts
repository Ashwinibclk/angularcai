import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../list-users/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUser : any;
  message = '';
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    this.message = '';
    this.getuser(this.route.snapshot.paramMap.get('id'));
  }
  getuser(id:any) {
    this.usersService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
 /* updatePublished(status:any) {
    const data = {
      name: this.currentUser.name,
      description: this.currentUser.description,
      published: status
    };
    this.usersService.update(this.currentUser.id, data)
      .subscribe(
        response => {
          
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }*/
  updateTutorial() {
    this.usersService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The user was updated successfully!';
        },
        error => {
          console.log(error);
        });
      }
      deleteTutorial() {
        this.usersService.delete(this.currentUser.id)
          .subscribe(
            response => {
              console.log(response);
              this.router.navigate(['/users']);
            },
            error => {
              console.log(error);
            });
      }
    }


