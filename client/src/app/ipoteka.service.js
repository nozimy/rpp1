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
var IpotekaService = (function () {
    function IpotekaService(http) {
        this.http = http;
        this.ipotekiUrl = 'https://rpp-nozimy.c9users.io/api/ipoteki';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    IpotekaService.prototype.getIpoteki = function () {
        return this.http.get(this.ipotekiUrl)
            .toPromise()
            .then(function (response) {
            //  console.log('response.json(), ipoteka.service.ts');
            //  console.log(response.json().data);
            return response;
        })
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    IpotekaService.prototype.getIpotekiByParam = function (ipoteka) {
        var url = this.ipotekiUrl + "/search/?";
        for (var key in ipoteka) {
            if (ipoteka.hasOwnProperty(key)) {
                url += "&" + key + "=" + ipoteka[key];
            }
        }
        console.log(url);
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) {
            //  console.log('response.json(), ipoteka.service.ts');
            //  console.log(response.json().data);
            return response;
        })
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    IpotekaService.prototype.createIpoteka = function (ipoteka) {
        return this.http
            .post(this.ipotekiUrl, JSON.stringify(ipoteka), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    IpotekaService.prototype.deleteIpoteka = function (ipoteka_num) {
        var url = this.ipotekiUrl + "/" + ipoteka_num;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    IpotekaService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    IpotekaService = __decorate([
        core_1.Injectable()
    ], IpotekaService);
    return IpotekaService;
}());
exports.IpotekaService = IpotekaService;
