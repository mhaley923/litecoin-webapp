import { Component, Directive, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as _ from 'lodash';

@Component({
  selector: 'about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  providers: [CoinmarketcapService]
})

export class AboutComponent implements OnInit {
  
  ngOnInit() {
  }
  
  constructor(private coinmarketcap: CoinmarketcapService) {
  }

}