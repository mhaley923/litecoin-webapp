import { Component, Input, ViewChild, Injectable} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SelectItem } from 'primeng/api';
import { BloglistComponent } from '../bloglist/bloglist'
import { Compiler, Injector, VERSION, NgModule, NgModuleRef, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'blogpost',
  templateUrl: './blogpost.html',
  styleUrls: ['./blogpost.css'],
  providers: []
})

export class BlogpostComponent implements OnInit {

  // https://stackoverflow.com/questions/45376628/angular-2-4-component-with-dynamic-template-or-templateurl
  
  blog = "Bloggg"
  show:boolean = false;

  @ViewChild('vc', {read: ViewContainerRef}) vc;

  constructor(private _compiler: Compiler,
              private _injector: Injector,
              private _m: NgModuleRef<any>) {
  }

  ngOnInit() {
    console.log(window.location.pathname)
    this.blog = window.location.pathname.toString()
  }

  ngAfterViewInit() {
    
    if(this.blog == "/blogpost/1"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog1.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/2"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog2.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/3"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog3.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/4"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog4.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/5"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog5.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/6"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog6.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/7"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog7.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/8"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog8.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
    else if(this.blog == "/blogpost/9"){
      const comp = Component({
        moduleId: module.id, templateUrl: './blogs/blog9.html'})(class {
      });
      this.displaySelectedBlogPost(comp)
    }
  }

  displaySelectedBlogPost(blogComponent:any){

    var tmpModule = NgModule({declarations: [blogComponent]})(class { });

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
    .then((factories) => {
      const f = factories.componentFactories[0];
      const cmpRef = f.create(this._injector, [], null, this._m);
      cmpRef.instance.name = 'dynamic';
      this.vc.insert(cmpRef.hostView);
    })
    
  }

}


