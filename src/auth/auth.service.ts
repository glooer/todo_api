import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { createHash } from "./auth.util";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async auth(userDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOneByLogin(userDto.login);

    if (user == null) {
      throw new ForbiddenException("Not found");
    }

    if (user.password != createHash(userDto.password)) {
      throw new ForbiddenException("Bad password");
    }

    return user;
  }

  login(user: User): TokenResult {
    return {
      token: this.jwtService.sign({
        login: user.login,
        id: user.id
      }),
    }
  }
}