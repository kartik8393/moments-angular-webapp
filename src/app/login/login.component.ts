import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:AuthService, private router:Router) { }
  showSaveLoader=false
  newUser:any={}

  ngOnInit(): void {
    if(this.service.loggedIn()){
      this.router.navigate(['/momentlist'])
    }
  }

  loginUser(user: NgForm){
    this.showSaveLoader=true
    console.log(this.newUser)
    this.service.registerUser("users/login",this.newUser).subscribe(
      res => {
        this.showSaveLoader = false; 
        let resp = (<any>res)
        if (resp.code == 200) {
          window.alert("User login succesfully")
          sessionStorage.setItem("token",resp.data.token)
          sessionStorage.setItem("userData",resp.data._id)
          console.log(resp.data)
          this.router.navigate(['/momentlist'])
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
