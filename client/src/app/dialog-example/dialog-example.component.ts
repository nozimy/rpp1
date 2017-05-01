import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Ipoteka } from './../ipoteka';
import { IpotekaSearchFormComponent } from './../ipoteka-search-form/ipoteka-search-form.component';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  public selectedIpoteka: any;
  
  constructor(
    public dialogRef: MdDialogRef<DialogExampleComponent>  
  ) { }

  ngOnInit() {
  }

}
