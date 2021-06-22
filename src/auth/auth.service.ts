import { Injectable } from '@nestjs/common';
import { UserAService } from 'src/user_a/user_a.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '.prisma/client';

type UserType = Omit<User, 'id' | 'password'>;

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

  async socialLogin(email: string, social_token: string, details: UserType) {
    console.log('service: social login to return jwt');

    // TODO :find or create account here
    // Search first
    let user = await this.userAService.getUser({ email });
    if (!user) {
      const { name, facebookId, googleId, profileURL } = details;
      user = await this.userAService.create({
        name,
        email,
        profileURL,
        facebookId,
        googleId,
        password: facebookId || googleId,
      });
      console.log('successful create user ', user);
    }

    const payload = { email, sub: { social_token, user } };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
