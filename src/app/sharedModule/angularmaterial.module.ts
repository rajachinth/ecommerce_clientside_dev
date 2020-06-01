import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {NgModule} from '@angular/core';

@NgModule({
    exports: [
        MatCheckboxModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatRadioModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatListModule,
    ]
})
export class AngularMaterialModules {}
