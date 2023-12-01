import {FormGroup, ValidationErrors} from "@angular/forms";

export class ErrorUtils {

  public static errorsMap: Map<string, string> = new Map([
    ['required', 'is required'],
    ['email', 'must be valid'],
    ['notMatch', 'does not match'],
    ['notFound', 'not found'],
    ['validatePhoneNumber', 'must be valid'],
    ['minlength', 'must have at least {requiredLength} characters'],
    ['maxlength', 'must have {requiredLength} or less characters'],
    ['passwordStrength', 'must have a capital letter(A-Z), number(0-9) and symbol'],
    ['containOnlyLettersNumbersPeriods', 'must contain only letters (a-z), numbers (0-9), and periods (.)'],
    ['cannotBeginOrEndWithPeriods','must not begin or end with periods (.)'],
    ['ageLimitation', 'must be 18+'],
    ['alreadyExists', 'already exists']
  ]);

  private static formatCamelCaseToWords(input: string): string {
    return input.split(/(?=[A-Z])/)
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word.toLowerCase();
        }
      }).join(' ');
  }

  private static interpolateErrorMessage(message: string, error : any): string {
    const placeholderRegex = /\{(.*?)\}/g;
    return message.replace(placeholderRegex, (match, placeholder) => {
      const properties = placeholder.split('.');
      const value = properties.reduce((obj: { [x: string]: any; }, prop: string | number) => obj && obj[prop], error);
      return value !== undefined ? value : match;
    });
  }

  private static getErrorMessage(field :string, errors: ValidationErrors): string {
    const message:string = this.errorsMap.get(Object.keys(errors)[0]) != null ? this.interpolateErrorMessage(this.errorsMap.get(Object.keys(errors)[0]), Object.values(errors)[0]) : ("please insert error message: " + Object.keys(errors)[0]);
    return this.formatCamelCaseToWords(field) + ' ' + message;
  }

  public static setErrors(formGroup: FormGroup, errors: Map<string, Map<string, string>>): void {
    for (let field in formGroup.controls) {
      if (errors.has(field)) {
        const fieldErrors: Map<string, string> = errors.get(field);
        for (let code in fieldErrors) {
          formGroup.controls[field].setErrors({ [code]: true });
        }
      }
    }
  }

  public static getError(field:string, errors: ValidationErrors): string {
    return errors != null ? this.getErrorMessage(field, errors) : null;
  }
}
