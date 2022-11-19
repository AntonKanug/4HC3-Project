import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { List, ListInterface } from '../../../model/list/list.model';
import { MovementIntf } from '../../../model/card/movement';
import { BoardService } from '../../../service/board/board-service';
import { BoardModel } from '../../../model/board/board.model';
import { LocalService } from '../../../service/board/local/local.service';
import { Card } from 'src/app/order-management/model/card/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setInterval } from 'timers';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardComponent implements OnInit {
  lists: ListInterface[] = [];
  items = [
    'Apple',
    'Pear',
    'Apple Fries',
    'Pineapple Pizza',
    'Peach Burger',
    'Mango',
    'Mango Ice Cream',
  ];
  cardId = 0;
  opened = false;

  unfinishedItems = [];

  constructor(
    private localService: LocalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const notStarted: ListInterface = new List();
    notStarted.position = 0;
    notStarted.name = 'Not Started';

    for (let i = 0; i < 10; i++) {
      this.addRandomCard(notStarted);
    }

    const inProg: ListInterface = new List();
    inProg.position = 1;
    inProg.name = 'In Progress';

    const ready: ListInterface = new List();
    ready.position = 2;
    ready.name = 'Ready';

    const completed: ListInterface = new List();
    completed.position = 3;
    completed.name = 'Completed';

    this.lists = [notStarted, inProg, ready, completed];

    interval(500).subscribe(() => this.getAllUnfinishedItems());

    // ideally retrive and initialize from some storage.
    // while (true) {
    //   setTimeout(() => {}, 5000);
    //   this.addRandomCard(notStarted);
    // }

    // this.interval = setInterval(() => {
    //   this.addRandomCard(notStarted);
    // }, 5000);

    // this.snackBar.open('Welcome to Apple Factory Order Manager!', 'Done', {
    //   duration: 3000,
    // });
  }

  getAllUnfinishedItems() {
    let mapOfItems = {};

    this.lists[0].cards.forEach((card) => {
      card.items.forEach((item) => {
        if (item.selected) return;
        mapOfItems[item.item] = (mapOfItems[item.item] || 0) + item.count;
      });
    });
    this.lists[1].cards.forEach((card) => {
      card.items.forEach((item) => {
        if (item.selected) return;
        mapOfItems[item.item] = (mapOfItems[item.item] || 0) + item.count;
      });
    });

    console.log(mapOfItems);

    this.unfinishedItems = Object.entries(mapOfItems).sort(
      (a, b) => +b[1] - +a[1]
    );
  }

  //   ngOnDestroy() {
  //     clearInterval(this.interval);
  //   }

  addList() {
    const newList: ListInterface = new List();
    newList.position = this.lists.length + 1;
    newList.name = `List #${newList.position}`;
    if (this.lists === undefined) {
      this.lists = [];
    }
    this.lists.push(newList);
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    // console.log(movementInformation);
    let canMove = true;

    if (movementInformation.toListIdx >= 2) {
      const card =
        this.lists[movementInformation.fromListIdx].cards[
          movementInformation.fromCardIdx
        ];
      card.items.forEach((item) => {
        if (!item.selected) {
          this.showCantMoveDialog();
          canMove = false;
          return;
        }
      });
    }
    if (!canMove) return;
    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(
      movementInformation.fromCardIdx,
      1
    );
    this.lists[movementInformation.toListIdx].cards.splice(
      movementInformation.toCardIdx,
      0,
      ...cardMoved
    );
  }

  showCantMoveDialog() {
    this.snackBar.open('All items in the order are not complete!', 'Done', {
      duration: 3000,
      panelClass: ['warning-snackbar'],
    });
  }

  addRandomCard(list) {
    const itemList = [];
    const itemsToGetFrom = this.shuffle(this.items);
    this.cardId += 1;

    for (let j = 0; j < this.randInt(1, 4); j++) {
      itemList.push({
        item: itemsToGetFrom[j],
        count: this.randInt(1, 9),
        selected: false,
      });
    }
    const d = new Date();
    const timeToCompelete = this.randInt(5, 45);
    d.setMinutes(d.getMinutes() + timeToCompelete);

    list.cards.push(
      new Card(
        String(this.cardId),
        'Order #' + String(this.cardId),
        '',
        '',
        itemList,
        d,
        timeToCompelete
      )
    );
  }

  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffle(arr: any[]): any[] {
    return Array(arr.length)
      .fill(null)
      .map((_, i) => [Math.random(), i])
      .sort(([a], [b]) => a - b)
      .map(([, i]) => arr[i]);
  }

  toggleSideBar() {
    this.opened = !this.opened;
  }
}
