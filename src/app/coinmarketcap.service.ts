import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptionsArgs } from '@angular/http';
import { environment } from  '../environments/environment'

@Injectable()
export class CoinmarketcapService {
  
  constructor(private http: Http, private httpClient: HttpClient){}

  getTitle(): any{
    
    var title = "www.litecoincharts.org" 
    return title 
  }

  /*getMaxRowIndex(): any{
    
    //return
    return this.http.get('http://localhost:3000/api/maxrow')
    .map(res => res.json());
  }*/
  
  postEmail(emailAddress: any): any{
    
    var email = {email: emailAddress}
    //return this.http.post('http://localhost:3000/api/email', email)
    return this.http.post(environment.aws_domain + 'email', email)

    .map(res => res.json());
  }

  getPriceChart(id:any): any{
    
    var route = ''
    
    if(id == 1){
      route = 'twelvehourchart'
    }
    else if(id == 2){
      route = 'onedaychart'
    }
    else if(id == 3){
      route = 'oneweekchart'
    }
    else if(id == 4){
      route = 'onemonthchart'
    }
    else if(id == 5){
      route = 'threemonthchart'
    }
    else{
      route = 'prices'
    }
    
    //return this.http.get('http://localhost:3000/api/' + route
    return this.http.get(environment.domain + route
    ).map(res => res.json());

  }
  
  getAllPrices(): any{
    
    //return this.http.get('http://localhost:3000/api/prices')
    return this.http.get(environment.domain+'prices')
    .map(res => res.json());
  }
  
  getCoinData(coin: String): any{
    
    var req = 'https://api.coinmarketcap.com/v1/ticker/' + coin + '/' 
    var result = '' 

    return this.httpClient.get(req).map(
      (response) => {
      var price = response[0]
      return price
    });
  }
  
  getCoinPrice(coin: String): any{
    
    var req = 'https://api.coinmarketcap.com/v1/ticker/' + coin + '/' 
    var result = '' 

    return this.httpClient.get(req).map(
      (response) => {
      var price = response[0]['price_usd']
      return price
    });
  }

  getNewsArticles(): any{

    const API_KEY = '1e1dd457048347c181ce2ececa790a54'
    var req = 'https://newsapi.org/v2/everything?' +
      'q=Litecoin Price&' +
      'sortBy=relevancy&' +
      'pageSize=10&' +
      'apiKey=' + API_KEY 
    return this.httpClient.get(req).map(
      (response) => {
      return response
    });
  }

}



