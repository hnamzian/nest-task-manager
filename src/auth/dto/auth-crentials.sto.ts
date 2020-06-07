import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCrentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  
  @IsString()
  @MinLength(6)
  @Matches(
    /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password is too weak'})
  password: string;
}