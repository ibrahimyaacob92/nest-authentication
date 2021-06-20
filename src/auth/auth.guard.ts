import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// * This guard will get direct user to local strategy
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // canActivate(context: ExecutionContext) {}
  // handleRequest(err, user, info) {}
}

// * This guard will get direct user to jwt strategy's validate function
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {}
