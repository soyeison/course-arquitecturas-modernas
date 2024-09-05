import { User } from '../entity/user.entity';

export class UserRepository {
  private users: User[] = [
    {
      id: 1,
      fullName: 'Yeison Villegas',
      dateOfBirth: new Date('2001/08/23'),
      lastLogin: new Date(),
      addresses: [
        {
          id: 1,
          firstLine: 'First Line 1',
          secondLine: 'Second Line 1',
          country: 'Colombia',
          postCode: '10012',
          isDefault: true,
          userId: 1,
        },
        {
          id: 2,
          firstLine: 'First Line 2',
          secondLine: 'Second Line 2',
          country: 'Colombia',
          postCode: '10012',
          isDefault: false,
          userId: 1,
        },
      ],
    },
    {
      id: 2,
      fullName: 'Jhon Doe',
      dateOfBirth: new Date('2010/05/20'),
      lastLogin: new Date(),
      addresses: [],
    },
  ];

  findById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  findAll() {
    return this.users;
  }
}
