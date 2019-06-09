import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptionsArgs } from '@angular/http';
import { environment } from  '../environments/environment'

@Injectable()
export class TwitterService {
  
  constructor(private http: Http, private httpClient: HttpClient){}
  
  getTwitterFeed(tok: any): any{

    var token = {token: tok}
    return this.http.post(environment.domain+'twitterfeed', token)
    .map(res => res.json()); 
  }
  
  getAuthToken(): any{
    
    return this.http.get(environment.domain+'authorize'
    ).map(res => res.json());
  } 
  
}   