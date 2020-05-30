import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoSpaceValidation } from '../../sharedModule/custom validators/nospace.component';
import { NoSpecialCharacterValidation } from '../../sharedModule/custom validators/nospecialcharacter.component';
import { AuthserviceService } from '../../sharedModule/services/authservice.service';
import { NotFounfError, BadRequestError, InternalServerError, ApplicationError } from '../../sharedModule/custom errors/applicationerrors';
import { of, Observable } from 'rxjs';
import { NgRedux, select } from '@angular-redux/store';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { SIGNUPDATA } from '../../storeModule/redux/coreaction';
import { SIGNUPSTATE } from '../../storeModule/redux/signupstore';
import { take } from 'rxjs/operators';
import { UserService } from '../../sharedModule/services/userservice.service';
import { zoomin } from 'src/app/animations/animatefunction';
import { customAnimationSetOne } from 'src/app/animations/custom-animation';
import { UniqueAsyncValidatorService } from 'src/app/sharedModule/custom validators service/unique-async-validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [customAnimationSetOne]
})
export class SignupComponent
{
  $showProgress:Observable<boolean>;
  $showData:Observable<boolean>;
  decodedData:any;
  $errorStatus:Observable<number>;

  @select(value=>value.signupstate) $signupObject:Observable<object>;
 
  constructor(private userService:UserService,
              private authService:AuthserviceService,
              private ngRedux:NgRedux<RootStoreState>,
              private asyncValidationService:UniqueAsyncValidatorService) {}

  signupform=new FormGroup({
    username:new FormControl('',[
             Validators.required,
             Validators.minLength(4),
             Validators.maxLength(15),
             NoSpecialCharacterValidation.noSpecialCharcterValidation
    ]),
    mobile:new FormControl('',[
             Validators.required,
             Validators.minLength(10),
             Validators.maxLength(15)     
    ]),
    uniqueID:new FormControl('',[
             Validators.required,
             Validators.minLength(6), 
             Validators.maxLength(10),
             NoSpaceValidation.noSpaceValidation],
             this.asyncValidationService.uniqueNameCheck()),
    password:new FormControl('',[
              Validators.required,
              Validators.maxLength(10),
              Validators.minLength(4),
              NoSpaceValidation.noSpaceValidation
    ]),
    membership:new FormControl('Non-Prime',Validators.required)
  });
  log(data)
  {
    console.log(data);
  }
  signUp(signUpData)
  {
    this.$showProgress=of(true);
    this.$showData=of(false);
    this.userService.userSignupService(signUpData)
        .pipe(take(1))
        .subscribe((responseData:any)=>{
          let authToken:string=responseData.toString();
          localStorage.setItem('signUpToken',authToken);
          this.decodedData=this.authService.decodeToken('signUpToken');
          console.log(this.decodedData);
        },
        (error)=>{
          this.$showProgress=of(false);
          if(error instanceof BadRequestError) return this.$errorStatus=of(400);
          if(error instanceof NotFounfError) return this.$errorStatus=of(404);
          if(error instanceof InternalServerError) return this.$errorStatus=of(500);
          if (error instanceof ApplicationError) return this.$errorStatus=of(504);
        },
        ()=>{
          this.ngRedux.dispatch({type:SIGNUPDATA,data:this.decodedData});
          this.$showProgress=of(false);
          this.$showData=of(true);
        });
  } 
}
