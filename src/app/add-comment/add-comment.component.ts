import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Trip, Currency } from '../models/trip.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  addCommentForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddCommentComponent>, @Inject(MAT_DIALOG_DATA) public data: Trip, private authService: AuthService) { }

  ngOnInit() {
    this.addCommentForm = new FormGroup({
      userName: new FormControl(""),
      rating: new FormControl("", [Validators.required, Validators.min(0), Validators.max(5)]),
      text: new FormControl(""),
    })
  }

  get rating() {
    return this.addCommentForm.controls["rating"]
  }

  submit() {
    if (this.data._id) {
      let comment = this.addCommentForm.value;
      if (!comment.userName)
        comment.userName = "Anonymous"

      comment.trip_id = this.data._id
      comment.date = new Date()
      this.authService.getCurrentUser().then(
        user => comment.user_id = user._id
      )
      this.dialogRef.close(this.addCommentForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }


}
