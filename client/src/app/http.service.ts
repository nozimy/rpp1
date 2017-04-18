import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { Region } from './region';
import { Bank  } from './bank';
 
@Injectable()
export class HttpService{
    
    private usersUrl = 'https://rpp-nozimy.c9users.io/api/users';
    private regionsUrl = 'https://rpp-nozimy.c9users.io/api/regions';
    private banksUrl = 'https://rpp-nozimy.c9users.io/api/banks';
    
    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http){ }
     
    getData(){
        return this.http.get(this.usersUrl)
    }
    
    getUsers(): Promise<User[]> {
      return this.http.get(this.usersUrl)
                 .toPromise()
                 .then(response => {
                     console.log('response.json(), http.service.ts');
                     console.log(response.json().data);
                     return response})
                 .then( response => response.json().data  as User[])
                 .catch(this.handleError);
    }
    
    getRegions(): Promise<Region[]> {
      return this.http.get(this.regionsUrl)
                 .toPromise()
                 .then(response => {
                     //console.log('response.json(), http.service.ts');
                     //console.log(response.json().data);
                     return response})
                 .then( response => response.json().data  as Region[])
                 .catch(this.handleError);
    }
    
    getBanks(): Promise<Bank[]> {
      return this.http.get(this.banksUrl)
                 .toPromise()
                 .then(response => {
                     //console.log('response.json(), http.service.ts');
                     //console.log(response.json().data);
                     return response})
                 .then( response => response.json().data  as Bank[])
                 .catch(this.handleError);
    }
    
    getBanksByRegion(region_num: number): Promise<Bank[]> {
      //const url = `${{this.banksUrl}}?region_num=${{region_num}}`;
      const url = this.banksUrl+ '?region_num='+region_num;
      return this.http.get(url)
                 .toPromise()
                 .then(response => {
                     console.log('response.json(), http.service.ts');
                     console.log(response.json().data);
                     return response})
                 .then( response => response.json().data  as Bank[])
                 .catch(this.handleError);
    }
    
    deleteBank (bank_num: number):Promise<void> {
        const url = `${this.banksUrl}/${bank_num}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
        
    }
    
    // getOneBank(region_num: number): Promise<Bank> {
    //     const url = `${{this.banksUrl}}/${{region_num}}`;
    //   return this.http.get(url)
    //              .toPromise()
    //             //  .then(response => { return response})
    //              .then( response => response.json().data  as Bank)
    //              .catch(this.handleError);
    // }
    
    createBank(bank: Bank): Promise<Bank>{
        return this.http
        .post(this.banksUrl, JSON.stringify(bank), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Bank)
        .catch(this.handleError);
    }
    
    
    
    private handleError(error: any): Promise<any> {
      console.error('http.service.ts; An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}