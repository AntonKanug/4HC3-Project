import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  deliveryChecked = true;
  pickuptime = "12:20pm";
  deliverytime = "50 minutes";
}
