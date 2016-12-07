import { User } from "./user";
export class Vote {
  votes = Array();
  count: number;
  constructor(list: Array<User>) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].isSurvival) {
        this.votes[list[i].seatNo] = '';
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
