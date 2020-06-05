import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCrentialsDto } from "./dto/auth-crentials.sto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCrentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    user.password = password
    await user.save()

    console.log(user);
    
  }
}