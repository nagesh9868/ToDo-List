import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { toDoInfo } from '../DataTypes/toDo';
import { ToDoService } from '../services/to-do.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface errorMsg {
  errorMessageTitle?: string,
  errorMessageDesc?: string
}

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  constructor(private service: ToDoService, private route: Router, private activeRoute:ActivatedRoute) { }
  isLoading: boolean = false
  titleText: string = ""
  descText: string = ""
  listData:any
  searchData:any = (localStorage.getItem('search'))
  errorObj: errorMsg = {
    errorMessageTitle: "Must Enter a Title",
    errorMessageDesc: "Must Enter the Description"
  }
  errorMessageTitle: string = "Must Enter a Title"
  errorMessageDesc: string = "Must Enter the Description"
  userId:any = this.service.userId
  ngOnInit(): void {
    this.service.getInfofromApi(this.userId).subscribe((res) => {  
      this.listData = res
    })
    
    this.service.searchData.subscribe((res)=>{
      this.listData = res
    })
    console.log(this.searchData); 
  }

  addToDo(toDoData: toDoInfo) {

    this.isLoading = true
    let newToDoData = {
      ...toDoData,
      userId:this.service.userId,
      dateTime: this.service.getCurrentDate()
    }
    this.service.addToDoApi(newToDoData).subscribe((result) => {
      console.log(result);
      if (result) {
        this.service.getInfofromApi(this.userId).subscribe((res) => {
          this.listData = res
          console.log(this.listData);
          this.isLoading = false
        })
      }
    })
    this.titleText = ""
    this.descText = ""
    setTimeout(() => {
      this.errorMessageTitle = ""
      this.errorMessageDesc = ""
      console.log(new Date());
    });
  }
}