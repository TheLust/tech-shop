import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  static matchPassword(AC: AbstractControl): ValidationErrors | null {
    const formGroup = AC.parent;
    if (formGroup) {
      const passwordControl = formGroup.get('password'); // to get value in input tag
      const confirmPasswordControl = formGroup.get('confirmPassword'); // to get value in input tag

      if (passwordControl && confirmPasswordControl) {
        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;
        if (password !== confirmPassword) {
          return { notMatch: true };
        } else {
          return null;
        }
      }
    }

    return null;
  }

  static passwordStrength(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;

    // Use a regular expression to check for at least one capital letter, one symbol, and one number
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/;

    if (!regex.test(password)) {
      return { passwordStrength: true };
    }

    return null;
  }

  static containOnlyLettersNumbersPeriods(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const regex = /^[a-zA-Z0-9.]+$/;

    if (!regex.test(value)) {
      return { containOnlyLettersNumbersPeriods: true };
    }

    return null;
  }

  static cannotBeginOrEndWithPeriods(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const regex = /^(?!\.)(?!.*\.$).*$/;

    if (!regex.test(value)) {
      return { cannotBeginOrEndWithPeriods: true };
    }

    return null;
  }

    static ageLimitation(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;

        if (!value) {
            return null;
        }

        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age < 18) {
            return { ageLimitation: true };
        }

        return null;
    }
}
