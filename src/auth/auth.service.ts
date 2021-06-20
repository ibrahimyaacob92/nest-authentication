import { Injectable } from '@nestjs/common';
import { UserAService } from 'src/user_a/user_a.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userAService: UserAService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('service : validating user username & password');
    const user = await this.userAService.getUser({ email });
    console.log(user);
    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // login & return JWT
  async login(user: any) {
    console.log('service : login to return jwt');
    const { email, ...sub } = user; // ! Reson why not use password, social login doesnt provide you password
    const payload = { email, sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // social login
  async socialLogin(email: string, name: string, socialID: string) {
    // TODO :find or create account here
    const payload = { email, sub: { name, socialID } };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
