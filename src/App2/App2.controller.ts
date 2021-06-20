import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('app2')
export class App2Controller {
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req) {
    console.log('running controller');
    return req.user;
  }

  @Get()
  get() {
    return 'welcome to app2';
  }
}
