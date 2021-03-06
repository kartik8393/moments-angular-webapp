import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:AuthService,private router:Router) { }
  showSaveLoader=false
  newUser:any={}

  ngOnInit(): void {
    if(this.service.loggedIn()){
      this.router.navigate(['/momentlist'])
    }
  }

  updateUser(user: NgForm){
    this.showSaveLoader=true
    console.log(this.newUser)
    this.service.registerUser("users/register",this.newUser).subscribe(
      res => {
        this.showSaveLoader = false; 
        let resp = (<any>res)
        if (resp.code == 200) {
          window.alert("User added succesfully")
          this.router.navigate(['/login'])
        }
        else{
          this.newUser={}
          window.alert("Something went wrong")
        }
      },
      err => {
        this.showSaveLoader = false; 
        this.newUser={}
          window.alert("Something went wrong")
      }
    )
  }

}
