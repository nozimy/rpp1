import { Component, OnInit }                      from '@angular/core';
import { FormBuilder, FormGroup, Validators }     from '@angular/forms'; //FormControl

import { Region } from './../region';
import { Ipoteka } from './../ipoteka';
import { Bank  } from './../bank';

import { Response} from '@angular/http';
import { IpotekaService} from './../ipoteka.service';
import { HttpService} from './../http.service';

//import { percentValidator } from './../percent'; 

import { aims, currencies, houseMarkets, accredits, loansecurities, 
incconfirms, requireds, paymenttypes, Indexes } from './../forms/data-model';

@Component({
  selector: 'app-ipoteka-form',
  templateUrl: './ipoteka-form.component.html',
  styleUrls: ['./ipoteka-form.component.css']
})
export class IpotekaFormComponent implements OnInit {
  
  message: string;
  btnDisabled : boolean;
  active = true;
  submitted = false;
  finishMessage: string = "Ипотечная программа создана!"
  
  
  ipoteka: Ipoteka;
  ipoteki: Ipoteka[];
  
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
  }
  
  goToPaymentInfoPage(){
    
  }
  goBack(){
    this.submitted = false;
    this.revert();
  }
  
  createForm(): void {
    console.log("begin  createForm()");
    this.ipotekaForm = this.fb.group({
      // main: this.fb.group({ // <-- the child FormGroup
        ipoteka_name: ['', Validators.required ],
        region_num: ['', Validators.required ],
        bank_num: ['', Validators.required ],
        aim: this.fb.group({
          ALL: '',
          ROOM: '',
          FLAT: '',
          HOUSE: '',
          LAND: '',
          IMPROVE: '',
          REPAIR: '',
          REFINANCE: '',
          NOPURPOSE: ''
        }),
        houseMarket: ['', Validators.required ],
        buildingIsAccredited: ['', Validators.required ],
      // }),
      // creditTerms: this.fb.group({ // <-- the child FormGroup
        currency: ['', Validators.required ],
        creditRateFrom: ['', Validators.pattern(/(100(\.0000)?)|[0-9]?\d(\.\d{4})?/) ],
        creditRateTo: ['', Validators.pattern(`(100(\\.0000)?)|[0-9]?\\d(\\.\\d{4})?`) ],
        creditSecurity: ['', Validators.required ],
        creditTermFrom: '',
        creditTermTo: '',
        creditAmountFrom: '',
        creditAmountTo: '',
        downPayment: '',
        incomeCheck: this.fb.group({
          ALL: '',
          OFFICIAL: '',
          UNOFFICIAL: '',
          VERBAL: '',
          NOTREQUIRED: ''
        }),
        periodOfExam: '',
      // }),
      // reqForBorrower: this.fb.group({ // <-- the child FormGroup
        borrowerAgeFrom: '',
        borrowerAgeTo: '',
        registrationIsRequired: ['', Validators.required ],
        rusResidenceRequired: ['', Validators.required ],
      // }),
      // repayTerm: this.fb.group({ // <-- the child FormGroup
        payment: '',
        prePayment: ''
      // }),
    });
    
    this.ipotekaForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
    
  }
  
  ngOnChanges() {
    this.ipotekaForm.reset({
      // name: this.hero.name
    });
    this.onValueChanged();
  }
  
  revert() { this.ngOnChanges(); }
  
  onSubmit() {
    this.getIpoteki();
    console.log("begin  onSubmit()");
    this.ipoteka = this.prepareSaveIpoteka();
    
    if (!this.ipoteka ) { return; } //|| !this.ipoteka.ipoteka_num
    console.log(this.ipoteka);
    
    this.ipotekaService.createIpoteka(this.ipoteka)
        .then(ipoteka => {
          this.finishMessage = "Ипотечная программа создана!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
            console.log('new added ipoteka');
            console.log(ipoteka);
            this.ipoteki.push(ipoteka);
            console.log("this.ipotekaService.createIpoteka(this.ipoteka) IPOTEKI");
            console.log(this.ipoteki);
            // this.incIpotekaNum();
          })
          .catch((reason) =>{ this.message = "Ошибка создания.";
            console.log(this.message);
            this.finishMessage = "Произошла ошибка(. Ипотечная программа не создана. Попробуйте еще раз.";
            
          });
        
        console.log("END  onSubmit()");
        this.ngOnChanges();
        this.submitted = true;
        // setTimeout(() => this.active = true, 2000);
        return false;
  }
  
  prepareSaveIpoteka(): Ipoteka {
    console.log("begin  prepareSaveIpoteka()");
    const formModel = this.ipotekaForm.value;
    let aimsCopy: string[] = [];
    let aimFromForm = this.ipotekaForm.get('aim').value;
    
      aimFromForm.ALL ? aimsCopy.push(this.aims[0].key) : '';
      aimFromForm.ROOM ? aimsCopy.push(this.aims[1].key) : '';
      aimFromForm.FLAT ? aimsCopy.push(this.aims[2].key) : '';
      aimFromForm.HOUSE ? aimsCopy.push(this.aims[3].key) : '';
      aimFromForm.LAND ? aimsCopy.push(this.aims[4].key) : '';
      aimFromForm.IMPROVE ? aimsCopy.push(this.aims[5].key) : '';
      aimFromForm.REPAIR ? aimsCopy.push(this.aims[6].key) : '';
      aimFromForm.REFINANCE ? aimsCopy.push(this.aims[7].key) : '';
      aimFromForm.NOPURPOSE ? aimsCopy.push(this.aims[8].key) : '';
  
  let incomeCheckCopy: string[] = [];
      formModel.incomeCheck.ALL ? incomeCheckCopy.push(this.incconfirms[0].key) : '';
      formModel.incomeCheck.OFFICIAL ? incomeCheckCopy.push(this.incconfirms[1].key) : '';
      formModel.incomeCheck.UNOFFICIAL ? incomeCheckCopy.push(this.incconfirms[2].key) : '';
      formModel.incomeCheck.VERBAL ? incomeCheckCopy.push(this.incconfirms[3].key) : '';
      formModel.incomeCheck.NOTREQUIRED ? incomeCheckCopy.push(this.incconfirms[4].key) : '';
    
    // return new `Ipoteka` object containing a combination of original ipoteka value(s)
    // and deep copies of changed form model values
    const saveIpoteka: Ipoteka = {
      ipoteka_num:          null,  //this.ipoteka.ipoteka_num as number,
      ipoteka_name:         formModel.ipoteka_name as string,
            
      bank_num:             formModel.bank_num as number,
      region_num:           formModel.region_num as number,
      aim:                  aimsCopy as string[],
      houseMarket:          formModel.houseMarket as string,
      buildingIsAccredited: formModel.buildingIsAccredited as string,
      
      currency:             formModel.currency as string,
      creditRateFrom:        formModel.creditRateFrom as number,
      creditRateTo:          formModel.creditRateTo as number,
      creditSecurity:       formModel.creditSecurity as string,
      creditTermFrom:       formModel.creditTermFrom as number,
      creditTermTo:         formModel.creditTermTo as number,
      creditAmountFrom:      formModel.creditAmountFrom as number,
      creditAmountTo:        formModel.creditAmountTo as number,
      downPayment:          formModel.downPayment as number,
      incomeCheck:          incomeCheckCopy as string[],
      periodOfExam:         formModel.periodOfExam as number,
      
      borrowerAgeFrom:      formModel.borrowerAgeFrom as number,
      borrowerAgeTo:        formModel.borrowerAgeTo as number,
      registrationIsRequired:  formModel.registrationIsRequired as string,
      rusResidenceRequired:  formModel.rusResidenceRequired as string,
      
      payment:              formModel.payment as string,
      prePayment:           formModel.prePayment as number
    };
    return saveIpoteka;
  }
  
  ngOnInit() {
    this.createForm();
    console.log("begin  ngOnInit()");
    this.getRegions();
    this.getBanks();
     this.ipoteka = new Ipoteka();
    this.getIpoteki();
    
     this.btnDisabled = this.ipotekaForm.pristine;
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
  
  getIpoteki(): void {
    console.log("begin   getIpoteki()");
    this.ipotekaService.getIpoteki()
        .then(ipoteki => {
        //console.log('this.httpService.getUsers().then(users...  : table.component.ts');
        console.log(ipoteki);
        this.ipoteki = ipoteki})
        .then(ipoteki =>{
          // this.incIpotekaNum();
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
  // };
  
  onValueChanged(data?: any) {
    if (!this.ipotekaForm) { return; }
    const form = this.ipotekaForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'ipoteka_name': '',
    'creditRateFrom': ''
  };

  validationMessages = {
    'ipoteka_name': {
      'required':      'Ипотечная программа должна иметь название.'
    },
    'creditRateFrom': {
      'required':      'Обязательное поле',
      'pattern':    'pattern',
      'percent': 'percent!!'
    }
  };
  
  
}
