import { Component, Input, OnInit } from '@angular/core';

import { MenuItem } from 'src/app/models/menu-item';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item: MenuItem;

  constructor() {}

  ngOnInit(): void {}
}
