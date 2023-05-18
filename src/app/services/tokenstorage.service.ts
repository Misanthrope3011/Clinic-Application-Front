import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  isLoginSucces: boolean = false;
  role: string;

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  signOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/home']);

  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getRoleInfo() {
    return this.getUser().body.roles[0].substring(5);
  }

  public fetchRoleSpecificInfo() {
    this.role = this.getRoleInfo();

    if (this.role == "DOCTOR") {

    } else if (this.role == "PATIENT") {

    } else if (this.role == "ADMIN") {

    }
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
