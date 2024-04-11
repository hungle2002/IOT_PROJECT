import {Request, Response} from 'express';
import {UserInfo} from '../interfaces';
import status from 'http-status';
import bcrypt from 'bcryptjs';
import AuthRepository from '../repositories/AuthRepository';

class AuthController {
  public static async handleLogin(req: Request, res: Response) {
    try {
      const {username, password} = req.body;
      const foundUsers = await AuthRepository.findUser(username);
      if (!foundUsers.length) {
        return res.json({code: 404, msg: 'Wrong username or password!'});
      }
      const isValidPassword = await bcrypt.compare(password, foundUsers[0].password.trim());
      if (!isValidPassword) return res.json({code: 403, msg: 'Wrong username or password!'});
      return res.json({code: 200, username: username});
    } catch (error) {
      console.log(error);
    }
  }

  public static async handleRegister(req: Request, res: Response) {
    // only used to create new accounts
    try {
      const {username, password} = req.body;
      const foundUsers = await AuthRepository.findUser(username);
      if (foundUsers.length) return res.json({code: 403, msg: 'Wrong username or password!'});
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: UserInfo | undefined = await AuthRepository.handleRegister({
        username: username,
        password: hashedPassword,
      });
      res.json({code: 200, newUser: newUser?.username});
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
