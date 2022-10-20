import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class AccountJwtGuard extends AuthGuard('AccountJwt') {}

@Injectable()
export class ApplicationJwtGuard extends AuthGuard('ApplicationJwt') {}
