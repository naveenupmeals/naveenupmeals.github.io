import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  stockSentiment: any[] = [];
  stockName: any;
  stockList: any;

  months = [
    { id: 1, value: 'January' },
    { id: 2, value: 'February' },
    { id: 3, value: 'March' },
    { id: 4, value: 'April' },
    { id: 5, value: 'May' },
    { id: 6, value: 'June' },
    { id: 7, value: 'July' },
    { id: 8, value: 'August' },
    { id: 9, value: 'September' },
    { id: 10, value: 'October' },
    { id: 11, value: 'November' },
    { id: 12, value: 'December' }
  ]

  constructor(
    private router: Router,
    private stockService: ApiService,
    private activeRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    const symbol: any = this.activeRoute.params
    const symbolDetails = {
      symbol: symbol._value.id,
      fromDate: '2022-01-20',
      toDate: '2022-12-30'
    }
    this.getSentimateData(symbolDetails)
  }

  backBtn() {
    this.router.navigateByUrl("/")
  }

  getSentimateData(symbol: any) {
    this.stockService.giveStockDetails(symbol).subscribe((response: any) => {
      // this.stockSentiment = response.data.slice(Math.max(response.data.length - 3, 1))
      this.stockService.giveStockName(response.symbol).subscribe((res) => {
        this.stockList = res
        this.stockName = this.stockList.result.find((id: any) => id.symbol == response.symbol);
      })
      this.stockSentiment = response.data;
      this.stockSentiment.forEach(element => {
        element['monthValue'] = this.months.find((id: any) => id.id == element.month)?.value
      });
    })
  }
}
