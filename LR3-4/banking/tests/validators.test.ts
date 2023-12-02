import { ValidationPair, emailValidator, passportIdValidator, phoneValidator, validate } from '../core/validators';

describe('Validation tests', () => {
  describe('Base validators', () => {
    test('Passport id validator', () => {
      expect(passportIdValidator('MP12345').status).toBeFalsy();
      expect(passportIdValidator('MP').status).toBeFalsy();
      expect(passportIdValidator('123456').status).toBeFalsy();
      expect(passportIdValidator('MP0000000').status).toBeTruthy();
      expect(passportIdValidator('MR0000000').status).toBeFalsy();
      expect(passportIdValidator('AR0000000').status).toBeFalsy();
      expect(passportIdValidator('KB0000000').status).toBeTruthy();
    });

    test('Phone validator', () => {
      expect(phoneValidator('+375').status).toBeFalsy();
      expect(phoneValidator('+015589').status).toBeFalsy();
      expect(phoneValidator('+375290000000').status).toBeTruthy();
      expect(phoneValidator('+375000000000').status).toBeFalsy();
    });

    test('Email validator', () => {
      expect(emailValidator('+375').status).toBeFalsy();
      expect(emailValidator('email-example@').status).toBeFalsy();
      expect(emailValidator('email@@').status).toBeFalsy();
      expect(emailValidator('real-email@com.com').status).toBeTruthy();
    });
  });

  describe('Sequence validator', () => {
    test('Works properly', () => {
      const validData = [
        ['email@emailcom', emailValidator, ''] as ValidationPair<string>,
        ['+375331231231', phoneValidator, ''] as ValidationPair<string>
      ];

      let validationResult = validate(validData);

      expect(validationResult.status).toBeTruthy();

      const invalidData = [
        ['email@', emailValidator, ''] as ValidationPair<string>,
        ['+375331231231', phoneValidator, ''] as ValidationPair<string>
      ];

      validationResult = validate(invalidData);

      expect(validationResult.status).toBeFalsy();
    });
  });
});
