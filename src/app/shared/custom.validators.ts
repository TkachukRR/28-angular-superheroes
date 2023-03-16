import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  static supportsDomains(domains: string[]): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const restrictedDomains: Array<string> = domains.filter(domain => { return control.value.endsWith(domain)})

      if (restrictedDomains.length){
        return null
      }
      return {restrictedDomain: true, supportsDomains: domains.join(', ')}
    }
  }

  static maxLengthAfterAt(maxLength: number): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const lastAtIndex : number = control.value.lastIndexOf('@')
      const lengthSlicedEmail : number= control.value.slice(lastAtIndex + 1).length

      if(lengthSlicedEmail > maxLength) {
        return {lengthAfterAt: true, maxLength: maxLength, currentLength: lengthSlicedEmail}
      }
      return null
    }
  }

  static dotsBeforeAt(control: FormControl): {[key:string]: boolean} | null {
    const quantityDotsBeforeAt = 3
    const lastAtIndex = control.value.lastIndexOf('@')
    if (lastAtIndex !== -1 && (control.value.slice(0, lastAtIndex).replaceAll('.', '').length + quantityDotsBeforeAt <= control.value.slice(0, lastAtIndex).length)) {
      return {dotsBeforeAt: true}
    }
    return null
  }
}
