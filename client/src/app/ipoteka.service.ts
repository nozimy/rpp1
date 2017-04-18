import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ipoteka } from './ipoteka';
 
@Injectable()
export class IpotekaService{
    
    private ipotekaUrl = 'https://rpp-nozimy.c9users.io/api/ipoteka';
    
    
    constructor(private http: Http){ }
    
    getIpoteka(): Promise<Ipoteka[]> {
      return this.http.get(this.ipotekaUrl)
                 .toPromise()
                 .then(response => {
                    //  console.log('response.json(), ipoteka.service.ts');
                    //  console.log(response.json().data);
                    return response})
                 .then( response => response.json().data  as Ipoteka[])
                 .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}