import { Component, Directive, ElementRef, Renderer2, ViewChild, Injectable} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { TwitterService } from '../../twitter.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

@Component({
  selector: 'twitterfeed',
  templateUrl: './twitterfeed.html',
  styleUrls: ['./twitterfeed.css'],
  providers: [TwitterService]
})

export class TwitterfeedComponent implements OnInit {

  tweets: any[] = []
  constructor(private twitter: TwitterService, 
    private http: Http, private httpClient: HttpClient) {
  }
  
  ngOnInit() {

    this.twitter.getAuthToken().subscribe(tok => {
      
      if(tok["success"] == false) {
        return
      }
      this.twitter.getTwitterFeed(tok).subscribe(tweets => {
        for(var i = 0; i < tweets.data.statuses.length; i++){
          var tweet = {created_at: tweets.data.statuses[i].created_at, 
            image_url: tweets.data.statuses[i].user.profile_image_url, 
            username: "http://twitter.com/" + tweets.data.statuses[i].user.screen_name, 
            text: tweets.data.statuses[i].text,
            screen_name: "@" + tweets.data.statuses[i].user.screen_name
          }
          console.log(tweet)
          this.tweets[i] = tweet 
        }
        
      });
    });
    
  }
  
}

