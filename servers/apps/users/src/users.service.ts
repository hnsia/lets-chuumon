import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '@/prisma/Prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  // register user
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new BadRequestException('User with this email already exists!');
    }

    const isPhoneNumberExist = await this.prisma.user.findUnique({
      where: {
        phone_number,
      },
    });

    if (isPhoneNumberExist) {
      throw new BadRequestException(
        'User with this phone number already exists!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: 0, // temporarily 0 until account is activated
      name,
      email,
      password: hashedPassword,
      phone_number,
      role: 'Unactivated User',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const activationToken = await this.createActivationToken(user);
    const activationCode = activationToken.activationCode;

    await this.emailService.sendMail({
      email,
      subject: "Let's Chuumon Account Activation",
      template: './activation-mail',
      name,
      activationCode,
    });

    return { user, response };
  }

  // create activation token
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  // login user
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = {
      email,
      password,
    };

    return user;
  }

  // get all users
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
