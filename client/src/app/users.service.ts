import { Injectable } from '@angular/core';
import { Headers, Http, Response  } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UsersService {
  private usersUrl = 'https://rpp-nozimy.c9users.io/api/users';  // URL to web api
  private userUrl = 'api/user';  // URL to web api
  
  constructor(private http: Http) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // private extractData(res: Response) {
  //   let body = res.json();
  //   console.log("usersService body:  "+body);
  //   return body.data || { };
  // }
  private extractData(res: Response) {
      return res.json().data || [];
  }
  
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
    
    // getUsers(): Promise<User[]> {
    //   return this.http.get(this.usersUrl)
    //             .toPromise()
    //             .then(response => response.json().data as User[])
    //             .catch(this.handleError);
    // }
    
    // private handleError(error: any): Promise<any> {
    //   console.error('An error occurred', error); // for demo purposes only
    //   return Promise.reject(error.message || error);
    // }
    
    
    
    //!!!
    // getUser(limit: number): Promise<User> {
    //   const url = `${this.userUrl}/${limit}`;
    //   return this.http.get(url)
    //     .toPromise()
    //     .then(response => response.json().data as User)
    //     .catch(this.handleError);
        
    // }
    
    // private headers = new Headers({'Content-Type': 'application/json'});

    // update(user: User): Promise<User> {
    //   const url = `${this.userUrl}/${user.id}`;
    //   return this.http
    //     .put(url, JSON.stringify(user), {headers: this.headers})
    //     .toPromise()
    //     .then(() => user)
    //     .catch(this.handleError);
    // }
    
    // create(name: string): Promise<User> {
    //   return this.http
    //     .post(this.userUrl, JSON.stringify({name: name}), {headers: this.headers})
    //     .toPromise()
    //     .then(res => res.json().data as User)
    //     .catch(this.handleError);
    // }
    
    // delete(id: number): Promise<void> {
    //   const url = `${this.userUrl}/${id}`;
    //   return this.http.delete(url, {headers: this.headers})
    //     .toPromise()
    //     .then(() => null)
    //     .catch(this.handleError);
    // }
    
    
    
}
