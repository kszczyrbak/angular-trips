import { AddTripComponent } from './add-trip.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AddTripComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        NgxFileDropModule,
        HttpClientModule
    ],
    entryComponents: [
        AddTripComponent,
    ],
    providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: '' }]
})
export class AddTripTestModule { }