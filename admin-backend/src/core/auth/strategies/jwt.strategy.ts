import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: (request: Request) => {
                return request['cookies']?.['admin-login'];
            },
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload) {
        return payload;
    }
}
