import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { APIService } from '../app.service';
import { Auctions } from './auctions';
import { AuctionService } from './auction.service';
import { Items } from './items';
import { HttpHeaders } from '@angular/common/http';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Bids } from './bids';
import {DataTableModule} from "angular-6-datatable";
import { LoginUser } from '../login/loginuser';

export interface DialogData {
  auctionItemId: string;
  maxAutoBidAmount: number;
  bidderName: string;
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'rec-source': 'anuglar6FE',
    'userId': 'firstUser@ally.com'
  })
};
@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
@NgModule({
  imports: [MatDialogModule]
})
export class BiddingComponent implements OnInit {
  currentUser: LoginUser;
  auction:  Auctions[];
  bid : Bids;
  msg : string;
  constructor(private  apiService:  APIService, 
    private auctionService : AuctionService, 
    public dialog: MatDialog) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.getAuctions();
  }
  public  getAuctions() {
    console.log("*************************");
    this.apiService.getAuctionItems().subscribe((data:  Array<Auctions>) => {
        this.auction  =  data;
        console.log("data---->"+data);
    });
    //this.apiService.getAuctionItems().subscribe(auction => this.auction = auction);
  //   this.auctionService.getAuctions().subscribe((data:  Array<Auctions>) => {
  //     this.auction  =  data;
  //     console.log(data);
  // });
}
public add(reservePrice: number, itemId: string, description: string) {
  if (!itemId || !description || !reservePrice) { return; }
  const item : Items = { itemId, description } as Items;
  const newAuction : Auctions = { reservePrice, item} as Auctions;
  this.apiService.saveAuctionItem(newAuction)
  .subscribe(newAuct =>  {
    console.log("&&&&&&&&&&&result==>"+newAuct);
    newAuction.auctionItemId = newAuct.auctionItemId;
    newAuction.currentBid = 0;
    console.log("&&&&&&&&&&&newAuct.currentBid==>"+newAuction.currentBid);
    this.auction.push(newAuction);
});
}
openDialog(auctionId): void {
  const dialogRef = this.dialog.open(BiddingDialog, {
    height: '400px',
    width: '500px',
    data: {auctionItemId: auctionId}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result!=undefined) {
      console.log('The dialog was closed'+result!=undefined ? result.maxAutoBidAmount : 0 
    +" bn="+result!=undefined ? result.bidderName : ""
    +" itemId-"+result!=undefined ? result.auctionItemId : "");
    //const newAuction : Auctions = {}
    this.bid = result;//{result.auctionItemId, result.maxAutoBidAmount, result.bidderName} as Bids;
    console.log("bid-->"+this.bid.auctionItemId+" .maxAutoBidAmount-"+this.bid.maxAutoBidAmount);
    this.apiService.postBid(this.bid).subscribe(res => {
      console.log("res.result--->"+res.result);
      this.msg = res.result;
      this.getAuctions();
    })
    }
    console.log("result was undefined");
  });
}

}

@Component({
  selector: 'bidding-dialog',
  templateUrl: 'bidding-dialog.html',
 // styleUrls: ['@angular/material/prebuilt-themes/deeppurple-amber.css']
})
export class BiddingDialog {

  constructor(
    public dialogRef: MatDialogRef<BiddingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

//   changePosition() {
//     this.dialogRef.updatePosition({ top: '50px', left: '50px' });
// }

}
