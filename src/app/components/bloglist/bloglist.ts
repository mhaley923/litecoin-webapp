import { Component, ViewChild, Injectable} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SelectItem } from 'primeng/api';
import { BlogpostComponent } from '../blogpost/blogpost'

@Component({
  selector: 'bloglist',
  templateUrl: './bloglist.html',
  styleUrls: ['./bloglist.css'],
  providers: []
})

export class BloglistComponent implements OnInit {
  
  ngOnInit() {
    
  }
  constructor() {
    
  }
  sendMessage() {
    console.log("In send message function")
  }
  
}
