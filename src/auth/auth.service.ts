import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthCrentialsDto } from './dto/auth-crentials.sto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayoad } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async signUp(authCredentialsDto: AuthCrentialsDto) {
    await this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCrentialsDto) {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)

    if (!username)
      throw new UnauthorizedException('Invalid credentials')


    const payload: JwtPayoad = { username }
    const accessToken = await this.jwtService.sign(payload)
    this.logger.debug(`Generated JWT Token with payload: ${JSON.stringify(payload)}`)

    return { accessToken }
  }
}
