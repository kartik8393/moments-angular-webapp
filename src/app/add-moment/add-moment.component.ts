import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ApiService} from '../services/api.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.css']
})

export class AddMomentComponent implements OnInit {

  constructor(private route: ActivatedRoute,private service: ApiService, private router:Router) { }
  newMoment:any={tags:[]}
  imageUpdated=0
  showSaveLoader=false
  isNewEntry
  id
  isUpdate=false
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id=='new'){
      this.newMoment={}
      this.isNewEntry=true
      console.log(this.isNewEntry)
    }else{
      this.isUpdate=true
      this.getMoment(this.id)

    }
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  momentData
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: any = [
  ];
  

  getMoment(id){
    this.service.getRequest("moment/get?id="+id).subscribe(
      res => {
        let resp = (<any>res).body
        console.log(resp)
        if (resp.code == 200) {
          this.momentData=resp.data
          console.log(this.momentData)
          this.newMoment=this.momentData
          for(let item of this.momentData.tags){
            let tagg={
              name:item
            }
            this.tags.push(tagg)
          }
        }
        
      },
      err => {
          window.alert("Something went wrong")
      }
    )
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log(this.tags)

  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addmoment(user: NgForm){
    this.newMoment.tags=[]
    for(let item of this.tags){
      this.newMoment.tags.push(item.name)
    }
    let user_id=sessionStorage.getItem('userData')
    this.newMoment.user=user_id
    this.showSaveLoader=true
    console.log(this.newMoment)
    if(this.isUpdate==true){
      this.service.putRequest("moment/?id="+this.newMoment._id,this.newMoment).subscribe(
        res => {
          this.showSaveLoader = false; 
          let resp = (<any>res).body
          if (resp.code == 200) {
            window.alert("Moment updated succesfully")
            this.router.navigate(['/momentlist'])
          }
          else{
            // this.newMoment={}
            window.alert("Something went wrong")
          }
        },
        err => {
          this.showSaveLoader = false; 
          this.newMoment={}
            window.alert("Something went wrong")
        }
      )
    }
    else{
      this.service.postRequest("moment/",this.newMoment).subscribe(
        res => {
          this.showSaveLoader = false; 
          let resp = (<any>res).body
          if (resp.code == 200) {
            window.alert("Moment added succesfully")
            this.router.navigate(['/momentlist'])
          }
          else{
            this.newMoment={}
            window.alert("Something went wrong")
          }
        },
        err => {
          this.showSaveLoader = false; 
          this.newMoment={}
            window.alert("Something went wrong")
        }
      )
    }
    
    console.log(this.newMoment)
  }

  
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
    async getBase64Photo(event) {
      let file = event.target.files[0];
      this.newMoment.image=await this.toBase64(file);
      console.log(this.newMoment.image)
      this.imageUpdated=1
   }

}
