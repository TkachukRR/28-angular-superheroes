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
}
