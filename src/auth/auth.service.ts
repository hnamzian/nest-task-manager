import { Injectable } from '@nestjs/common';
import { AuthCrentialsDto } from './dto/auth-crentials.sto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signUp(authCredentialsDto: AuthCrentialsDto) {
    await this.userRepository.signUp(authCredentialsDto)
  }
}
