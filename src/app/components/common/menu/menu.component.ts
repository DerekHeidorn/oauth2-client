import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  public userAuthorities: Array<string> = [];

  constructor(private authenticationService: AuthenticationService) { 
    

  }

  ngOnInit() {
    

    let authorities: Array<string> = this.authenticationService.getCurrentTokenAuthorities();

    for(let i = 0; i < authorities.length; i++) {
      this.userAuthorities.push(authorities[i])
    }
  }

  public hasAuthority(authority_name: string): boolean {
    if(this.userAuthorities) {
      for(let i = 0; i < this.userAuthorities.length; i++) {
        if(this.userAuthorities[i] == authority_name) {
          return true;
        }
      }
    }
    return false;
  }

}
