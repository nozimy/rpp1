import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { TableComponent }  from './table.component';
import { SamplesComponent } from './samples/samples.component';
import { QueryformComponent } from './queryform/queryform.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { BanksComponent } from './banks/banks.component';

import { LoginComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ProgramsComponent } from './programs/programs.component';
import { InfoPageComponent } from './info-page/info-page.component';



const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: '',     component: AppComponent },
  { path: 't',     component: TableComponent },
  { path: 'app-samples',   component: SamplesComponent },
  { path: 'queryform',   component: QueryformComponent },
  { path: 'calculator',   component: CalculatorComponent },
  { path: 'banks',   component: BanksComponent },
  { path: 'login',   component: LoginComponent },
  { path: 'add-item',   component: AddItemComponent },
  { path: 'programs/:id',   component: ProgramsComponent },
  { path: 'queryform/:bank_id',   component: QueryformComponent },
  { path: 'info',   component: InfoPageComponent }

  
  
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
