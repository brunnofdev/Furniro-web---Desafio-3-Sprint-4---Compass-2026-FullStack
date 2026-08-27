import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export class AuthService {
  async register(data: any) {
    const { name, email, password } = data;

    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('E-mail already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user);
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(data: any) {
    const { email, password } = data;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('Wrong credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Wrong credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d' // One day
    });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
