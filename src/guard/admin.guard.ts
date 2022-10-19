import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


/*
 * Should ONLY be used for account authentification.
 */
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const { user } = context.switchToHttp().getRequest();
        return user?.admin;
    }
}