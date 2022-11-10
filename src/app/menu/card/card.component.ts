import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuItem } from 'src/app/models/menu-item';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item: MenuItem;
  @Output() onFavourite: EventEmitter<MenuItem> = new EventEmitter();
  menuForm = new FormGroup({
    itemAmount: new FormControl('')
  });
  constructor() {}

  ngOnInit(): void {}

  toggleFavourite() {
    this.item.isFavorite = !this.item.isFavorite;
    this.onFavourite.emit(this.item);
  }
}
