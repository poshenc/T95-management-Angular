import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    service = new ValidationService();
  });

  //username
  it('isValidUserName_valid_true', () => {
    const result = service.isValidUserName('abcABC123-._')
    expect(result).toBeTrue();
  });

  it('isValidUserName_illegalCharacters_false', () => {
    const result = service.isValidUserName('*/#$%^')
    expect(result).toBeFalse();
  });

  it('isValidUserName_illegalFirstCharacters_false', () => {
    const result = service.isValidUserName('-12qw')
    expect(result).toBeFalse();
  });

  //Password
  it('isValidPassword_valid_true', () => {
    const result = service.isValidPassword('*~!@#$%^&*(-/abc123ABC')
    expect(result).toBeTrue();
  });

  it('isValidPassword_fulWidth_false', () => {
    const result = service.isValidPassword('， ： ；')
    expect(result).toBeFalse();
  });

  it('isValidPassword_space_false', () => {
    const result = service.isValidPassword('abc ABC')
    expect(result).toBeFalse();
  });

  //Name
  it('isValidName_valid_true', () => {
    const result = service.isValidName('abc ABC 123 -._')
    expect(result).toBeTrue();
  });

  it('isValidName_spaceInFirstAndLastLetter_false', () => {
    const result = service.isValidName(' abc ')
    expect(result).toBeFalse();
  });

  it('isValidName_illegalCharacters_false', () => {
    const result = service.isValidName('!@#$%^')
    expect(result).toBeFalse();
  });
});
