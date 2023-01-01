import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { StockListModel } from '../stock-list-model';

@Component({
  selector: 'app-track-stock',
  templateUrl: './track-stock.component.html',
  styleUrls: ['./track-stock.component.css']
})
export class TrackStockComponent implements OnInit {

  arr: StockListModel[] = [];
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  displayBox: string = '';
  getBox(box: string) {
    console.warn(box);
    this.displayBox = box;
  }
  stocks: any;
  dataArr: any = [];
  selectedStocks: any = [];

  constructor(
    private stockService: ApiService,
    private router: Router,
    
    ) { }
  ngOnInit(): void {
    if (localStorage.getItem('stock')) {
      localStorage.removeItem('stock');
    }
  }
  inputValue = '';
  stockNames: any = [];
  stockDetails: any = [];
  getterStock() {
    if (!this.selectedStocks.includes(this.inputValue)) {
      this.selectedStocks.push(this.inputValue)
    }
    localStorage.setItem('stocks', this.selectedStocks);
    this.stockService.giveStock(this.inputValue).subscribe((data) => {
      this.stocks = data;
    });
    this.stockService.giveStockName(this.inputValue).subscribe((data1) => {
      this.stockNames = data1;
      // this.stockNames = this.stockNames.result[0].description;
        this.arr.push({
          stockName: this.stockNames.result[0].description,
          stockSymbol : this.stockNames.result[0].symbol,
          changeToday: this.stocks?.d,
          currentPrice: this.stocks?.c,
          openingPrice: this.stocks?.o,
          highest: this.stocks?.h,
        });
    });

  }

  navigateToSentimate(stockSymbol : any){
    this.router.navigateByUrl(`/sentiment/${stockSymbol}`)
  }

}
