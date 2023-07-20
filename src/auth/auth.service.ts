import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(user: User) {
    return { token: this.jwtService.sign(user.id) };
  }

  async signUp(dto: SignUpDto): Promise<{ id: string; token: string }> {
    const { password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      password: hashedPassword,
    });
    await newUser.save();

    return { id: newUser.id, token: this.jwtService.sign(newUser.id) };
  }

  getUser(user) {
    return { id: user.id };
  }

  async validateUser(id: string, password: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
