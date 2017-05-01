"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.usersUrl = 'https://rpp-nozimy.c9users.io/api/users';
        this.regionsUrl = 'https://rpp-nozimy.c9users.io/api/regions';
        this.banksUrl = 'https://rpp-nozimy.c9users.io/api/banks';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    HttpService.prototype.getData = function () {
        return this.http.get(this.usersUrl);
    };
    HttpService.prototype.getUsers = function () {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (response) {
            console.log('response.json(), http.service.ts');
            console.log(response.json().data);
            return response;
        })
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HttpService.prototype.getRegions = function () {
        return this.http.get(this.regionsUrl)
            .toPromise()
            .then(function (response) {
            //console.log('response.json(), http.service.ts');
            //console.log(response.json().data);
            return response;
        })
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HttpService.prototype.getBanks = function () {
        return this.http.get(this.banksUrl)
            .toPromise()
            .then(function (response) {
            //console.log('response.json(), http.service.ts');
            //console.log(response.json().data);
            return response;
        })
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HttpService.prototype.getBanksByRegion = function (region_num) {
        //const url = `${{this.banksUrl}}?region_num=${{region_num}}`;
        var url = this.banksUrl + '?region_num=' + region_num;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            console.log('response.json(), http.service.ts');
            console.log(response.json().data);
            return response;
        })
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HttpService.prototype.deleteBank = function (bank_num) {
        var url = this.banksUrl + "/" + bank_num;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    // getOneBank(region_num: number): Promise<Bank> {
    //     const url = `${{this.banksUrl}}/${{region_num}}`;
    //   return this.http.get(url)
    //              .toPromise()
    //             //  .then(response => { return response})
    //              .then( response => response.json().data  as Bank)
    //              .catch(this.handleError);
    // }
    HttpService.prototype.createBank = function (bank) {
        return this.http
            .post(this.banksUrl, JSON.stringify(bank), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    HttpService.prototype.handleError = function (error) {
        console.error('http.service.ts; An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HttpService = __decorate([
        core_1.Injectable()
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
