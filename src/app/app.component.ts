import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moments-angular';
  events: string[] = [];
  opened: boolean=true;
  constructor(private router:Router){}

  isLoggedIn(){
    if(this.router.url === '/' || this.router.url === '/login' || this.router.url === '/register'){
     return false;
   }else{
     return true;
   }
 }

 logout(){
  sessionStorage.removeItem('token')
  this.router.navigate(['/login'])
 }

 routeTo(url){
   this.router.navigate([url])
 }
}
