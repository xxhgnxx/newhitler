import { User } from './user';
import { UserService } from './user.service';
export class Data {
  type: string;
  name: string;
  msg: string;
  user: User;
  constructor() { }
}
