import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@schemas/user';

@Injectable()
export class OAthService {
    constructor(private readonly jwtService: JwtService) {}

    sign(username: string, userId: string) {
        return this.jwtService.sign({ username, userId });
    }

    getUserInfo(token) {
        return this.jwtService.verify<{ userId: string; username: string }>(
            token,
        );
    }
}
