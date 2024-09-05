import { AddressDto } from './address.dto';

export class UserDto {
  public id: number;
  public fullName: string;
  public addresses: AddressDto[];
}
