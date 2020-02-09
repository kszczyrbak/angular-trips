import { NgModule } from "@angular/core";

import { SpinnerOverlayComponent } from "./spinner-overlay/spinner-overlay.component";

import { SpinnerComponent } from "./spinner.component";

import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
    declarations: [SpinnerOverlayComponent, SpinnerComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        OverlayModule
    ],
    entryComponents: [
        SpinnerOverlayComponent,
    ]
})
export class SpinnerTestModule { }