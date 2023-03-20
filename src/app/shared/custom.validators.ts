import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
	public static supportsDomains(domains: string[]): ValidatorFn | null {
		return (control: AbstractControl): ValidationErrors | null => {
			const restrictedDomains: Array<string> = domains.filter(domain => control.value.endsWith(domain));

			if (restrictedDomains.length) {
				return null;
			}

			return { restrictedDomain: true, supportsDomains: domains.join(', ') };
		};
	}

	public static maxLengthAfterAt(maxLength: number): ValidatorFn | null {
		return (control: AbstractControl): ValidationErrors | null => {
			const lastAtIndex: number = control.value.lastIndexOf('@');
			const lengthSlicedEmail: number = control.value.slice(lastAtIndex + 1).length;

			if (lengthSlicedEmail > maxLength) {
				return { lengthAfterAt: true, maxLength, currentLength: lengthSlicedEmail };
			}

			return null;
		};
	}

	public static allowedDotsBeforeAt(dotsQuantity: number): ValidatorFn | null {
		return (control: AbstractControl): ValidationErrors | null => {
			const lastAtIndex = control.value.lastIndexOf('@');
			const slicedEmail = control.value.slice(0, lastAtIndex);

			if (slicedEmail.replaceAll('.', '').length <= slicedEmail.length - dotsQuantity) {
				return { dotsBeforeAt: true, allowedDotsBeforeAt: dotsQuantity };
			}

			return null;
		};
	}
}
