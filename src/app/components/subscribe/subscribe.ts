import { Component, ViewChild, Injectable} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.html',
  styleUrls: ['./subscribe.css'],
  providers: [CoinmarketcapService]
})

export class SubscribeComponent implements OnInit {
  
  email: string;
  disabled: boolean = false;

  submitEmail() {
    
    if(this.disabled){
      return 
    }
    else if(this.validateEmail(this.email)){ //good email
      this.disabled = true
      this.coinmarketcap.postEmail(this.email).subscribe(result => {
        console.log(result)
      });
    }
    else{
      this.email = ""
    }
  }
  
  validateEmail(email:any) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return true
    }
    alert("You have entered an invalid email address!")
    return false
  }
  
  ngOnInit() { 
  }
  
  constructor(private coinmarketcap: CoinmarketcapService){
  }

}

