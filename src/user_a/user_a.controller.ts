import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserAService } from './user_a.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('type-A')
export class UserAController {
  constructor(
    private readonly userAService: UserAService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { name: string; password: string; email: string },
  ): Promise<User> {
    const { password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(body);
    return this.userAService.create({ ...body, password: hashedPassword });
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { email, password } = body;
    const user = await this.userAService.getUser({ email }); // this is the only time we get the user

    if (!user) {
      throw new BadRequestException('invalid credentials, user not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(
        'Invalid Credentials, password not matching',
      );
    }

    // Generate JWT Token
    const jwt = await this.jwtService.signAsync({ id: user.id });
    // token are stored in the cookies
    response.cookie('jwt', jwt, { httpOnly: true });

    return { message: 'success', response: JSON.stringify(response) };
  }

  // * Requires user to logged in in order to access the link
  @Get('users')
  async getUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      const user = await this.userAService.getUser({ id: data.id });
      delete user.password;
      return user;
    } catch (err) {
      throw new UnauthorizedException(err, 'no jwt found in cookies');
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'logout success',
    };
  }

  @Get('bypass')
  async getUserBypass() {
    const user = await this.userAService.getAll();
    return user;
  }
}
