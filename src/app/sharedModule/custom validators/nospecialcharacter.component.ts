import {ValidationErrors, AbstractControl} from '@angular/forms';

export class NoSpecialCharacterValidation {
    static noSpecialCharcterValidation(control: AbstractControl): ValidationErrors | null {
        if (/[^a-z^A-z^0-9]/g.test(control.value)) { return {error: 'no special charcters allowed'}; } else { null; }
    }
}
