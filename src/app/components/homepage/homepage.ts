import { Component, Directive, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { CoinmarketcapService } from '../../coinmarketcap.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as _ from 'lodash';
import { SelectItem } from 'primeng/api';
import { templateJitUrl } from '@angular/compiler';
import { environment } from  '../../../environments/environment';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
  providers: [CoinmarketcapService]
})

export class HomepageComponent implements OnInit {

  @ViewChild('chart') el: ElementRef
  articleTitles = [] //Display top 3 relevant news articles
  articles = []
  blogs = []

  source: SelectItem[];
  selectedSource: any;
 
  halfDayPrices = []
  oneDayPrices = []
  oneWeekPrices = []
  oneMonthPrices = []
  threeMonthPrices = []


  halfDayDates: Date [];
  oneDayDates: Date [];
  oneWeekDates: Date [];
  oneMonthDates: Date [];
  threeMonthDates: Date [];

  oneDayHigh: number;
  oneDayLow: number;
  priceIncreased:boolean;
  percentPriceChange: number;

  ngOnInit() {
    
    let blog1 = {title: "How To Mine Litecoin", 
    description: "Cryptocurrency exists because of the blockchain  - a decentralized ledger of all transactions ever made for a specified coin. These transactions are stored and maintained across many computers, linked together through a peer-to-peer transactional network. This means Bitcoin, Ethereum, Litecoin, and every other cryptocurrency have their own dedicated blockchains. Every . . . ", 
    image: "assets/images/thumbnails/blog8.jpg", url: environment.domain+"blogpost/8"}

    let blog2 = {title: "How To Buy Litecoin", 
    description: "Litecoin is a virtual peer-to-peer currency that is decentralized like many other cryptocurrencies. Some see Litecoin, or LTC on coin exchanges, as the “silver” to Bitcoin’s “gold”.  Litecoin value reached an all time high over $360 in December 2017, as the cryptocurrency market capitalization peaked as well.  Out of the . . .", 
    image: "assets/images/thumbnails/blog9.jpg", url:  environment.domain+"blogpost/9"}
    
    let blog3 = {title: "Biggest Ways Crypto Taxes Could Affect You", 
    description: "In the eyes of U.S. Law, cryptocurrency is viewed as property. Therefore investors in cryptocurrencies like Bitcoin, Litecoin, etc. will be taxed the same way as real estate investors (for example) in terms of short and long term capital gains on any profit. This may actually benefit those with long . . . ", 
    image: "assets/images/thumbnails/blog3.jpg", url: environment.domain+"blogpost/3"}
    
    this.blogs.push(blog1)
    this.blogs.push(blog2)
    this.blogs.push(blog3)

    this.displayNews(5) //display x number of articles

    this.coinmarketcap.getAllPrices().subscribe(prices => {
      
      this.getChartData(1);

      /*var len = prices['recordset'].length
      var pricesArr = []
      var datetimes = []
      for(var i = 0; i < len; i++){
        var price = prices['recordset'][i]['price'];
        //var datetime = prices['recordset'][i]['datetime'];
        var datetime = this.parseDate(prices['recordset'][i]['datetime'])
        pricesArr.push(price)
        datetimes.push(datetime)
      }
      this.plotChart(pricesArr, datetimes)*/
    });
  }
  
  constructor(private coinmarketcap: CoinmarketcapService) {

    this.source = [
      {label:'Source', value:null},
      {label:'All', value:{id:1, name: 'All'}},
      {label:'Coinmarketcap', value:{id:2, name: 'Coinmarketcap'}},
      {label:'Coinbase', value:{id:3, name: 'Coinbase'}}
    ];
  }

  displayChart(number:any){

    console.log("display chart number " + number)

    if(number == 1){
      this.plotChart(this.halfDayPrices, this.halfDayDates)
    }
    else if(number == 2){
      this.plotChart(this.oneDayPrices, this.oneDayDates)
    }
    else if(number == 3){
      this.plotChart(this.oneWeekPrices, this.oneWeekDates)
    }
    else if(number == 4){
      this.plotChart(this.oneMonthPrices, this.oneMonthDates)
    }
    else if(number == 5){
      this.plotChart(this.threeMonthPrices, this.threeMonthDates)
    }
  }

