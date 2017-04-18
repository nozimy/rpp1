import { Component, OnInit } from '@angular/core';

import { Region } from './../region';
import { Bank  } from './../bank';

import { HttpService} from './../http.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
  
  regions: Region[];
  banks: Bank[];
  selectedRegion: string = "ALL";
  banksCount: number;

  constructor(
    private httpService: HttpService  
  ) { }

  
  ngOnInit() {
    this.getRegions();
    this.getBanks();
  }
  
  getRegions(): void {
    this.httpService.getRegions()
        .then(regions => {
        //console.log('this.httpService.getUsers().then(users...  : table.component.ts');
        //console.log(users);
        this.regions = regions});
  }
  getBanks(): void {
    this.httpService.getBanks()
        .then(banks => {
        this.banks = banks;
        this.banksCount = this.banks.length;
        });
  }
  
  getBanksByRegion(): void {
    if (this.selectedRegion !== 'ALL') {
      this.httpService.getBanksByRegion(+this.selectedRegion)
          .then(banks => {
          this.banks = banks;
          this.banksCount = this.banks.length;
          });
    } else {
      this.getBanks();
    }
  }
  
  deleteBank(bank: Bank):void {
    this.httpService
        .deleteBank(bank.bank_num)
        .then(() => {
          this.banks = this.banks.filter(b => b !== bank);
          this.banksCount = this.banks.length;
          //if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }

}
