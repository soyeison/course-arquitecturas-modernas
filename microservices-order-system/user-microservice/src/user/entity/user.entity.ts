import { Address } from './address.entity';

export class User {
  public id: number;
  public fullName: string;
  public dateOfBirth: Date;
  public lastLogin: Date;
  public addresses: Address[];
}
