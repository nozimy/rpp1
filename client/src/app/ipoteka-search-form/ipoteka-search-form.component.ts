import { Component, OnInit }                      from '@angular/core';
import { FormBuilder, FormGroup, Validators }     from '@angular/forms'; //FormControl

import { MdDialog } from '@angular/material' //for dialog
//import { DialogExampleComponent } from './../dialog-example/dialog-example.component';

import { Region } from './../region';
import { Ipoteka } from './../ipoteka';
import { Bank  } from './../bank';

import { Response} from '@angular/http';
import { IpotekaService} from './../ipoteka.service';
import { HttpService} from './../http.service';

import {DialogsService} from './../dialogs.service';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { aims, currencies, houseMarkets, accredits, loansecurities, 
incconfirms, requireds, paymenttypes, Indexes } from './../forms/data-model';

@Component({
  selector: 'app-ipoteka-search-form',
  templateUrl: './ipoteka-search-form.component.html',
  styleUrls: ['./ipoteka-search-form.component.css']
})
export class IpotekaSearchFormComponent implements OnInit {
  
  message: string;
  btnDisabled : boolean;
  
  ipoteka: any;
  ipoteki: Ipoteka[];
  ipotekiCount: number;
  f_state = 'on'; //on - load - off
  
  // getF_State(): boolean {
  //   return f_state != 'on';
  // }
  
  ipotekaForm: FormGroup;
  
  regions: Region[];
   selectedRegion: string = "ALL";
  banks: Bank[];
  selectedBank: any = {key: "ALL", value: 'Любая'};
  
  aims = aims;
   selectedAim: string = "ALL";
  currencies = currencies;
   selectedCurrency: string = "Любая";
  houseMarkets = houseMarkets;
   selectedMarket: string = "ALL";
  accredits = accredits;
   selectedAccred: string = "Любая";
  loansecurities = loansecurities;
   selectedSecurity: string = "ALL";
  incconfirms = incconfirms;
   selectedConfirm: string = "ALL";
  requireds = requireds;
   selectedReq1: string = "ALL";
   selectedReq2: string = "ALL";
  paymenttypes = paymenttypes;
   selectedPayment: string = "ALL";
  Indexes = Indexes;
  
  selectedIpoteka: Ipoteka;
  param_bank_id: number;
  
  constructor(
      private ipotekaService: IpotekaService,
      private httpService: HttpService,
      public dialog: MdDialog,
      private dialogsService: DialogsService,
      private route: ActivatedRoute,
      private fb: FormBuilder    ) { // <--- inject FormBuilder
      
      this.createForm();
  }
  
  goToPaymentInfoPage(){
    
  }
  
  revert() { this.ngOnChanges(); }
  ngOnChanges() {
    this.ipotekaForm.reset({
      // name: this.hero.name
    });
    //this.onValueChanged();
  }
  goBack(){
    this.f_state = 'on';
    
    // this.revert();
  }
  
