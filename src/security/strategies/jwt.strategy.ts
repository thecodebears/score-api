
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../../models/account/account.service';
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
        if (!payload || payload?.scope != 'account') return null;

        let account = await this.accountService.findOneBy({ id: payload.id });

        if (account && account.password == payload.password) return payload;
        
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
        return (payload?.scope === 'application' || payload?.admin) ? payload : null;
    }
}
