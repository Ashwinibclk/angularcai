import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../app/components/list-users/user';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageapp:boolean=true;
  root:boolean=true;
  title = 'angularapp';
  users: any;
    currentUser:User | undefined;
    currentIndex = -1;
    name = '';
    user = {
      name: '',
    email: '',
   isactive: false,
   role:''
    };
    submitted = false;
    constructor(private usersService: UsersService,private router:Router) { }
    ngOnInit() {
      this.retrieveUsers();
      console.log(this.users);
      if (this.router.url.includes('/details')) {
        this.pageapp = false;
        }

        if(this.router.url == '/'){
          this.root=true;
        }
     
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
        console.log(this.currentUser?.id);
        this.router.navigate(['details/'+this.currentUser?.id]);

    /*  this.router.events.forEach((event)=>{
        if(event instanceof NavigationStart){
         let url = event.url;
         console.log(url.includes("details"));
          if(url.includes ("details")){
            this.pageapp=false;
          }
        }
      })*/
       
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

      onOptionsSelected(e:any){
        this.user.role=e.target.value;
      }
      saveuser() {
        
        const data = {
          name: this.user.name,
         email: this.user.email,
         role:this.user.role,
         isactive:this.user.isactive
        };
        this.usersService.create(data)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this.router.navigate(['list']);
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
          if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
              results.push(user);
          }
        }
        this.users = results;
        if (results.length === 0 || !key) {
          this.retrieveUsers();
        }
      }
}
