import { Component, ViewChild, Injectable} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css'],
  providers: [CoinmarketcapService]
})

export class AppHeaderComponent implements OnInit {

  ripplePrice: any
  litecoinPrice: any
  volume: any 
  marketCap: any
  items: MenuItem[]

  ngOnInit() { 
    
    this.getLitecoinData()
    this.items = [
      {label: 'Calculator', routerLink: "/calculator", routerLinkActiveOptions:"active"},
      {label: 'Mining Calculator', routerLink: "/miningcalculator", routerLinkActiveOptions:"active"},
      {label: 'Twitter Feed', routerLink: "/twitter", routerLinkActiveOptions:"active"},  
      {label: 'Blog', routerLink: "/blogs", routerLinkActiveOptions:"active"},
      {label: 'About Us', routerLink: "/about", routerLinkActiveOptions:"active"}
    ]
  }
  
  constructor(private coinmarketcap: CoinmarketcapService){
  }

  getLitecoinData(){
    this.coinmarketcap.getCoinData("litecoin").subscribe(data => {
      this.litecoinPrice = data['price_usd']
      this.volume = this.numberWithCommas(data['24h_volume_usd'])
      this.marketCap = this.numberWithCommas(data['market_cap_usd'])
    });
  }
  
  numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

}

