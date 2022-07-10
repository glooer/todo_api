import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { WithAuth } from './auth.jwt.guard';

@Controller("user")
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto): Promise<TokenResult> {
    const user = await this.usersService.create(createUserDto);

    return this.authService.login(user);
  }

  @Post("signin")
  async signin(@Body() createUserDto: CreateUserDto): Promise<TokenResult> {
    const user = await this.authService.auth(createUserDto);

    return this.authService.login(user);
  }

  @Get("profile")
  @WithAuth()
  profile(@Request() req: any) {
    return CreateUserDto.of(req.user);
  }
}
