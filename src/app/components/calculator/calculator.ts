import { Component, ViewChild, Injectable} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.css'],
  providers: [CoinmarketcapService]
})

export class CalculatorComponent implements OnInit {
  
  amount: any;
  currency1: SelectItem[];
  currency2: SelectItem[];
  selectedCurrency1: any;
  selectedCurrency2: any;

  ethereum: any;
  bitcoin: any;
  litecoin: any;
  ripple: any;

  abbr1:any;
  abbr2:any;
  rate: any;
  calculatePressed: boolean;

  calculate() {
    var name1 = this.selectedCurrency1["name"]
    var name2 = this.selectedCurrency2["name"]
    var price1 = 1
    var price2 = 1
    if(name1 == "Litecoin"){
      price1 = this.litecoin
      this.abbr1 = 'LTC'
    }
    else if(name1 == "Bitcoin"){
      price1 = this.bitcoin
      this.abbr1 = 'BTC'
    }
    else if(name1 == "Ripple"){
      price1 = this.ripple
      this.abbr1 = 'XRP'
    }
    else if(name1 == "Ethereum"){
      price1 = this.ethereum
      this.abbr1 = 'ETH'
    }
    if(name2 == "Litecoin"){
      price2 = this.litecoin
      this.abbr2 = 'LTC'
    }
    else if(name2 == "Bitcoin"){
      price2 = this.bitcoin
      this.abbr2 = 'BTC'
    }
    else if(name2 == "Ripple"){
      price2 = this.ripple
      this.abbr2 = 'XRP'
    }
    else if(name2 == "Ethereum"){
      price2 = this.ethereum
      this.abbr2 = 'ETH'
    }
    this.rate = price1/price2 * this.amount
    this.calculatePressed = true
  }

  ngOnInit() { 
    this.calculatePressed = false
    this.abbr1 = 'USD'
    this.abbr2 = 'USD'
  }
  
  constructor(private coinmarketcap: CoinmarketcapService) {

    this.currency1 = [
      {label:'Select', value:null},
      {label:'Bitcoin', value:{id:1, name: 'Bitcoin', code: 'BTC'}},
      {label:'Litecoin', value:{id:2, name: 'Litecoin', code: 'LTC'}},
      {label:'Ethereum', value:{id:3, name: 'Ethereum', code: 'ETH'}},
      {label:'Ripple', value:{id:4, name: 'Ripple', code: 'XRP'}},
      {label:'Dollars', value:{id:5, name: 'Dollars', code: 'USD'}}
    ];

    this.currency2 = [
       {label:'Select', value:null},
       {label:'Litecoin', value:{id:1, name: 'Litecoin', code: 'LTC'}},
       {label:'Bitcoin', value:{id:2, name: 'Bitcoin', code: 'BTC'}},
       {label:'Ethereum', value:{id:3, name: 'Ethereum', code: 'ETH'}},
       {label:'Ripple', value:{id:4, name: 'Ripple', code: 'XRP'}},
       {label:'USD', value:{id:5, name: 'USD', code: 'USD'}}
     ];

    this.coinmarketcap.getCoinData("bitcoin").subscribe(data => {
      this.bitcoin = data['price_usd']
    });
    this.coinmarketcap.getCoinData("ethereum").subscribe(data => {
      this.ethereum = data['price_usd']
    });
    this.coinmarketcap.getCoinData("litecoin").subscribe(data => {
      this.litecoin = data['price_usd']
    });
    this.coinmarketcap.getCoinData("ripple").subscribe(data => {
      this.ripple = data['price_usd']
    });
  }

}

