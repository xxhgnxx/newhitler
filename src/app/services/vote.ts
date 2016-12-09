import { User } from './user';
export class Vote {
  votes = new Array<number>();
  count: number;
  constructor(list: Array<User>) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].isSurvival) {
        this.votes[list[i].seatNo] = 0;
      }
    }
    this.count = 0;
  }
  getVote(no, res) {
    this.votes[no] = res;
    this.count = this.count + 1;
    return this.count === this.votes.length;
  }
}
