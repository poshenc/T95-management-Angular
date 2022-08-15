import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketStackApiService {

  constructor(
    private http: HttpClient
  ) { }

  getIntradayPriceData(stockName: string): Observable<any> {
    const httpOptions = {
      headers: {
        'x-api-key': 'c34Ab6QHAiaSm0vkrCj9v4Wa9qLFM7l68Xxexgy7'
      },
      params: { modules: 'defaultKeyStatistics,assetProfile' }
    };
    const url = 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=' + stockName
    return this.http.get(url, httpOptions)
  }


  // axios.request(options).then(function(response) {
  //   console.log('regularMarketPrice', response.data.quoteResponse.result[0].regularMarketPrice);
  //   console.log('regularMarketChange', response.data.quoteResponse.result[0].regularMarketChange)
  //   console.log('regularMarketChangePercent', response.data.quoteResponse.result[0].regularMarketChangePercent);
  // }).catch(function(error) {
  //   console.error(error);
  // });


}
