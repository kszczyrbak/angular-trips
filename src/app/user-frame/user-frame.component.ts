
import { Component, OnInit, Input, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { AppUser } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-frame',
  templateUrl: './user-frame.component.html',
  styleUrls: ['./user-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFrameComponent implements OnInit {

  @Input()
  userData: AppUser;

  @Input()
  size: number = 35;

  fontSize: string;
  stringSize: string;
  initials: string;
  
  constructor() {
  }

  ngOnInit() {
    this.stringSize = `${this.size}px`
    this.fontSize = `${(39 * this.size) / 100}px`;
    if (this.userData.name) {
      this.initials = this.userData.name.split(" ", 2).map(splitted => {
        return splitted.charAt(0)
      }).join('')
    }
  }

}