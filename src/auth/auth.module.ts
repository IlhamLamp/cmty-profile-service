import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: { expiresIn: '15m' },
        }),
    ],
    providers: [JwtStrategy, JwtAuthGuard],
    exports: [JwtAuthGuard],
})
export class AuthModule {}
