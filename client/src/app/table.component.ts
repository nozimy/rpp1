import { Component, OnInit } from '@angular/core';

import { User } from './user';

import { Response} from '@angular/http';
import { HttpService} from './http.service';


@Component({
  selector: 'my-users',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
   providers: [HttpService]
})
export class TableComponent implements OnInit{
  
  users: User[]=[];
  
  
  
  getUsers(): void {
    this.httpService.getUsers()
        .then(users => {
        console.log('this.httpService.getUsers().then(users...  : table.component.ts');
        console.log(users);
        this.users = users});
  }
  
     
    constructor(private httpService: HttpService ){}
    ngOnInit(){
        this.getUsers();
        // this.httpService.getData()
        //                 .subscribe((data: Response) => this.users=data.json());
    }

}
