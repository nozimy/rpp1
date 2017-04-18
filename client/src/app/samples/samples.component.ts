import { Component, OnInit } from '@angular/core';


import { MdDialog } from '@angular/material' //for dialog
import { MdSnackBar } from '@angular/material';


import { DialogExampleComponent } from './../dialog-example/dialog-example.component';
import { SnackCompComponent} from './../snack-comp/snack-comp.component';


@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {

  

  ngOnInit() {
  }
  
  constructor( 
  public dialog: MdDialog,
  public snackBar: MdSnackBar,
  public snackBarComp: MdSnackBar
  ) {}
  
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
