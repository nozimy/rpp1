import { Observable } from 'rxjs/Rx';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { Ipoteka } from './ipoteka';

@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public viewIpoteka(selectedIpoteka: Ipoteka): Observable<boolean> {

        let dialogRef: MdDialogRef<DialogExampleComponent>;

        dialogRef = this.dialog.open(DialogExampleComponent, { 
            // height: '400px',
            width: '800px'
        } );
        dialogRef.componentInstance.selectedIpoteka = selectedIpoteka;

        return dialogRef.afterClosed();
    }
}