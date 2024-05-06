import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LlaveService {

  private readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  generateCode(llave:string): string {
    const length = 12
    let result = '';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return llave + '-' + result;
  }

  constructor() { }
}
