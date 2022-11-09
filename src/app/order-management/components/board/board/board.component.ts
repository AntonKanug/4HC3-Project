import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { List, ListInterface } from '../../../model/list/list.model';
import { MovementIntf } from '../../../model/card/movement';
import { BoardService } from '../../../service/board/board-service';
import { BoardModel } from '../../../model/board/board.model';
import { LocalService } from '../../../service/board/local/local.service';
import { Card } from 'src/app/order-management/model/card/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardComponent implements OnInit {
  lists: ListInterface[] = [];

  constructor(
    private localService: LocalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const board = this.localService.getBoard();
    const notStarted: ListInterface = new List();
    notStarted.position = 0;
    notStarted.name = 'Not Started';

    let d = new Date();
    d.setMinutes(d.getMinutes() + 30);
    let card = new Card(
      '1',
      'Order #123',
      'summary',
      'sample desc',
      [
        { item: 'Apple', count: 1, selected: false },
        { item: 'Apple Burgers', count: 4, selected: false },
      ],
      d,
      30
    );
    notStarted.cards.push(card);
    d = new Date();
    d.setMinutes(d.getMinutes() + 60);
    card = new Card(
      '2',
      'Order #234',
      'summary',
      'sample desc',
      [
        { item: 'Oranges', count: 2, selected: false },
        { item: 'Pear Burgers', count: 1, selected: false },
        { item: 'Apple Fries', count: 4, selected: false },
      ],
      d,
      60
    );
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);
    notStarted.cards.push(card);

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

    // ideally retrive and initialize from some storage.
  }

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
    console.log(movementInformation);
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
    this.snackBar.open('All items in the order are not complete!', '', {
      duration: 311000,
    });
  }
}
