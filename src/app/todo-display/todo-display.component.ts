import { Component, OnInit, Input } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { toDoInfo } from '../DataTypes/toDo';
import { ActivatedRoute, Router } from '@angular/router';
import { literalMap } from '@angular/compiler';

@Component({
  selector: 'app-todo-display',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.css']
})
export class TodoDisplayComponent implements OnInit {
  @Input() listData: any
  titleEdit: number | undefined
  todoid: number = 0
  titleInput: string | undefined
  descInput: string | undefined
  formData: any
  formBtn:boolean = false
  popupVisible:boolean = false
  popupTodotitle:string|undefined
  popupTodoId:number = 0
  constructor(private service:ToDoService, private activeRoute:ActivatedRoute, private route:Router) { }

  ngOnInit(): void {       
  }

  showPopup(id: number, title:string) {
    this.popupTodotitle = title
    this.popupTodoId = id
    this.popupVisible = true
  }
  
  deleteToDo(id:number){
    this.popupVisible = false
    this.service.toDoDelete(id).subscribe((res) => {
      if (res) {
        this.service.getInfofromApi(this.service.userId).subscribe((result: any) => {
          this.listData = result
        })
      }
    })
  }

  cancelDelete(){
    this.popupVisible = false
  }


  editToDo(id: number) {
    this.titleEdit = id
    this.todoid = id
  }

  updateToDo(data: toDoInfo, id: number) {
    this.listData.forEach((item: any) => {
      if (item.id === id) {
        let newData = {
          ...data,
          userId:this.service.userId,
          dateTime: this.service.getCurrentDate(),
          id: item.id
        }
        console.log(newData);
        this.formData = newData
      }
    });
    this.service.toDoUpdate(this.formData).subscribe((result) => {
      if (result) {
        this.service.getInfofromApi(this.service.userId).subscribe((updatedList) => {
          this.titleEdit = id*0
          this.todoid = id*0
          this.listData = updatedList
        }) 
      }
    })
  }
  
}


