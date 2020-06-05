import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCrentialsDto } from './dto/auth-crentials.sto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredntialsDto: AuthCrentialsDto) {
    await this.authService.signUp(authCredntialsDto)
  }
}
