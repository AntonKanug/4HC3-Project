import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface Month {
  value: string;
  viewValue: string;
}

interface Year {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  deliveryForm = new FormGroup({
    CardNumber: new FormControl(''),
    CVV: new FormControl(''),
  });

  months: Month[] = [
    {value:'jan-0', viewValue:'January'},
    {value:'feb-1', viewValue:'February'},
    {value:'mar-2', viewValue:'March'},
    {value:'apr-3', viewValue:'April'},
    {value:'may-4', viewValue:'May'},
    {value:'jun-5', viewValue:'June'},
    {value:'jul-6', viewValue:'July'},
    {value:'aug-7', viewValue:'August'},
    {value:'sep-8', viewValue:'September'},
    {value:'oct-9', viewValue:'October'},
    {value:'nov-10', viewValue:'November'},
    {value:'dec-11', viewValue:'December'},
  ]

  years: Year[] = [
    {value:'2022-0', viewValue:'2022'},
    {value:'2023-1', viewValue:'2023'},
    {value:'2024-2', viewValue:'2024'},
    {value:'2025-3', viewValue:'2025'},
    {value:'2026-4', viewValue:'2026'},
    {value:'2027-5', viewValue:'2027'},
    {value:'2028-6', viewValue:'2028'},
  ]
}
