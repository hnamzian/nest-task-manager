import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCrentialsDto } from "./dto/auth-crentials.sto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCrentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    user.password = password
    try {
      await user.save()
    } catch(ex) {
      if (ex.code = '23055')
        throw new ConflictException('Username already exists')
      else
        throw new InternalServerErrorException()
    }
    
  }
}