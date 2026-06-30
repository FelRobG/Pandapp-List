import { CanActivateFn, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private router: Router){}

  canActivate(): boolean {
    if (this.router.currentNavigation()?.extras?.state?.['user']) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}