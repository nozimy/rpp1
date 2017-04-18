import { Component, OnInit }                      from '@angular/core';
import { FormBuilder, FormGroup, Validators }     from '@angular/forms'; //FormControl

import { Region } from './../region';
import { Ipoteka } from './../ipoteka';
import { Bank  } from './../bank';

import { Response} from '@angular/http';
import { IpotekaService} from './../ipoteka.service';
import { HttpService} from './../http.service';

import { aims, currencies, houseMarkets, accredits, loansecurities, 
incconfirms, requireds, paymenttypes, Indexes } from './../forms/data-model';

@Component({
  selector: 'app-ipoteka-form',
  templateUrl: './ipoteka-form.component.html',
  styleUrls: ['./ipoteka-form.component.css']
})
export class IpotekaFormComponent implements OnInit {
  
  
  
  ipotekaForm: FormGroup;
  
  regions: Region[];
  private selectedRegion: string = "ALL";
  banks: Bank[];
  private selectedBank: string = "ALL";
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
      private fb: FormBuilder) { // <--- inject FormBuilder
      this.createForm();
      
  }
  goToPaymentInfoPage(){
    
  }
  
  createForm() {
    this.ipotekaForm = this.fb.group({
      // main: this.fb.group({ // <-- the child FormGroup
        region_num: ['', Validators.required ],
        bank_num: ['', Validators.required ],
        aim: ['', Validators.required ],
        houseMarket: ['', Validators.required ],
        buildingIsAccredited: ['', Validators.required ],
      // }),
      // creditTerms: this.fb.group({ // <-- the child FormGroup
        currency: ['', Validators.required ],
        creditRate: '',
        creditSecurity: ['', Validators.required ],
        creditTermFrom: '',
        creditTermTo:'',
        creditAmount: '',
        downPayment: '',
        incomeCheck: ['', Validators.required ],
        periodOfExam: '',
      // }),
      // reqForBorrower: this.fb.group({ // <-- the child FormGroup
        borrowerAge: '',
        registrationIsRequired: ['', Validators.required ],
        rusResidenceRequired: ['', Validators.required ],
      // }),
      // repayTerm: this.fb.group({ // <-- the child FormGroup
        payment: '',
        prePayment: '',
      // }),
      sortBy: ['', Validators.required ]
    });
  }
  
  ngOnInit() {
    this.getRegions();
    this.getBanks();
  }
  
  getRegions(): void {
    this.httpService.getRegions()
        .then(regions => {
        this.regions = regions});
  }
  getBanks(): void {
    this.httpService.getBanks()
        .then(banks => {
        this.banks = banks});
  }

}
