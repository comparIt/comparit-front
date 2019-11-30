import { Injectable } from '@angular/core';
import {User} from '../models/user'
import {CompareItAPIService} from './compareItAPI.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  user: User;

  constructor(public compareItAPIService: CompareItAPIService) { 
  }

    postUserRegistration(user:User){
      this.compareItAPIService.postRegisterUser(user).then((json)=>this.user=json);
    }

}
