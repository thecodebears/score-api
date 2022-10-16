
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Account } from '../../models/account/account.entity';
import { AccountService } from '../../models/account/account.service';
import { Application } from '../../models/application/application.entity';
import { ApplicationService } from '../../models/application/application.service';
import env from 'environment';


@Injectable()
export class AccountJwtStrategy extends PassportStrategy(Strategy, 'AccountJwt') {
    constructor(
        private accountService: AccountService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.security.jwt.secret
        });
    }

    async validate(payload: any): Promise<any> {
        if (payload.scope === 'account') {
            let account = await this.accountService.findOneBy({ id: payload.id });
            return account;
        }
        return null;
    }
}

@Injectable()
export class ApplicationJwtStrategy extends PassportStrategy(Strategy, 'ApplicationJwt') {
    constructor(
        private applicationService: ApplicationService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.security.jwt.secret
        });
    }

    async validate(payload: any): Promise<any> {
        if (payload.scope === 'application') {
            let application = await this.applicationService.findOneBy({ id: payload.id });
            return application;
        }
        return null;
    }
}
