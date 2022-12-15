import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public validationType = {
    letterNumber: /^[0-9a-zA-Z]+$/,
    letterNumberDashUnderscoreFullstop: /^[0-9a-zA-Z_.-]+$/,
    letterNumberDashUnderscoreFullstopSpace: /^[0-9a-zA-Z _.-]+$/,
    halfWidthExceptSpace: /^[\w`~!@#$%^&*()-_=+[\]{}\\|;:'",<.>/?]+$/,
    halfWidthExceptComma: /^[\w`~!@#$%^&*()-_=+[\]{}\\|;:'" <.>/?][^,]+$/
  }

  constructor() { }

  isValidUserName(inputText: string): boolean {
    if (inputText.length === 0) return true

    const validFirstLetter = this.validationType.letterNumber.test(inputText.charAt(0));
    const validText = this.validationType.letterNumberDashUnderscoreFullstop.test(inputText);
    return validFirstLetter && validText
  }

  isValidPassword(inputText: string): boolean {
    return this.validationType.halfWidthExceptSpace.test(inputText)
  }

  isValidName(inputText: string): boolean {
    const validText = this.validationType.letterNumberDashUnderscoreFullstopSpace.test(inputText);
    const validFirstAndLastLetter = inputText.trim().length === inputText.length;
    return validText && validFirstAndLastLetter
  }
}
