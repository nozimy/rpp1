import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ipoteka } from './ipoteka';
 
@Injectable()
export class IpotekaService{
    
    private ipotekiUrl = 'https://rpp-nozimy.c9users.io/api/ipoteki';
    
    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http){ }
    
    getIpoteki(): Promise<Ipoteka[]> {
      return this.http.get(this.ipotekiUrl)
                 .toPromise()
                 .then(response => {
                    //  console.log('response.json(), ipoteka.service.ts');
                    //  console.log(response.json().data);
                    return response})
                 .then( response => response.json().data  as Ipoteka[])
                 .catch(this.handleError);
    }
    
    getIpotekiByParam(ipoteka: any): Promise<Ipoteka[]> {
        let url = `${this.ipotekiUrl}/search/?`;
        for ( let key in ipoteka ) {
            if (ipoteka.hasOwnProperty(key)) {
                url += `&${key}=${ipoteka[key]}`;
            }
        }
        console.log(url);
        return this.http
            .get(url)
            .toPromise()
            .then(response => {
                //  console.log('response.json(), ipoteka.service.ts');
                //  console.log(response.json().data);
                return response})
            .then( response => response.json().data  as Ipoteka[])
            .catch(this.handleError);
    }
    
    createIpoteka(ipoteka: Ipoteka): Promise<Ipoteka>{
        return this.http
        .post(this.ipotekiUrl, JSON.stringify(ipoteka), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Ipoteka)
        .catch(this.handleError);
    }
    
    deleteIpoteka(ipoteka_num: number): Promise<void>{
        const url = `${this.ipotekiUrl}/${ipoteka_num}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
        
    }
    
    getIpoteka(id: number): Promise<Ipoteka> {
      const url = `${this.ipotekiUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Ipoteka)
        .catch(this.handleError);
        
      // return this.getHeroes()
      //           .then(heroes => heroes.find(hero => hero.id === id));
    }
    
    
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}