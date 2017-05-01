import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersService } from './users.service';
import { TableComponent }  from './table.component';

import { HttpService} from './http.service';
import { IpotekaService} from './ipoteka.service';

import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { SnackCompComponent } from './snack-comp/snack-comp.component';
import { SamplesComponent } from './samples/samples.component';
import { QueryformComponent } from './queryform/queryform.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { BanksComponent } from './banks/banks.component';
import { QueryResultComponent } from './query-result/query-result.component';
import { LoginComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { IpotekaFormComponent } from './ipoteka-form/ipoteka-form.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { IpotekaSearchFormComponent } from './ipoteka-search-form/ipoteka-search-form.component';
import { IpotekiListComponent } from './ipoteki-list/ipoteki-list.component';
import { ProgramsComponent } from './programs/programs.component';

import { DialogsService } from './dialogs.service';
import { InfoPageComponent } from './info-page/info-page.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot()
  ],
  entryComponents: [
    DialogExampleComponent,
    SnackCompComponent
    ],
  providers: [UsersService, HttpService, IpotekaService, DialogsService],
  declarations: [
    AppComponent,
    TableComponent,
    DialogExampleComponent,
    SnackCompComponent,
    SamplesComponent,
    QueryformComponent,
    CalculatorComponent,
    BanksComponent,
    QueryResultComponent,
    LoginComponent,
    AddItemComponent,
    BankFormComponent,
    IpotekaFormComponent,
    BankListComponent,
    IpotekaSearchFormComponent,
    IpotekiListComponent,
    ProgramsComponent,
    InfoPageComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
