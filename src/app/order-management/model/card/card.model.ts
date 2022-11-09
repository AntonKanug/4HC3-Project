export interface CardInterface {
  id: string;
  header: string;
  summary: string;
  description: string;
  items: any;
  shouldBeDoneBy: Date;
}

export class Card implements CardInterface {
  constructor(
    public id: string,
    public header: string,
    public summary: string,
    public description: string,
    public items: any,
    public shouldBeDoneBy: Date
  ) {}
}
