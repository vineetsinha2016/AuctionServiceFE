import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIService } from  '../app.service';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { Auctions } from './auctions';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  @Injectable()
export class AuctionService {
  auctionUrl = 'http://localhost:8080/auction/v1/auctionItems';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AuctionService');
  }
   /** GET Auctions from the server */
   getAuctions (): Observable<Auctions[]> {
    return this.http.get<Auctions[]>(this.auctionUrl)
      .pipe(
        catchError(this.handleError('getAuctions', []))
      );
  }
}
