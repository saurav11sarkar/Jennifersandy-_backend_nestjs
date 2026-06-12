import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User, UserDocument } from '../user/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from '@nestjs/jwt';
import config from '../../config';
import sendMailer from 'src/app/helpers/sendMailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: jwt.JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const existing = await this.userModel.findOne({
      email: createAuthDto.email,
    });
    if (existing) throw new HttpException('User already exists', 400);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await this.userModel.create({
      ...createAuthDto,
      isVerified: false,
      otp,
      otpExpiry: new Date(Date.now() + 60 * 60 * 1000),
    });

    const html = `
      <div style="font-family: Arial; text-align: center; padding: 32px;">
        <h2 style="color:#4f46e5;">Verify your email</h2>
        <p>Welcome to 0211wohnen! Use the code below to verify your account.</p>
        <h1 style="letter-spacing: 6px; font-size: 40px;">${otp}</h1>
        <p style="color:#666;">This code expires in 1 hour.</p>
      </div>
    `;

    await sendMailer(newUser.email, 'Verify your email — 0211wohnen', html);

    return {
      message:
        'Registration successful. Check your email for the verification code.',
    };
  }

  async login(loginDto: { email: string; password: string }, res: Response) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');
    if (!user) throw new HttpException('User not found', 404);

    if (user.role !== 'admin') {
      if (!user.isVerified) {
        throw new HttpException(
          'Please verify your email before logging in',
          403,
        );
      }
    }

    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatch) throw new HttpException('Incorrect password', 401);

    const payload = { id: user._id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: config.jwt.accessTokenSecret,
      expiresIn: config.jwt.accessTokenExpires as any,
    } as jwt.JwtSignOptions);
    const refreshToken = this.jwtService.sign(payload, {
      secret: config.jwt.refreshTokenSecret,
      expiresIn: config.jwt.refreshTokenExpires as any,
    } as jwt.JwtSignOptions);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    const { password: _pw, ...userWithoutPassword } = user.toObject();
    return { accessToken, user: userWithoutPassword };
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('Email not found', 404);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const html = `
      <div style="font-family: Arial; text-align: center; padding: 32px;">
        <h2 style="color:#4f46e5;">Password Reset</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 6px; font-size: 40px;">${otp}</h1>
        <p style="color:#666;">This code expires in 1 hour.</p>
      </div>
    `;

    await sendMailer(user.email, 'Reset Password OTP — 0211wohnen', html);
    return { message: 'Check your email for the OTP code' };
  }

  // Handles BOTH signup verification and forgot-password OTP check
  async verifyEmail(email: string, otp: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('Invalid request', 400);
    if (user.otp !== otp) throw new HttpException('Invalid OTP', 400);
    if (!user.otpExpiry || user.otpExpiry < new Date())
      throw new HttpException('OTP expired', 400);

    user.otp = undefined as any;
    user.otpExpiry = undefined as any;

    if (!user.isVerified) {
      // signup flow — activate account
      user.isVerified = true;
      await user.save();
      return { message: 'Email verified successfully. You can now log in.' };
    }

    // forgot-password flow — mark ready for password reset
    user.verifiedForget = true;
    await user.save();
    return { message: 'OTP verified. You can now reset your password.' };
  }

  async resetPasswordChange(email: string, newPassword: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('Invalid request', 400);
    if (!user.verifiedForget) throw new HttpException('OTP not verified', 400);

    user.password = newPassword;
    user.verifiedForget = false;
    await user.save();

    return { message: 'Password reset successfully' };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userModel.findById(userId).select('+password');
    if (!user) throw new HttpException('User not found', 404);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new HttpException('Invalid old password', 400);
    if (oldPassword === newPassword)
      throw new HttpException(
        'New password cannot be same as old password',
        400,
      );

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }
}
