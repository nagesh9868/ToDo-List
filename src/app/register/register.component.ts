import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { register } from '../DataTypes/toDo';
import { ToDoService } from '../services/to-do.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  duplicateMsg:string|undefined
  constructor(private service: ToDoService) { }

  loginForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5)]),
    email: new FormControl('',[Validators.email, Validators.required, Validators.minLength(8)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  get name(){
    return this.loginForm.get('name')
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  ngOnInit(): void {
    console.log(this.duplicateMsg); 
  }
  
  registerFormData() {
    this.service.registerForm(this.loginForm.value)
    this.service.duplicateMsg.subscribe((res)=>{
      this.duplicateMsg = res
    })
  }
}