  createForm() {
    console.log("begin  createForm()");
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
        payment: ['', Validators.required ],
        prePayment: ''
      // }),
      // ,sortBy: ['', Validators.required ]
    });
  }
  
  
  onSubmit() {
    this.f_state = 'load';
    console.log("begin  onSubmit()");
    this.ipoteka = this.prepareSaveIpoteka();
    
    if (!this.ipoteka) { return; }
    console.log(this.ipoteka);
    
    this.getIpotekiByParam(this.ipoteka);
    // this.ipotekaService.createIpoteka(this.ipoteka)
    //     .then(ipoteka => {
    //         console.log('new added ipoteka');
    //         console.log(ipoteka);
    //         this.ipoteki.push(ipoteka);
    //         console.log(this.ipoteki);
    //         this.incIpotekaNum();
    //       })
    //       .catch((reason) =>{ this.message = "Ошибка создания."});
    //     // this.ngOnChanges();
        console.log("END  onSubmit()");
  
    
   }
  
  prepareSaveIpoteka(): any {
    console.log("begin  prepareSaveIpoteka()");
    const formModel = this.ipotekaForm.value;

    //return new `Ipoteka` object containing a combination of original ipoteka value(s)
    //and deep copies of changed form model values
    let saveIpoteka: any = {};
      // ipoteka_num:          this.ipoteka.ipoteka_num as number,
      
      formModel.bank_num === 'ALL'  ?  '' : saveIpoteka.bank_num = formModel.bank_num as number;
      formModel.region_num == 'ALL' ? '' :  saveIpoteka.region_num = formModel.region_num as number;
      formModel.aim == 'ALL' ? '' :        saveIpoteka.aim = formModel.aim as string;
      formModel.houseMarket == 'ALL' ? '' :  saveIpoteka.houseMarket =formModel.houseMarket as string;
      formModel.buildingIsAccredited == 'Любая'? '' : saveIpoteka.buildingIsAccredited = formModel.buildingIsAccredited as string;
      
      formModel.currency  == 'Любая' ? '' : saveIpoteka.currency = formModel.currency as string;
      (formModel.creditRate == null || formModel.creditRate == '') ? '' :  saveIpoteka.creditRate = formModel.creditRate as number;
      formModel.creditSecurity  == 'ALL' ? '' :  saveIpoteka.creditSecurity =       formModel.creditSecurity as string;
      (formModel.creditTermFrom == null || formModel.creditTermFrom == '') ? '' : saveIpoteka.creditTermFrom =       formModel.creditTermFrom as number;
      (formModel.creditTermTo == null  || formModel.creditTermTo == null)  ? '' : saveIpoteka.creditTermTo =         formModel.creditTermTo as number;
      (formModel.creditAmount == null || formModel.creditAmount == '') ? '' : saveIpoteka.creditAmount =         formModel.creditAmount as number;
      (formModel.downPayment == null || formModel.downPayment == '') ? '' : saveIpoteka.downPayment =          formModel.downPayment as number;
      formModel.incomeCheck == 'ALL' ? '' : saveIpoteka.incomeCheck =          formModel.incomeCheck as string;
      (formModel.periodOfExam || formModel.periodOfExam == '' )== null ? '' : saveIpoteka.periodOfExam =         formModel.periodOfExam as number;
      
      (formModel.borrowerAge == null || formModel.borrowerAge == '') ? '' :  saveIpoteka.borrowerAge =          formModel.borrowerAge as number;
      formModel.registrationIsRequired == 'ALL' ? '' : saveIpoteka.registrationIsRequired =  formModel.registrationIsRequired as string;
      formModel.rusResidenceRequired == 'ALL' ? '' :  saveIpoteka.rusResidenceRequired =  formModel.rusResidenceRequired as string;
      
      formModel.payment == 'ALL' ? '' :  saveIpoteka.payment =              formModel.payment as string;
      (formModel.prePayment  == null || formModel.prePayment  == '' ) ? '' : saveIpoteka.prePayment =           formModel.prePayment as number;
      ///////////////////////
  
      
      // saveIpoteka.houseMarket:          formModel.houseMarket as string,
      // saveIpoteka.buildingIsAccredited: formModel.buildingIsAccredited as string,
      
      // saveIpoteka.currency:             formModel.currency as string,
      // saveIpoteka.creditRate:           formModel.creditRate as number,
      // saveIpoteka.creditSecurity:       formModel.creditSecurity as string,
      // saveIpoteka.creditTermFrom:       formModel.creditTermFrom as number,
      // saveIpoteka.creditTermTo:         formModel.creditTermTo as number,
      // saveIpoteka.creditAmount:         formModel.creditAmount as number,
      // saveIpoteka.downPayment:          formModel.downPayment as number,
      // saveIpoteka.incomeCheck:          formModel.incomeCheck as string,
      // saveIpoteka.periodOfExam:         formModel.periodOfExam as number,
      
      // saveIpoteka.borrowerAge:          formModel.borrowerAge as number,
      // saveIpoteka.registrationIsRequired:  formModel.registrationIsRequired as string,
      // saveIpoteka.rusResidenceRequired:  formModel.rusResidenceRequired as string,
      
      // saveIpoteka.payment:              formModel.payment as string,
      // saveIpoteka.prePayment:           formModel.prePayment as number
  
    return saveIpoteka;
  }
  
  deleteIpoteka(ipoteka: Ipoteka):void {
    this.ipotekaService
        .deleteIpoteka(ipoteka.ipoteka_num)
        .then(() => {
          this.ipoteki = this.ipoteki.filter(i => i !== ipoteka);
          this.ipotekiCount = this.ipoteki.length;
        });
  }
    
  ngOnInit() {
    console.log("begin  ngOnInit()");
    this.getRegions();
    this.getBanks();
    
    
    // this.route.params
    //     .map((params: Params) => {
    //       //this.param_bank_id = +params['bank_id'];
    //       this.selectedBank.key = params['bank_id'];
    //       this.selectedBank.value = this.banks.filter(
    //       (bank) => { 
    //         return bank.bank_num == +params['bank_id'];
    //       })[0].shortName;
    //       console.log(this.selectedBank);
    //       this.ipotekaForm.patchValue(
    //         {
    //           bank_num:  +params['bank_id']
    //         });
    // }).subscribe(hero => '');
        
    // if (params['bank_id']) {
      
    // }
    
    // this.ipoteka = new Ipoteka();
    // this.getIpoteki();
    
    // this.btnDisabled = this.ipotekaForm.pristine;
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
  
  getIpotekiByParam(ipoteka: any): void {
    console.log("begin   getIpoteki()");
    this.ipotekaService.getIpotekiByParam(ipoteka)
        .then(ipoteki => {
          //console.log('this.httpService.getUsers().then(users...  : table.component.ts');
          console.log(ipoteki);
          this.ipoteki = ipoteki;
          this.ipotekiCount = this.ipoteki.length;
          this.f_state = 'off';
        });
        
  }
  
  // incIpotekaNum(): void {
  //   console.log("begin   incIpotekaNum()");
  //   if (this.ipoteki ){
  //     this.ipoteka.ipoteka_num = this.ipoteki.length
  //     this.ipoteka.ipoteka_num++;
  //   } else {
  //     this.ipoteka.ipoteka_num = null;
  //   }
  // }
  
  chooseBank(id: number): string{
    let bank: Bank = this.banks.filter(
      (bank) => { 
        return bank.bank_num == id;
        
      })[0];
    return bank.shortName;
  }
  
  
  
  
  openDialog(id: number): void{
    this.selectedIpoteka = new Ipoteka();
    this.selectedIpoteka = this.ipoteki.filter(
      (ipoteka) => { 
        return ipoteka.ipoteka_num == id;
      })[0];
      
      console.log('IPOTEKI');
      console.log('(this.ipoteki',this.ipoteki);
      console.log('openDialog(id: number){');
      console.log('this.selectedIpoteka1', this.selectedIpoteka);
      
      
      
      let viewableIpoteka: any = {};
      for (var key in this.selectedIpoteka) {
        viewableIpoteka[key] = this.selectedIpoteka[key];
      }
      
      
      console.log('viewableIpoteka1', viewableIpoteka);
      viewableIpoteka.bank =  this.banks.filter(
      (bank) => { 
        return bank.bank_num == this.selectedIpoteka.bank_num;
      })[0].shortName;
      
  
      viewableIpoteka.region =  this.regions.filter(
      (region) => { 
        return region.region_num == this.selectedIpoteka.region_num;
      })[0].region_center;
      
      console.log('this.aims.filter;');
      console.log('this.aims1', this.aims);
      console.log('this.selectedIpoteka2', this.selectedIpoteka);
      console.log('viewableIpoteka2', viewableIpoteka);
      
      for (let i=0; i < this.selectedIpoteka.aim.length; i++) {
        if (viewableIpoteka.aim[i] != this.selectedIpoteka.aim[i]){
            viewableIpoteka.aim[i] =  this.aims.filter(
              (aim) => { 
                return aim.key == this.selectedIpoteka.aim[i];
              })[0].value;
        }
      }
      
      viewableIpoteka.houseMarket =   this.houseMarkets.filter(
      (houseMarket) => { 
        return houseMarket.key == this.selectedIpoteka.houseMarket;
      })[0].value;
      
      // viewableIpoteka.buildingIsAccredited = this.accredits.filter(
      // (accredit) => { 
      //   return accredit.key == this.selectedIpoteka.buildingIsAccredited;
      // })[0].value;
      
      viewableIpoteka.creditSecurity =  this.loansecurities.filter(
      (loansecuritie) => { 
        return loansecuritie.key == this.selectedIpoteka.creditSecurity;
      })[0].value;
      
      for (let i = 0 ; i < this.selectedIpoteka.incomeCheck.length; i++) {
            if (viewableIpoteka.incomeCheck[i] != this.selectedIpoteka.incomeCheck[i]){ 
                viewableIpoteka.incomeCheck[i] =  this.incconfirms.filter(
                  (incconfirm) => { 
                    return incconfirm.key == this.selectedIpoteka.incomeCheck[i];
                  })[0].value;
            }
      }
      
  
      viewableIpoteka.registrationIsRequired =   this.requireds.filter(
      (required) => { 
        return required.key == this.selectedIpoteka.registrationIsRequired;
      })[0].value;
      
      viewableIpoteka.rusResidenceRequired =    this.requireds.filter(
      (required) => { 
        return required.key == this.selectedIpoteka.rusResidenceRequired;
      })[0].value;
      
      viewableIpoteka.payment = this.paymenttypes.filter(
      (paymenttype) => { 
        return paymenttype.key == this.selectedIpoteka.payment;
      })[0].value;
    
      
          // regions: Region[];
          // banks: Bank[];
          // aims = aims;
          // currencies = currencies;
          // houseMarkets = houseMarkets;
          // accredits = accredits;
          // loansecurities = loansecurities;
          // incconfirms = incconfirms;
          // requireds = requireds;
          // paymenttypes = paymenttypes;
          // Indexes = Indexes;
      console.log('END  openDialog(id: number){');
      console.log('viewableIpoteka3', viewableIpoteka);
      
      this.dialogsService
      .viewIpoteka(viewableIpoteka)
      .subscribe(res => this.result = res);
    
      // this.dialog.open(DialogExampleComponent, {
      //   data: this.selectedIpoteka
      // });
  }
   public result: any;
}

