import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCrentialsDto } from "./dto/auth-crentials.sto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCrentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)
    try {
      await user.save()
    } catch (ex) {
      if (ex.code = '23055')
        throw new ConflictException('Username already exists')
      else
        throw new InternalServerErrorException()
    }

  }

  async validateUserPassword(authCredentialsDto: AuthCrentialsDto) {
    const { username, password } = authCredentialsDto

    const user = await this.findOne({ username })

    if (user && await user.validatePassword(password))
      return user.username
    else return null
  }

  private async hashPassword(password, salt) {
    return bcrypt.hash(password, salt)
  }
}