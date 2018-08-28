import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Auctions } from './bidding/auctions';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HandleError } from './http-error-handler.service';
import { Bids } from './bidding/bids';
import { LoginUser } from './login/loginuser';
//import { Http, Response, Headers, RequestOptions } from "@angular/http";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //'Authorization': 'my-auth-token'
      'rec-source': 'anuglar6FE',
      'userId': 'firstuser@ally.com'
    })
  };
@Injectable({
  providedIn: 'root'
})
export class APIService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
  API_URL = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private httpClient: HttpClient) {}

  getAuctionItems(){
    return this.httpClient.get<Auctions[]>(`${this.API_URL}/auction/v1/auctionItems`);
  }

  getAuctionItem(auctionItemId){
    return this.httpClient.get<Auctions>(`${this.API_URL}}/auction/v1/auctionItems/`, auctionItemId);
  }
//   saveAuctionItem(auctionItem, headers){
//     return this.httpClient.post<Auctions>(`${this.API_URL}/auction/v1/auctionItems`,auctionItem, headers);
//   }
saveAuctionItem(auctionItem: Auctions) : Observable<Auctions>{
    return this.httpClient.post<Auctions>(`${this.API_URL}/auction/v1/auctionItems`,auctionItem, httpOptions);
    // .pipe(
    //     catchError(this.handleError('saveAuctionItem', auctionItem))
    //   );
  }
  postBid(bid){ //, headers
    return this.httpClient.post<Bids>(`${this.API_URL}/auction/v1/bids`,bid, httpOptions);
    // .pipe(
    //     catchError(this.handleError('postBid', bid))
    // );
  }
//   deleteContact(contact){
//     return this.httpClient.delete(`${this.API_URL}/contacts/${contact.pk}`);
//   }
login(userName: string, password: string, firstName: string) {
    const loginuser : LoginUser = { userName, password, firstName} as LoginUser;
    return this.httpClient.post<any>(`${this.API_URL}/auction/v1/users/authenticate`, loginuser)
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            console.log("USER-->"+user);
            if (user && user.firstName && user.userName) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}
error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
}
}
