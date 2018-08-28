import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './notfound.component';
import { BiddingComponent, BiddingDialog } from './bidding/bidding.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from './app.service';
import { AuctionService } from './bidding/auction.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTableModule } from 'angular-6-datatable';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PageNotFoundComponent,
    BiddingComponent,
    BiddingDialog,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    DataTableModule
  ],
  entryComponents: [BiddingDialog],//important for new dialog
  providers: [AuctionService,
    HttpErrorHandler,
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
