import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { IpotekaService} from './../ipoteka.service';
import { HttpService} from './../http.service';
import { aims, currencies, houseMarkets, accredits, loansecurities, 
incconfirms, requireds, paymenttypes, Indexes } from './../forms/data-model';

import { Region } from './../region';
import { Ipoteka } from './../ipoteka';
import { Bank  } from './../bank';



@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  
  ipoteka: Ipoteka;
  regions: Region[];
  banks: Bank[];
  aims = aims;
  currencies = currencies;
  houseMarkets = houseMarkets;
  accredits = accredits;
  loansecurities = loansecurities;
  incconfirms = incconfirms;
  requireds = requireds;
  paymenttypes = paymenttypes;
  Indexes = Indexes;

  constructor(
    private ipotekaService: IpotekaService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  
  goBack(): void {
      this.location.back();
  }

  ngOnInit() {
    this.route.params
        .switchMap((params: Params) => this.ipotekaService.getIpoteka(+params['id']))
        .subscribe(ipoteka => this.ipoteka = ipoteka);
  
    this.getRegions();
    this.getBanks();
    
  }
  
  getRegions(): void {
    console.log("begin  getRegions()");
    this.httpService.getRegions()
        .then(regions => {
        this.regions = regions});
  }
  getBanks(): void {
    console.log("begin  getBanks()");
    this.httpService.getBanks()
        .then(banks => {
        this.banks = banks});
  }

}
