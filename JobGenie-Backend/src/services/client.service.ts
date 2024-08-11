import { ClientDto, LoginClientDto } from '../dtos/user.dto';
import { IClientServiceInterface } from '../interface/user/user.interface';
import redis from '../config/redis.config';
import BcryptUtils from '../utils/bcrypt/bcrypt.utils';
import ApiError from '../utils/errors/app.error';
import { GenderType } from '../database/utils/person.entity';
import { User } from '../database/entities/user.entity';
import JwtUtils from '../utils/jwt/jwt.utils';
import { BlockList } from '../database/entities/blocklist.entity';
import { AuthError } from '../utils/errors/auth.error';
import { UserRoleStatusEnum } from '../database/entities/user.entity';
import { UserProfile } from '../database/entities/userProfile.entity';

export class ClientService implements IClientServiceInterface {
  private isObjectEmpty(objectName: {} | any) {
    for (let prop in objectName) {
      if (objectName.hasOwnProperty(prop)) {
        return false;
      }
      return true;
    }
  }
  registerClient: (clientDto: ClientDto) => any = async (
    clientDto: ClientDto
  ) => {
    const { email, password, gender, role, ...client } = clientDto;
    const emptyDto = this.isObjectEmpty(clientDto);
    if (emptyDto) {
      throw new ApiError(`All Credentials are missing`, 409);
    }
    if (!email || !password) {
      throw new ApiError('Credential is Missing, Email or Password', 409);
    }
    const checkUser = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email OR user.phoneNumber = :phoneNumber', {
        email: email,
        phoneNumber: clientDto.phoneNumber,
      })
      .getOne();
    if (checkUser) {
      throw new ApiError(
        `${clientDto.firstName} or ${clientDto.phoneNumber} is already registerd`,
        409
      );
    }
    const errorGender: Array<number> = [];
    const checkInputGender = Object.entries(GenderType).every((key, value) => {
      if (gender === key[value]) {
        errorGender.push(1);
        return false;
      }
      return true;
    });
    if (errorGender.toString().startsWith('1')) {
      throw new ApiError('Gender should be male or female', 409);
    }
    const hashPassword = await BcryptUtils.hashPassword(password);
    let checkValidRole = {
      role: '',
    };

    if (role !== undefined) {
      for (let [key, value] of Object.entries(UserRoleStatusEnum)) {
        if (role === value) {
          checkValidRole['role'] = role;
          break;
        }
      }
      if (checkValidRole['role'].length === 0) {
        throw new ApiError('Role does not exists', 403);
      }
    }

    const newUser = await User.createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: email,
          password: hashPassword,
          gender: gender,
          role: checkValidRole['role'] || 'client',
          ...client,
        },
      ])
      .execute();

    const findUser = await User.findOne({
      where: {
        phoneNumber: clientDto.phoneNumber as string,
        email: clientDto.email as string,
      },
    });
    await UserProfile.createQueryBuilder()
      .insert()
      .into(UserProfile)
      .values([
        {
          user: findUser,
        },
      ])
      .execute();
    const redisKey = `user:${findUser.id}`;
    await redis.hmset(redisKey, {
      firstName: clientDto.firstName,
      id: findUser.id,
    });
    // Local variable
    let message: string;
    if (newUser.generatedMaps[0].id === 1) {
      message = `Client with ${client.firstName} Is Registered Successfully`;
      return message;
    }
  };

  loginClient: (loginClientDto: LoginClientDto) => any = async (
    loginClientDto: LoginClientDto
  ) => {
    const { email, password } = loginClientDto;
    if (!email || !password) {
      throw new ApiError(`Email or Password must ne provided`, 409);
    }
    const allUser = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .getMany();
    const user = allUser.filter((user) => user.email === (email as string));
    if (!user || user.length === 0) {
      throw new ApiError(`The Email You entered is not register`, 403);
    }
    const checkUser = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email: email })
      .getOne();

    const redisQuery = await redis.hget(`user:${checkUser.id}`, 'id');
    const checkId = redisQuery?.startsWith(`${checkUser.id}`.toString());
    if (!checkId) {
      throw new ApiError(`Redis Id Does not match with this client`, 409);
    }
    const checkPassword = await BcryptUtils.ComparePassword(
      password,
      checkUser.password
    );
    if (typeof checkPassword === 'boolean' && !checkPassword) {
      throw new ApiError(
        `${checkUser.firstName} Has Entered Wrong Password`,
        403
      );
    }

    const userCredentials = {
      firstName: checkUser.firstName,
      email: checkUser.email,
      id: checkUser.id,
      role: checkUser.role,
    };
    console.log(checkUser);

    const access_token = await JwtUtils.createAccessToken(userCredentials);
    return {
      access_token: access_token,
      email: checkUser.email,
      firstName: checkUser.firstName,
      id: checkUser.id,
      role: checkUser.role,
    };
  };

  logoutClient: (clientId: number, token: string) => any = async (
    clientId: number,
    token: string
  ) => {
    const checkUser = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id: clientId as number })
      .getOne();
    if (!checkUser) throw new ApiError(`User is not authorized`, 401);
    const allBlockListToken = await BlockList.createQueryBuilder()
      .select('blocklist')
      .from(BlockList, 'blocklist')
      .getMany();

    const checkIfTokenExists = allBlockListToken.find(
      (blocklist) => blocklist.token === token
    );
    if (checkIfTokenExists) {
      throw new ApiError(`The Token is already on the Blocklist`, 401);
    }
    await redis.set(`blocklist:${checkUser.id}`, token as string);
    await BlockList.createQueryBuilder()
      .insert()
      .into(BlockList)
      .values([
        {
          token: token,
        },
      ])
      .execute();
    const message = `${checkUser.firstName} Has Logged Out Successfully`;
    return message;
  };

  private async checkBlockListToken(token: string) {
    const check = await BlockList.find({
      where: {
        token: token,
      },
    });
    console.log(token);
    if (token) {
      throw new AuthError(
        'The Token is in The BlockList , Please Try again',
        401
      );
    }
    return true;
  }
}
