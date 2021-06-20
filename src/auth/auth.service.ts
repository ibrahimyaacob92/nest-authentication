import { Injectable } from '@nestjs/common';
import { UserAService } from 'src/user_a/user_a.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userAService: UserAService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userAService.getUser({ email });
    console.log(user);
    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
