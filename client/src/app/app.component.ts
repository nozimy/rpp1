import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material' //for dialog
import { MdSnackBar } from '@angular/material';

import { User } from './user';
import { UsersService } from './users.service';

import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { SnackCompComponent} from './snack-comp/snack-comp.component';

console.log('console.log');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'RPP1';
  
  //users: User[];
  
  // getUsers(): void {
  //   this.usersService.getUsers().then(users => this.users = users);
  // }
  
  // ngOnInit(): void {
  //   this.getUsers();
  //   console.log(this.users);
  // }
  
  constructor( private usersService: UsersService,
  public dialog: MdDialog,
  public snackBar: MdSnackBar,
  public snackBarComp: MdSnackBar
  ) {}
  
  errorMessage: string;
  users: User[];
  mode = 'Observable';
  selectedNav: string;
  onSelectNav(navItem: string){
    this.selectedNav = navItem;
  }
  
  ngOnInit() { this.getUsers(); }
  
  getUsers() {
    this.usersService.getUsers()
                    .subscribe(
                      users => {
                         console.log('USERS in app.component.ts');
                         console.log(users);
                         this.users = users;
                      },
                      error =>  this.errorMessage = <any>error);
  }
  openDialog(){
    this.dialog.open(DialogExampleComponent);
  }
  openSnackBar() {
    this.snackBar.open("hey now", "close");
  }
  
  openSnackBarComponent() {
    this.snackBarComp.openFromComponent( SnackCompComponent, {
      duration: 2000,
    });
  }
}