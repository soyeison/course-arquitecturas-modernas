import { User } from '../order/entity/user.entity';

export class UserRepository {
  private users: User[] = [
    {
      id: 1,
      fullName: 'Yeison Villegas',
      addressFirstLine: 'First line address',
      addressSecondLine: 'Second line addresss',
      addressCountry: 'Colombia',
      addressPostCode: '01002',
    },
    {
      id: 2,
      fullName: 'Jhon Doe',
      addressFirstLine: 'First line address',
      addressSecondLine: 'Second line addresss',
      addressCountry: 'Colombia',
      addressPostCode: '01202',
    },
  ];

  save(user: User) {
    this.users.push(user);
    return user;
  }
}
