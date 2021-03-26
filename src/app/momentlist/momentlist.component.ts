import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-momentlist',
  templateUrl: './momentlist.component.html',
  styleUrls: ['./momentlist.component.css']
})
export class MomentlistComponent implements OnInit {

  constructor(private route: ActivatedRoute,private service: ApiService, private router:Router) { }
  momentData=[]
  serverUrl=environment.upload_url
  ngOnInit(): void {
    let user=sessionStorage.getItem('userData')
    this.getMoments(user)
  }

  routeToMoment(url){
    this.router.navigate(['/moment/'+url])
  }

  getMoments(id){
    this.service.getRequest("moment?user="+id).subscribe(
      res => {
        let resp = (<any>res).body
        console.log(resp)
        if (resp.code == 200) {
          this.momentData=resp.data
          console.log(this.momentData)
        }
        
      },
      err => {
          window.alert("Something went wrong")
      }
    )
  }

  deleteItem(id){
    console.log(id)
    this.service.deleteRequest("moment?id="+id).subscribe(
      res => {
        let resp = (<any>res).body
        console.log(resp)
        if (resp.code == 200) {
          alert("Deleted Successfully")
          let user = sessionStorage.getItem('userData')
          this.getMoments(user)
        }
        
      },
      err => {
          window.alert("Something went wrong")
      }
    )
  }

}
