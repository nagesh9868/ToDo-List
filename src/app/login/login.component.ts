import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoService } from '../services/to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:string|undefined
  constructor(private service:ToDoService, private route:Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email, Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  loginFormData(){
    this.service.loginForm(this.loginForm.value)
    this.loginError = this.service.loginError  
  }
}
