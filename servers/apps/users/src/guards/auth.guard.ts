import { PrismaService } from '@/prisma/Prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const accessToken = req.headers.accessToken as string;
    const refreshToken = req.headers.refreshToken as string;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Please login to access this resource!');
    }

    if (accessToken) {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      });

      if (!decoded) {
        throw new UnauthorizedException('Invalid access token!');
      }

      await this.updateAccessToken(req);
    }

    return true;
  }

  private async updateAccessToken(req: any): Promise<void> {}
}
