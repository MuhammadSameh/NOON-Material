import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, IReigster, UserToken } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('sing_in') signInCloseBtn!: ElementRef;
  @ViewChild('sign_up') signUpCloseBtn!: ElementRef;
  @ViewChild('pass') passRef! :ElementRef
  @ViewChild('confpass') passConfRef! :ElementRef
  userRegister:IReigster ; 
  userLogin:ILogin ; 
  userLoginToken:UserToken;
  
  @Output() UserLoggedInEvent = new EventEmitter<UserToken>();
  

  lowNumber:boolean=true;
  lowChar:boolean=true;
  ResiterationErrors={
    InvalidUserName:"",
    DuplicateUserName:""
  }
  loginErrors=""
  
constructor(private userServices:UserService, private router:Router) {
    this.userRegister= {
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      address: ""
   }
  this.userLogin = {
      email:"", 
      password:""
  }
}

  ngOnInit(): void {
  }

  closeAllDialog(){
    this.signInCloseBtn.nativeElement.click();
    this.signUpCloseBtn.nativeElement.click();
    console.log("close alll")
  }

  passValidation(input:string){
     input.match("[0-9]{7}") == null ? this.lowNumber=true : this.lowNumber=false
     input.match("([a-zA-Z]{2,})+") ==null ? this.lowChar=true : this.lowChar =false;
    }
  confirmationPass(pass:any , confPass:any){
    this.passRef.nativeElement.classList.add("ng-invalid")
       if(pass == confPass){
        this.passRef.nativeElement.classList.remove("ng-invalid")
        this.passRef.nativeElement.classList.add("ng-valid")

        this.passConfRef.nativeElement.classList.remove("ng-invalid")
        this.passConfRef.nativeElement.classList.add("ng-valid")
      
       }
       else{
        this.passRef.nativeElement.classList.remove("ng-valid")
        this.passRef.nativeElement.classList.add("ng-invalid")

        this.passConfRef.nativeElement.classList.remove("ng-valid")
        this.passConfRef.nativeElement.classList.add("ng-invalid")
      
      }
  }

  register(regForm:any){
  
this.userServices.CreateNewCient(this.userRegister).subscribe(next=>
{
    this.closeAllDialog() 
   console.log("done")
   let userLog = {
    email:this.userRegister.email,
    password:this.userRegister.password
  }
  this.closeAllDialog();
  alert("congratulated you signed in ")

  //login
  this.Login(userLog)
  }
  ,err=>
  {
    //success
     console.log(err)
     if(err.error[0]!=undefined)
     {this.ResiterationErrors[err.error[0].code] = err.error[0].description
     }
    }
  ,()=>{console.log("complete")}
  )

}

  Login(user=this.userLogin){
    this.userServices.Login(user).subscribe(
      next=>{
        localStorage.setItem("token",next.token)
        localStorage.setItem("cartId",String(next.cartId))
        localStorage.setItem("expirtyDate",String(next.cartId))
        
        this.userLoginToken = {
          token : localStorage.getItem("token"),
          cartId:+localStorage.getItem("cartId"),
          expirtyDate:localStorage.getItem("expirtyDate")
        }
        this.UserLoggedInEvent.emit(this.userLoginToken);
        this.closeAllDialog()
      },
      err=>{
        this.loginErrors = err.error; 

      })

  }


}










/*



import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, IReigster, UserToken } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('sing_in') signInCloseBtn!: ElementRef;
  @ViewChild('sign_up') signUpCloseBtn!: ElementRef;
  @ViewChild('pass') passRef! :ElementRef
  @ViewChild('confpass') passConfRef! :ElementRef
  userRegister:IReigster ; 
  userLogin:ILogin ; 
  userLoginToken:UserToken;
  
  @Output() UserLoggedInEvent = new EventEmitter<UserToken>();
  

  lowNumber:boolean=true;
  lowChar:boolean=true;
  ResiterationErrors={
    InvalidUserName:"",
    DuplicateUserName:""
  }
  loginErrors=""
  
constructor(private userServices:UserService, private router:Router) {
    this.userRegister= {
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      address: ""
   }
  this.userLogin = {
      email:"", 
      password:""
  }
}

  ngOnInit(): void {
  }

  closeAllDialog(){
    this.signInCloseBtn.nativeElement.click();
    this.signUpCloseBtn.nativeElement.click();
    console.log("close alll")
  }

  passValidation(input:string){
     input.match("[0-9]{7}") == null ? this.lowNumber=true : this.lowNumber=false
     input.match("([a-zA-Z]{2,})+") ==null ? this.lowChar=true : this.lowChar =false;
    }
  confirmationPass(pass:any , confPass:any){
    this.passRef.nativeElement.classList.add("ng-invalid")
       if(pass == confPass){
        this.passRef.nativeElement.classList.remove("ng-invalid")
        this.passRef.nativeElement.classList.add("ng-valid")

        this.passConfRef.nativeElement.classList.remove("ng-invalid")
        this.passConfRef.nativeElement.classList.add("ng-valid")
      
       }
       else{
        this.passRef.nativeElement.classList.remove("ng-valid")
        this.passRef.nativeElement.classList.add("ng-invalid")

        this.passConfRef.nativeElement.classList.remove("ng-valid")
        this.passConfRef.nativeElement.classList.add("ng-invalid")
      
      }
  }

  register(regForm:any){
  
this.userServices.CreateNewCient(this.userRegister).subscribe(next=>
{
    this.closeAllDialog() 
   console.log("done")
   let userLog = {
    email:this.userRegister.email,
    password:this.userRegister.password
  }
  this.closeAllDialog();
  alert("congratulated you signed in ")

  //login
  this.Login(userLog)
  }
  ,err=>
  {
    //success
     console.log(err)
     if(err.error[0]!=undefined)
     {this.ResiterationErrors[err.error[0].code] = err.error[0].description
     }
    }
  ,()=>{console.log("complete")}
  )

}

  Login(user=this.userLogin){
    this.userServices.Login(user).subscribe(
      next=>{
        localStorage.setItem("token",next.token)
        localStorage.setItem("cartId",String(next.cartId))
        localStorage.setItem("expirtyDate",String(next.cartId))
        
        this.userLoginToken = {
          token : localStorage.getItem("token"),
          cartId:+localStorage.getItem("cartId"),
          expirtyDate:localStorage.getItem("expirtyDate")
        }
        this.UserLoggedInEvent.emit(this.userLoginToken);
        this.closeAllDialog()
      },
      err=>{
        this.loginErrors = err.error; 

      })

  }


}













*/