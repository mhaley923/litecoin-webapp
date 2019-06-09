import { Component, ViewChild} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.html',
  styleUrls: ['./app-footer.css'],
  providers: [CoinmarketcapService]
})

export class AppFooterComponent implements OnInit {
  
  ngOnInit() { 
  }
  
  constructor(private coinmarketcap: CoinmarketcapService){
  }
  

}

