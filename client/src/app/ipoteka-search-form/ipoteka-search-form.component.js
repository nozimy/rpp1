"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms'); //FormControl
var data_model_1 = require('./../forms/data-model');
var IpotekaSearchFormComponent = (function () {
    function IpotekaSearchFormComponent(ipotekaService, httpService, fb) {
        this.ipotekaService = ipotekaService;
        this.httpService = httpService;
        this.fb = fb;
        this.submitted = false;
        this.selectedRegion = "ALL";
        this.selectedBank = "ALL";
        this.aims = data_model_1.aims;
        this.currencies = data_model_1.currencies;
        this.houseMarkets = data_model_1.houseMarkets;
        this.accredits = data_model_1.accredits;
        this.loansecurities = data_model_1.loansecurities;
        this.incconfirms = data_model_1.incconfirms;
        this.requireds = data_model_1.requireds;
        this.paymenttypes = data_model_1.paymenttypes;
        this.Indexes = data_model_1.Indexes;
        this.createForm();
    }
    IpotekaSearchFormComponent.prototype.goToPaymentInfoPage = function () {
    };
    IpotekaSearchFormComponent.prototype.revert = function () { this.ngOnChanges(); };
    IpotekaSearchFormComponent.prototype.ngOnChanges = function () {
        this.ipotekaForm.reset({});
        //this.onValueChanged();
    };
    IpotekaSearchFormComponent.prototype.goBack = function () {
        this.submitted = false;
        this.revert();
    };
    IpotekaSearchFormComponent.prototype.createForm = function () {
        console.log("begin  createForm()");
        this.ipotekaForm = this.fb.group({
            // main: this.fb.group({ // <-- the child FormGroup
            region_num: ['', forms_1.Validators.required],
            bank_num: ['', forms_1.Validators.required],
            aim: ['', forms_1.Validators.required],
            houseMarket: ['', forms_1.Validators.required],
            buildingIsAccredited: ['', forms_1.Validators.required],
            // }),
            // creditTerms: this.fb.group({ // <-- the child FormGroup
            currency: ['', forms_1.Validators.required],
            creditRate: '',
            creditSecurity: ['', forms_1.Validators.required],
            creditTermFrom: '',
            creditTermTo: '',
            creditAmount: '',
            downPayment: '',
            incomeCheck: ['', forms_1.Validators.required],
            periodOfExam: '',
            // }),
            // reqForBorrower: this.fb.group({ // <-- the child FormGroup
            borrowerAge: '',
            registrationIsRequired: ['', forms_1.Validators.required],
            rusResidenceRequired: ['', forms_1.Validators.required],
            // }),
            // repayTerm: this.fb.group({ // <-- the child FormGroup
            payment: ['', forms_1.Validators.required],
            prePayment: ''
        });
    };
    IpotekaSearchFormComponent.prototype.onSubmit = function () {
        console.log("begin  onSubmit()");
        this.ipoteka = this.prepareSaveIpoteka();
        if (!this.ipoteka) {
            return;
        }
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
    };
    IpotekaSearchFormComponent.prototype.prepareSaveIpoteka = function () {
        console.log("begin  prepareSaveIpoteka()");
        var formModel = this.ipotekaForm.value;
        //return new `Ipoteka` object containing a combination of original ipoteka value(s)
        //and deep copies of changed form model values
        var saveIpoteka = {};
        // ipoteka_num:          this.ipoteka.ipoteka_num as number,
        formModel.bank_num === 'ALL' ? '' : saveIpoteka.bank_num = formModel.bank_num;
        formModel.region_num == 'ALL' ? '' : saveIpoteka.region_num = formModel.region_num;
        formModel.aim == 'ALL' ? '' : saveIpoteka.aim = formModel.aim;
        formModel.houseMarket == 'All';
        '';
        saveIpoteka.houseMarket = formModel.houseMarket;
        formModel.buildingIsAccredited == 'Любая';
        saveIpoteka.buildingIsAccredited = formModel.buildingIsAccredited;
        formModel.currency;
        saveIpoteka.currency;
        formModel.currency;
        (formModel.creditRate == null || formModel.creditRate == '') ? '' : saveIpoteka.creditRate = formModel.creditRate;
        formModel.creditSecurity;
        saveIpoteka.creditSecurity;
        formModel.creditSecurity;
        saveIpoteka.creditTermFrom;
        formModel.creditTermFrom;
        saveIpoteka.creditTermTo;
        formModel.creditTermTo;
        saveIpoteka.creditAmount;
        formModel.creditAmount;
        saveIpoteka.downPayment;
        formModel.downPayment;
        saveIpoteka.incomeCheck;
        formModel.incomeCheck;
        saveIpoteka.periodOfExam;
        formModel.periodOfExam;
        saveIpoteka.borrowerAge;
        formModel.borrowerAge;
        saveIpoteka.registrationIsRequired;
        formModel.registrationIsRequired;
        saveIpoteka.rusResidenceRequired;
        formModel.rusResidenceRequired;
        saveIpoteka.payment;
        formModel.payment;
        saveIpoteka.prePayment;
        formModel.prePayment;
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
    };
    IpotekaSearchFormComponent.prototype.deleteIpoteka = function (ipoteka) {
        var _this = this;
        this.ipotekaService
            .deleteIpoteka(ipoteka.ipoteka_num)
            .then(function () {
            _this.ipoteki = _this.ipoteki.filter(function (i) { return i !== ipoteka; });
            _this.ipotekiCount = _this.ipoteki.length;
        });
    };
    IpotekaSearchFormComponent.prototype.ngOnInit = function () {
        console.log("begin  ngOnInit()");
        this.getRegions();
        this.getBanks();
        // this.ipoteka = new Ipoteka();
        // this.getIpoteki();
        // this.btnDisabled = this.ipotekaForm.pristine;
    };
    IpotekaSearchFormComponent.prototype.getRegions = function () {
        var _this = this;
        console.log("begin  getRegions()");
        this.httpService.getRegions()
            .then(function (regions) {
            _this.regions = regions;
        });
    };
    IpotekaSearchFormComponent.prototype.getBanks = function () {
        var _this = this;
        console.log("begin  getBanks()");
        this.httpService.getBanks()
            .then(function (banks) {
            _this.banks = banks;
        });
    };
    IpotekaSearchFormComponent.prototype.getIpotekiByParam = function (ipoteka) {
        var _this = this;
        console.log("begin   getIpoteki()");
        this.ipotekaService.getIpotekiByParam(ipoteka)
            .then(function (ipoteki) {
            //console.log('this.httpService.getUsers().then(users...  : table.component.ts');
            console.log(ipoteki);
            _this.ipoteki = ipoteki;
            _this.ipotekiCount = _this.ipoteki.length;
        });
    };
    IpotekaSearchFormComponent = __decorate([
        core_1.Component({
            selector: 'app-ipoteka-search-form',
            templateUrl: './ipoteka-search-form.component.html',
            styleUrls: ['./ipoteka-search-form.component.css']
        })
    ], IpotekaSearchFormComponent);
    return IpotekaSearchFormComponent;
}());
exports.IpotekaSearchFormComponent = IpotekaSearchFormComponent;
