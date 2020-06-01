import { ValidationErrors, AbstractControl } from '@angular/forms';

export class NoSpaceValidation {
    static noSpaceValidation(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) { return {error: 'no space allowed'}; } else { return null; }
    }
}
