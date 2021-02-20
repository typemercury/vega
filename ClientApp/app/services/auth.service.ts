import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operator/filter';
import * as auth0 from 'auth0-js';
import { JwtHelper} from 'angular2-jwt';




@Injectable()
export class AuthService {

  private profile: any;
  private roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: 'O2rKGR69z9mwWTevXJxJgyBwkvCUq7SY',
    domain: 'lebjamesron.auth0.com',
    responseType: 'token id_token',
    //audience: 'https://lebjamesron.auth0.com/userinfo',
    audience: 'https://api.vega.com',
    redirectUri: 'http://localhost:5000',
    scope: 'openid email profile', 
  });

  constructor(public router: Router) {
    console.log("constructor");
    this.getSession();
  }

  private getSession() {
    console.log("read profile & roles")
    //get profile & roles
    this.profile = JSON.parse(localStorage.getItem('profile')!);
    var accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      var jwtHelper = new JwtHelper();
      var decodedToken = jwtHelper.decodeToken(accessToken);
      this.roles = decodedToken['https://vega.com/roles'];
      console.log("decodedToken:", decodedToken);
      console.log("roles:", this.roles);
    };
  }

  public handleAuthentication(test: string): void {
    console.log(test," handleAuth");
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);               
        this.getSession();
        //this.router.navigate(['/home']);
      } else if (err) {
        //this.router.navigate(['/home']);
        throw err;
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the Access Token will expire at
    console.log("set session");
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      if (err)  throw err;
      localStorage.setItem('profile', JSON.stringify(user));
      this.profile = user;
    });
  }
    
  public login(): void {  
    console.log("login");
    this.auth0.authorize();
  }

  public logout(): void {
    console.log("logout");
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.profile = null; 
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;       
  }

  public isInRole(roleName: string) {        
    return this.roles? (this.roles.indexOf(roleName) > -1) : false;  
  }


}