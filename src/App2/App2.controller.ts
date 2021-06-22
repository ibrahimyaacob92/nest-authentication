import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import {
  FacebookAuthGuard,
  JwtAuthGuard,
  LocalAuthGuard,
} from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('app2')
export class App2Controller {
  constructor(private authService: AuthService) {}

  // normal login
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Req() req) {
    console.log('running local login');
    return req.user;
  }

  // service below returns the JWT
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login/jwt')
  async loginJwt(@Req() req) {
    console.log('running jwt login');
    const jwtToken = this.authService.login(req.user);
    return jwtToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/jwt-only')
  async jwtPage(@Req() req) {
    return {
      message: 'i see you have JWT implemented.. welcome to app2',
      user: req.user,
    };
  }

  @Get()
  async open() {
    return 'free pages';
  }

  @Get('/auth/facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    console.log('authenticating with facebook...');
    return HttpStatus.OK;
  }

  // This is the part where you
  @Get('/auth/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    console.log('authented with facebook !');

    return req.user;
  }
}
