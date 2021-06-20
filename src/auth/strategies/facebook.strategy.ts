import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: 'http://localhost:3000/app2/auth/facebook/redirect',
      scope: 'email',
      display: 'popup',
      profileFields: [
        'id',
        'emails',
        'name',
        // 'photos', //! This gives small photo
        'picture.type(large)',
        'profileUrl',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ) {
    console.log('running social strategy');
    const { id, name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      fbId: id,
      name: `${name.givenName} ${name.familyName}`,
      another: 'asds',
      photos,
    };
    const payload = this.authService.socialLogin(
      user.email,
      user.name,
      user.fbId,
    );
    // const payload = {
    //   user,
    //   accessToken,
    // };
    done(null, payload); //payload will be returned as req.user
  }
}
