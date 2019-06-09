import { Component, Directive, ViewChild, ElementRef} from '@angular/core';
import { CoinmarketcapService } from './coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppHeaderComponent } from './components/header/app-header';
import { AppFooterComponent } from './components/footer/app-footer';
import { HomepageComponent } from './components/homepage/homepage';
import { SubscribeComponent } from './components/subscribe/subscribe';
import { TwitterfeedComponent } from './components/twitterfeed/twitterfeed';
import { CalculatorComponent } from './components/calculator/calculator';
import { MiningCalculatorComponent } from './components/miningcalculator/miningcalculator';
import { TwitterService } from './twitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CoinmarketcapService, TwitterService]
})

export class AppComponent implements OnInit {

  ngOnInit() { 
    //set app background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(216, 231, 231)';
  
  }
  
  constructor(private twitter: TwitterService, private coinmarketcap: CoinmarketcapService, private elementRef: ElementRef) { }
  
}



