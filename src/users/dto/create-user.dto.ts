import { User } from "../user.entity";

export class CreateUserDto {
  id?: number;
  login: string;
  password: string;

  static of(user: User): CreateUserDto {
    if (user === null) {
      return null;
    }

    const userDto = new CreateUserDto();
    userDto.id = user.id
    userDto.login = user.login;

    return userDto;
  }
}