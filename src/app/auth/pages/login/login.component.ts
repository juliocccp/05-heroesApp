import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    button{
      margin-right: 10px; 
    }
    `
  ]
})
export class LoginComponent {

  constructor(private router:Router,
              private authService:AuthService){}
  
 login(){
    this.authService.login()
      .subscribe(auth =>{
        console.log(auth)
        if(auth.id){
          this.router.navigate(['./heroes'])    
          //this.router.navigateByUrl('/heroes')    
        }
      })
    
  }
  sinlogin(){
    
    this.router.navigate(['./heroes']);
  }

}