  getChartData(number:any){

    console.log("Get chart data " + number)

    this.coinmarketcap.getPriceChart(number).subscribe(data => 
      {        
        var len = data['recordset'].length
        var pricesArr = []
        var datetimes = []
        
        for(var i = 0; i < len; i++){
          var price = data['recordset'][i]['price'];
          var datetime = this.parseDate(data['recordset'][i]['datetime']) 
          
          if(number == 1)
            console.log("12 hr + " + price + " " + datetime)
          if(number == 2)
            console.log("1 day + " + price + " " + datetime)

          pricesArr.push(price)
          datetimes.push(datetime)
        }

        switch(number){

          case 1:
            this.halfDayPrices = pricesArr;
            this.halfDayDates = datetimes;
          case 2:
            this.oneDayPrices = pricesArr;
            this.oneDayDates = datetimes;
          case 3:
            this.oneWeekPrices = pricesArr;
            this.oneWeekDates = datetimes;
          case 4:
            this.oneMonthPrices = pricesArr;
            this.oneMonthDates = datetimes;
          case 5:
            this.threeMonthPrices = pricesArr.reverse();
            this.threeMonthDates = datetimes.reverse();
          case 6:
          default:
        }
        if(number == 1){
          this.displayChart(number);
        }
        if(number == 2){
          this.setHighAndLowPrice()
        }
        if(number < 5){
          this.getChartData(number + 1);
        }
      })
  }

  //set 24 hour high and low
  setHighAndLowPrice(){
    
    if (!this.oneDayPrices || this.oneDayPrices.length == 0) return

    this.oneDayHigh = this.oneDayPrices[0]
    this.oneDayLow = this.oneDayPrices[0]

    var highIndex = 0;
    var lowIndex = 0;

    for(var i = 1; i < this.oneDayPrices.length; i++){

      if(this.oneDayPrices[i]  < this.oneDayLow){
        this.oneDayLow =parseFloat(parseFloat(this.oneDayPrices[i]).toFixed(2))
        lowIndex = i 
      }
      if(this.oneDayPrices[i] > this.oneDayHigh){
        this.oneDayHigh = parseFloat(parseFloat(this.oneDayPrices[i]).toFixed(2))
        highIndex = i
      }
    }

    this.priceIncreased = highIndex >= lowIndex 

    if(this.priceIncreased) 
      this.percentPriceChange = parseInt(((this.oneDayHigh/this.oneDayLow - 1) * 100).toFixed(2))
    else 
      this.percentPriceChange = parseInt(((this.oneDayHigh/this.oneDayLow - 1) * 100).toFixed(2))

  }

  reverseData(prices: any, datetimes: any){
     datetimes.reverse()
     prices.reverse()
  }

  plotChart(prices: any, datetimes: any){

    Plotly.purge(this.el.nativeElement)
    
    var x = datetimes
    var y = prices
    
    const element = this.el.nativeElement
    const data = [{
      x: x,
      y: y,
      mode: 'line'
      //line: {color: '#80CAF6'}
    }]
    
    const style = { margin: {t: 0}, 
      automargin: true,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      yaxis: {title: 'Price in US Dollars', font: { size: 48} },
      xaxis: {automargin: true, scaleanchor: 3}
    }
      //TODO end of datetimes get cut off
    
    
    Plotly.plot(element, data, style)
  }

  parseDate(date: any){

    if(date == null) return ""
    // example 12 21 2018 05:00
    
    var dateData = new Date(date)
    var dateData2 = date.split(' ')

    var minutes = dateData.getMinutes().toString()
    var hours = dateData.getHours().toString()
    var day = dateData2[1]
    var month = dateData2[0]

    if(minutes.length == 1) minutes = '0' + minutes
    if(hours.length == 1) hours = '0' + hours
    if(day.length == 1) day = '0' + day
    if(month.length == 1) month = '0' + month  

    return dateData.getFullYear() + '-' + month
     + '-' + day + ' ' + hours + ':' + minutes + ':00'

  }

  displayNews(count: number){
    //get top x relevant LTC news articles to display on home page
    this.coinmarketcap.getNewsArticles().subscribe(news => {
      
      var jsonArticles = news["articles"]
      var numArticles = 0 //will be 3
      var sources = [] // dont use more than 2 articles from same website

      for(var i = 0; i < jsonArticles.length; i++){ //find articles with LTC in title
        
        if(jsonArticles[i] == null){
          continue
        }

        var title = jsonArticles[i]["title"]
        var descr = jsonArticles[i]["description"]
        var img = jsonArticles[i]["urlToImage"]
        var url =  jsonArticles[i]["url"]
        
        if(img == null){ //placeholder image
          img = 'https://stimulating-conversation.com/wp-content/themes/pashmina/images/blank.png'; 
        }
        if(title.toLowerCase().indexOf("litecoin") !== -1){
            if(numArticles < count){
              let atc = {title: title, description: descr, image: img, url: url}
              this.articles.push(atc)             
              jsonArticles.splice(i, 1)
              numArticles = numArticles + 1   
            }
        }
      }

      for(var j = 0; j < count-numArticles; j++){ //then find most popular articles related to search
        
        if(jsonArticles[j] == null) continue
        
        // dont use more than 2 articles from same website
        var source = jsonArticles[j]["source"]["name"]

        if(sources[source] == null) sources[source] = 0
        else if(sources[source] >= 1) continue  
        else  sources[source] += 1
        
        let atc = {title: jsonArticles[j]["title"], description: jsonArticles[j]["description"], image: jsonArticles[j]["urlToImage"]}
        this.articles.push(atc)
      }
    });
  }

}
