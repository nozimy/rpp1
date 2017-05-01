export class Ipoteka {
  ipoteka_num:    number;
  ipoteka_name:   string;
  
  bank_num:       number;
  region_num:     number;
  aim:            string[];//aim: string[];
  houseMarket:    string;// houseMarket: string[];
  buildingIsAccredited: string;
  
  currency:       string;//currency: string[];
  creditRateFrom: number;
  creditRateTo:   number;
  creditSecurity: string;//  creditSecurity: string[];
  creditTermFrom: number;
  creditTermTo:   number;
  creditAmountFrom: number; //mixed
  creditAmountTo: number;
  downPayment:    number;
  incomeCheck:    string[];//incomeCheck: string[];
  periodOfExam:   number;
  
  borrowerAgeFrom:  number;
  borrowerAgeTo:    number;
  registrationIsRequired: string;
  rusResidenceRequired:   string;
  
  payment:        string;//payment: string[];
  prePayment:     number;
  //updated: string;
}