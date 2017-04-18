import { Component, OnInit, Input }                 from '@angular/core';
import { FormBuilder, FormGroup, Validators }     from '@angular/forms'; //FormControl

import { Region } from './../region';
import { Bank  } from './../bank';

import { Response} from '@angular/http';
import { HttpService} from './../http.service';



@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {
  // @Input() bank = Bank;
  
  bank: Bank;
  bankForm: FormGroup;
  regions: Region[];
  banks: Bank[];
  shortNameChangeLog: string[] = [];
  selectedRegion: string;
  message: string;
  
  constructor(
      private httpService: HttpService,
      private fb: FormBuilder) { // <--- inject FormBuilder
      
      this.createForm();
      this.logShortNameChange();
  }
  
  createForm() {
    this.bankForm = this.fb.group({
      //bank_num: ['', Validators.required ],
      region_num: ['', Validators.required ],
      shortName: '',
      fullName: ['', Validators.required ]
    });
  }

  logShortNameChange() {
    const shortNameControl = this.bankForm.get('shortName');
    shortNameControl.valueChanges.forEach(
      (value: string) => this.shortNameChangeLog.push(value)
    );
  }
  
  onSubmit() {
    this.bank = this.prepareSaveBank();
    
    if (!this.bank || !this.bank.bank_num) { return; }
    console.log(this.bank);
    
    this.httpService.createBank(this.bank)
        .then(bank => {
            console.log('new added bank');
            console.log(bank);
            this.banks.push(bank);
            this.incBankNum();
            // this.selectedHero = null;
          })
          .catch((reason) =>{ this.message = "Ошибка создания."});
        // this.ngOnChanges();
        console.log(this.banks);
  }
  
  prepareSaveBank(): Bank {
    const formModel = this.bankForm.value;

    // // deep copy of form model lairs
    // const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
    //   (address: Address) => Object.assign({}, address)
    // );

    // return new `Bank` object containing a combination of original bank value(s)
    // and deep copies of changed form model values
    const saveBank: Bank = {
      bank_num: this.bank.bank_num as number,
      shortName: formModel.shortName as string,
      fullName: formModel.fullName as string,
      // addresses: formModel.secretLairs // <-- bad!
      // addresses: secretLairsDeepCopy // <-- goood!
      region_num: formModel.region_num as number
    };
    return saveBank;
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
        //console.log('this.httpService.getUsers().then(users...  : table.component.ts');
        console.log(banks);
        this.banks = banks})
        .then(banks =>{
          this.incBankNum();
        });
  }
  
  incBankNum(): void {
    if (this.banks ){
      this.bank.bank_num = this.banks.length
      this.bank.bank_num++;
    } else {
      this.bank.bank_num = null;
    }
  }
  
  ngOnInit() {
    this.getRegions();
    this.bank = new Bank();
    this.getBanks();
  }

  
  // bankForm = new FormGroup ({
  //   shortName: new FormControl(),
  //   fullName: new FormControl()
  // });
  
}
