import { Injectable } from '@angular/core';
/**
 * @function serve_ localStorage
 * setLocalStorage
 * getLocalStorage
 * localStorageRemove
 * localStorageClear
 * @function utils
 * session
 * isAdmin
 */

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}
  setLocalStorage(key: string, value: any) {
    try {
      
      if (window) {
        console.log("utils", window);
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        console.warn(' window undefined !');
      }
    } catch (errors: any) {
      if (errors) {
        throw new Error(errors.message);
      }
    }
  }
  getLocalStorage(key: string): any {
    try {
      if (window) {
        return localStorage.getItem(key);
      } else {
        console.warn('Window undefined !');
        return null;
      }
    } catch (errors: any) {
      if (errors) {
        throw new Error(errors.message);
      }
    }
  }
  localStorageRemove(key: string): void {
    try {
      if (window) {
        localStorage.removeItem(key);
      } else {
        console.warn('Window undefined !');
      }
    } catch (errors: any) {
      if (errors) {
        throw new Error(errors.message);
      }
    }
  }
  localStorageClear(): void {
    try {
      if (window) {
        localStorage.clear();
      } else {
        console.warn('Window undefined !');
      }
    } catch (errors: any) {
      if (errors) {
        throw new Error(errors.message);
      }
    }
  }
  session(): Boolean {
    if (this.getLocalStorage('AUTH_TOKEN')) {
      return Boolean(this.getLocalStorage('AUTH_TOKEN'));
    } else {
      return false;
    }
  }

  isAdmin(): Boolean {
    if (this.session()) {
      if (this.getLocalStorage('USER')) {
        const __user_data = this.getLocalStorage('USER');
        let admin = __user_data?.groups?.some((i: any) => i?.name === 'Admin');
        return Boolean(admin);
      } else {
        return false;
      }
    }
    return false;
  }
  security(status: number ): void {
    if ([401, 403, 400].includes(status)) {
      this.localStorageClear()
      // window.location.href="/" -- routing thru window object is not required
    }else{
      
    }
  }
}
