import { Component, ViewChild, Injectable} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SelectItem } from 'primeng/api';
import { OrderListModule } from 'primeng/orderlist';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'miningcalculator',
  templateUrl: './miningcalculator.html',
  styleUrls: ['./miningcalculator.css'],
  providers: [CoinmarketcapService]
})

export class MiningCalculatorComponent implements OnInit {
  
 // Hash Rate (KH/s)
 // Power (Watts):
 // Power Cost ($/kWh):
 // Difficulty: 
 // Block Reward
 // USD Value
 // Pool Fee (%)
  
  profitCalculations: any[];

  //parameters
  hashRate: any;
  power: any;
  powerCost: any;
  difficulty: any; 
  blockReward: any; 
  poolFee: any; 
  
  hashRateUnit: SelectItem[];
  //cryptocurrencies: SelectItem[];
  coins:SelectItem[];
  coinInfo: any[];
  selectedCoin:any;

  selectedhashRate: any;
  
  ethereum: any;
  bitcoin: any;
  litecoin: any;
  ripple: any;
  dash: any;
  zcash: any;
  
  calculatePressed: boolean;

  calculate() {

    this.calculatePressed = true

    var currentPrice = 0;
    var profit = 0;
    var revenue = 0;
    var coinData = this.coinInfo[0];    
    if(!this.hashRate || this.hashRate.length  ==  0) return
    var hrate = this.hashRate

    if(this.selectedhashRate.name == 'GH/s') { hrate = hrate * 1000 }
    else if(this.selectedhashRate.name == 'H/s') { hrate = hrate * 1000000000000 }
    else if(this.selectedhashRate.name == 'KH/s') { hrate = hrate * 1000000000 }
    else if(this.selectedhashRate.name == 'MH/s') { hrate = hrate * 1000000 }
    else if(this.selectedhashRate.name == 'TH/s') { hrate = hrate }

    if(this.selectedCoin == 'BTC') {
      coinData = this.coinInfo[0]; 
      currentPrice = parseFloat(this.bitcoin)
    }
    else if(this.selectedCoin == 'LTC') {
      coinData = this.coinInfo[1]; 
      currentPrice = parseFloat(this.litecoin)
    }
    else if(this.selectedCoin == 'ETH') {
      coinData = this.coinInfo[2]; 
      currentPrice = parseFloat(this.ethereum)
    }
    else if(this.selectedCoin == 'ZEC') {
      coinData = this.coinInfo[4]; 
      currentPrice = parseFloat(this.zcash)
    }
    else if(this.selectedCoin == 'DASH') {
      coinData = this.coinInfo[3]; 
      currentPrice = parseFloat(this.dash)
    }
    
    //Rev = Hash Rate / Total Network Hash Rate * Blocks per day * (Block reward + Average transaction fees per block)
    revenue = parseInt(hrate) / coinData.networkHashRate * coinData.blocksPerDay *  (coinData.blockReward)

    if(!this.power || this.power.length  ==  0 ||
      !this.powerCost || this.powerCost.length  ==  0) return
    
    var powerCost = (this.power/1000) * (this.powerCost*24)
    //Profit = Revenue - Operating Cost
    profit =  revenue * currentPrice - powerCost
    
    this.profitCalculations = [
      { timeFrame: 'Per Hour:', 
        coinsMined: (revenue/24).toString(), 
        revenue: (revenue/24*currentPrice).toFixed(2).toString(), 
        profit: (revenue/24*currentPrice - powerCost/24).toFixed(2).toString(), 
        power: (powerCost/24).toFixed(2).toString() },
      { timeFrame: 'Per Day:', 
        coinsMined: revenue.toString(), 
        revenue: (revenue*currentPrice).toFixed(2).toString(), 
        profit: (revenue*currentPrice - powerCost).toFixed(2).toString(),
        power: powerCost.toFixed(2).toString() },
      { timeFrame: 'Per Month:', 
        coinsMined: (revenue*30.5).toString(), 
        revenue: (revenue*30.5*currentPrice).toFixed(2).toString(), 
        profit: (revenue*30.5*currentPrice - powerCost*30.5).toFixed(2).toString(), 
        power: (powerCost*30.5).toFixed(2).toString() },
      { timeFrame: 'Per Year', 
        coinsMined: (revenue*365).toString(), 
        revenue: (revenue*365*currentPrice).toFixed(2).toString(), 
        profit: (revenue*365*currentPrice - powerCost*365).toFixed(2).toString(), 
        power: (powerCost*365).toFixed(2).toString() }
    ];

  }

  updateSelectedCoin(event: any){

    this.selectedCoin = event.value.code
  }

  ngOnInit() { 

    this.profitCalculations = [
      { timeFrame: 'Per Hour:', coinsMined: '--', revenue: '--', profit: '--', power: '--' },
      { timeFrame: 'Per Day:', coinsMined: '--', revenue: '--', profit: '--', power: '--' },
      { timeFrame: 'Per Month:', coinsMined: '--', revenue: '--', profit: '--', power: '--' },
      { timeFrame: 'Per Year', coinsMined: '--', revenue: '--', profit: '--', power: '--' }
    ];

  }
  
  constructor(private coinmarketcap: CoinmarketcapService) {
    
    this.hashRateUnit = [
      {label:'GH/s', value:{id:4, name: 'GH/s', code: 'GH'}},
      {label:'H/s', value:{id:1, name: 'H/s', code: 'H'}},
      {label:'KH/s', value:{id:2, name: 'KH/s', code: 'KH'}},
      {label:'MH/s', value:{id:3, name: 'MH/s', code: 'MH'}},
      {label:'TH/s', value:{id:5, name: 'TH/s', code: 'TH'}}
    ];
    
    this.selectedhashRate = this.hashRateUnit[0]

    this.coins = [
      
      {label:'Bitcoin', value:{id:1, name: 'bitcoin', code: 'BTC'}},
      {label:'Litecoin', value:{id:2, name: 'litecoin', code: 'LTC'}},
      {label:'Ethereum', value:{id:3, name: 'ethereum', code: 'ETH'}},
      {label:'Dash', value:{id:5, name: 'dash', code: 'DASH'}},
      {label:'Zcash', value:{id:6, name: 'zcash', code: 'ZEC'}}
    ];

    this.selectedCoin  = 'BTC'

    this.coinInfo = [
      
      //networkHashRate in TH/s
      {coin:'Bitcoin', networkHashRate: 48000000 , blockReward: 12.5 , blocksPerDay: 144 },
      {coin:'Litecoin', networkHashRate: 308 , blockReward: 25 , blocksPerDay: 576 },
      {coin:'Ethereum', networkHashRate: 153 , blockReward: 2 , blocksPerDay: 64000 },
      {coin:'Dash', networkHashRate: 3000 , blockReward: 3.11 , blocksPerDay: 546 },
      {coin:'Zcash', networkHashRate: 0.0046 , blockReward: 12.5 , blocksPerDay: 576 }
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
    this.coinmarketcap.getCoinData("dash").subscribe(data => {
      this.dash = data['price_usd']
    });
    this.coinmarketcap.getCoinData("zcash").subscribe(data => {
      this.zcash = data['price_usd']
    });
  }

}

