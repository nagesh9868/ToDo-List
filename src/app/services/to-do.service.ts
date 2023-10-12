import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { register, toDoInfo } from '../DataTypes/toDo';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  toDoApi: string = "http://localhost:3000/toDoApi"
  toRegister: string = "http://localhost:3000/toRegister"
  toLogin:string = "http://localhost:5000/"
  public searchData = new Subject<any>()
  userName: string | undefined = ""
  public isLogin = new Subject<register>()
  public duplicateMsg = new Subject<string>()
  loginError:string|undefined
  userId:any
  constructor(private http: HttpClient, private route: Router, private authService:AuthenticationService) { }

  getInfofromApi(userId:number) {   
    return this.http.get(this.toDoApi +`?userId=${userId}`)    
  }
  addToDoApi(toDoInfo: toDoInfo) {
    return this.http.post(this.toDoApi, toDoInfo)
  }

  toDoDelete(id: number) {
    return this.http.delete(this.toDoApi + `/${id}`)

  }

  toDoUpdate(item: toDoInfo) {
    console.log(item);
    return this.http.put<toDoInfo>(this.toDoApi + `/${item.id}`, item)
  }

  getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri" , "Sat"]
    let hh = today.getHours()
    let min = today.getMinutes()
    let ss = today.getSeconds()
    let day = today.getDay()
    let fullDate = `|${days[day]}| ` + mm + '-' + dd + '-' + yyyy + ` (${hh < 10 ? "0" : ""}${hh}:${min < 10 ? "0" : ""}${min}:${ss < 10 ? "0" : ""}${ss})`;
    console.log('HH', hh);
    return fullDate
  }

  searchTodo(searchText:string, userId:number = this.userId) {
    this.http.get(this.toDoApi+`?userId=${userId}`).subscribe((result)=>{
      if(result){        
        let resultStr = JSON.stringify(result)
        let resultPrs = JSON.parse(resultStr)
        let resultFilter = resultPrs.filter((searchData:any)=>(searchData.title && searchData.desc).toLowerCase().includes(searchText.toLowerCase()));
          this.searchData.next(resultFilter)
      }
    })
  }

  registerForm(register: any) {
    console.log(register, "$$$$$$$$$$");
    let a = JSON.stringify(register).toLowerCase()
    let b = JSON.parse(a)
    this.http.get<register[]>(this.toRegister + `?name=${b.name}&email=${b.email}`).subscribe((res)=>{
      console.log(res.length);
      
      if(res.length === 0){
        console.log("if condition");
        
        this.http.post<register>(this.toRegister, b, { observe: 'response' }).subscribe((result) => {
          console.log(result);
          if(result.body){
            this.route.navigate(['/home'])
            this.isLogin.next(result.body)
            this.userName = result.body.name 
          }          
        })
      }else{
        this.duplicateMsg.next("User name or Mail ID is already exist")
        console.log("else condition");
        
      }
    })
  }
  loginForm(loginInfo: any) {
    this.http.get<register[]>(this.toRegister + `?email=${loginInfo.email}&password=${loginInfo.password}`, { observe: 'response' }).subscribe((result) => {
      console.log(result);     
      if (result.body?.length) {
        this.route.navigate(['home'])
        this.isLogin.next(result.body[0])
        this.userName = result.body[0].name
        this.userId = result.body[0].id
      }else{
        this.loginError = "Email ID or Password is incorrect"
      }
    })
  }

  // loginForm(loginInfo: any){
  //   this.http.post(this.toLogin+'login',loginInfo).subscribe((result:any)=>{
  //     if(result){
  //       localStorage.setItem('Auth_token',JSON.stringify(result.token))
  //       this.route.navigate(['home'])
  //       this.isLogin.next(result.name)
  //       this.userName = result.name
  //       this.userId = result.id
  //     }
  //     console.log(result);
  //     console.log(this.userName);
      
  //   })
  // }
}
