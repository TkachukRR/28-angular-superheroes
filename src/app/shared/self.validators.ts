import {FormControl} from "@angular/forms";

export class SelfValidators{
  static restrictedDomains(control: FormControl): {[key:string]: boolean} | null {
    const supportsDomains: Array<string> = ['.com', '.net', '.org', '.co', '.us']

    if (supportsDomains.filter(domain => {
      return control.value.endsWith(domain)
    }).length){
      return null
    }

    return {restrictedDomain: true}
  }

  static lengthAfterAt(control: FormControl): {[key:string]: boolean} | null {
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
