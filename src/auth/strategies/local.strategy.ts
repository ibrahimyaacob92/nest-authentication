import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // ! this is where you specify the your main field is "email"
    super({ usernameField: 'email' });
  }

  // ? this validate function returns the value to request.user
  // ? depending on what strategy are you using
  async validate(email: string, password: string): Promise<any> {
    console.log('running local strategy');
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    // return { email: 'asdasf', password: 'sdasf', id: 45, name: 'Asfa' };
    return user;
  }
}
