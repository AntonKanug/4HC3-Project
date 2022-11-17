import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Card } from '../../../../model/card/card.model';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-card-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SummaryComponent implements OnInit {
  @Input() card!: Card;
  @Input() listIndex!: number;
  @Input() cardIndex!: number;

  countDown: Subscription;
  counter = 1800; // 1800
  tick = 60000; // min in ms = 60000
  startTime = 0;

  timeCompleted = null;

  constructor() {}

  ngOnInit() {
    if (this.listIndex >= 2) {
      this.timeCompleted = this.card.shouldBeDoneBy;
    }

    this.counter =
      Math.ceil(
        (this.card.shouldBeDoneBy.getTime() - new Date().getTime()) / 60000
      ) + 1;
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
  }

  identifyCardBeingDragged(dragEvent: DragEvent) {
    dragEvent.dataTransfer!.effectAllowed = 'move';
    dragEvent.dataTransfer!.dropEffect = 'move';
    const transferObject = {
      listIndex: this.listIndex,
      cardIndex: this.cardIndex,
    };
    dragEvent.dataTransfer!.setData('text', JSON.stringify(transferObject));
  }

  allowCardDragToBeDropped(dragEvent: DragEvent) {
    dragEvent.dataTransfer!.dropEffect = 'move';
    dragEvent.preventDefault();
  }

  selChange(item) {
    item.selected = !item.selected;
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
