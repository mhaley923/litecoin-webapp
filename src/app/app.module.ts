import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'; //for routing

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { CoinmarketcapService } from './coinmarketcap.service';
import { TwitterService } from './twitter.service';

//primeng
import { ButtonModule } from 'primeng/button';
import { DataListModule } from 'primeng/datalist';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';

import { AppHeaderComponent } from './components/header/app-header';
import { HomepageComponent } from './components/homepage/homepage';
import { SubscribeComponent } from './components/subscribe/subscribe';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound';
import { AppFooterComponent } from './components/footer/app-footer';
import { TwitterfeedComponent } from './components/twitterfeed/twitterfeed';
import { CalculatorComponent } from './components/calculator/calculator';
import { MiningCalculatorComponent } from './components/miningcalculator/miningcalculator';
import { AboutComponent } from './components/about/about';
import { BloglistComponent } from './components/bloglist/bloglist';
import { BlogpostComponent } from './components/blogpost/blogpost';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule, MatCard} from '@angular/material/card';

// Pass FusionCharts, Charts and FintTheme as dependencies.
// You can also pass all other FusionCharts modules such as
// PowerCharts, FusionMaps, Map Definitions, Widgets, Themes etc after FusionCharts.
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomepageComponent,
    SubscribeComponent,
    PagenotfoundComponent,
    AppFooterComponent,
    TwitterfeedComponent,
    CalculatorComponent,
    MiningCalculatorComponent,
    AboutComponent,
    BlogpostComponent,
    BloglistComponent
    
  ],
  imports: [
    
    RouterModule.forRoot([
      
      { path: '', component: HomepageComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'twitter', component: TwitterfeedComponent },
      { path: 'calculator', component: CalculatorComponent },
      { path: 'miningcalculator', component: MiningCalculatorComponent },
      { path: 'about', component: AboutComponent },
      { path: '404', component: PagenotfoundComponent },
      { path: 'blogs', component: BloglistComponent },
      
      { path: 'blogpost/1', component: BlogpostComponent },
      { path: 'blogpost/2', component: BlogpostComponent },
      { path: 'blogpost/3', component: BlogpostComponent },
      { path: 'blogpost/4', component: BlogpostComponent },
      { path: 'blogpost/5', component: BlogpostComponent },
      { path: 'blogpost/6', component: BlogpostComponent },
      { path: 'blogpost/7', component: BlogpostComponent },
      { path: 'blogpost/8', component: BlogpostComponent },
      { path: 'blogpost/9', component: BlogpostComponent },
      
      { path: '**', component: PagenotfoundComponent }
    ]),
    
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FusionChartsModule, //recently added,
    DataListModule, 
    ButtonModule,
    InputTextModule,
    FormsModule,
    MenuModule,
    DropdownModule,
    BrowserAnimationsModule,
    MatCardModule,
    OrderListModule,
    ListboxModule,
    TableModule
    
  ],
  
  providers: [CoinmarketcapService, TwitterService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
