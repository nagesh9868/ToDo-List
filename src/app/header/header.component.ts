import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listData: any
  @Output() search = new EventEmitter<any>()
  @Input() searchItem: any
  searchVisible: boolean = true
  loggedName: string | undefined
  isLoggedIn: boolean = true
  constructor(private service: ToDoService, private activeRoute: ActivatedRoute, private route: Router, private authService: AuthenticationService) { }
  userId: any = this.service.userId
  userName: any = this.service.userName

  ngOnInit(): void {
    console.log(this.authService.session());

    this.service.isLogin.subscribe((result:any) => {
      console.log(result);
      
      if (result) {
        this.loggedName = result.name
        this.isLoggedIn = false
      }
    })

    // setInterval
    // this.route.events.subscribe((res: any) => {
    //   if (res.url) {
    //     if (res.url.includes('login') || res.url.includes('register') || res.url.includes('**')) {
    //       this.searchVisible = false
    //     } else if (res.url.includes('home')) {
    //       this.searchVisible = true
    //     }
    //   }
    // })

  }

  searchToDo(searchItem: string) {
    this.service.searchTodo(searchItem)
  }

  logout() {
    if (this.service.userName) {
      this.route.navigate(['/login'])
      this.isLoggedIn = true
    }
  }

  logo() {

  }

}


