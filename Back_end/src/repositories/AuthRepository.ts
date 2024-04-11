import {UserInfo} from '../interfaces';
import Model from '../models';
class AuthRepository {
  // implement singleton pattern
  private static instance: AuthRepository;

  private constructor() {}
  public static getAuthRepository(): AuthRepository {
    if (!AuthRepository.instance) {
      return new AuthRepository();
    }
    return AuthRepository.instance;
  }

  public async handleRegister(data: UserInfo) {
    await Model.user.create(data);
    return data;
  }

  public async findUser(username: String): Promise<UserInfo[]> {
    const foundUser = await Model.user.find({username: username});
    return foundUser;
  }
}

export default AuthRepository.getAuthRepository();
