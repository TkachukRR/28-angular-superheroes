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

  static lengthAfterAt(control: FormControl): ValidationErrors | null {
    const quantitySymbolsAfterAt = 5
    const lastAtIndex = control.value.lastIndexOf('@')
    if(lastAtIndex !== -1 && control.value.slice(lastAtIndex + 1).length > quantitySymbolsAfterAt) {
      return {lengthAfterAt: true}
    }
    return null
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
